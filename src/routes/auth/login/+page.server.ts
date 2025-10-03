import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const supabase = locals.supabase;
        const formData = await request.formData();

        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        // Validasi dasar
        if (!email || !password) {
            return fail(400, {
                error: 'Email dan password tidak boleh kosong.',
            });
        }

        // Proses login menggunakan Supabase
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        // Jika terjadi error (misal: password salah)
        if (error) {
            return fail(400, {
                error: 'Email atau password salah. Silakan coba lagi.',
            });
        }

        // Jika berhasil, redirect ke halaman dashboard
        throw redirect(303, '/dashboard');
    }
};