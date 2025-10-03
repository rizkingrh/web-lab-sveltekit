import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const supabase = locals.supabase;
        const data = await request.formData();

        const nim = data.get('nim')?.toString();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const confirmPassword = data.get('confirmPassword')?.toString();

        const returnData = { nim, email };

        if (!nim || !email || !password || !confirmPassword) {
            return fail(400, { ...returnData, error: 'Semua field wajib diisi.' });
        }

        if (password !== confirmPassword) {
            return fail(400, { ...returnData, error: 'Password dan konfirmasi password tidak cocok.' });
        }

        const nimRegex = /^\d{10}$/;
        if (!nimRegex.test(nim)) {
            return fail(400, { ...returnData, error: 'NIM harus berupa 10 digit angka.' });
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nim
                }
            }
        });

        if (error) {
            return fail(400, { ...returnData, error: error.message });
        }

        throw redirect(303, '/auth/login');
    }
};