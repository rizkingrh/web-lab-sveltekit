// src/routes/auth/logout/+page.server.ts

import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals }) => {
        const supabase = locals.supabase;

        // Hapus sesi pengguna (logout)
        await supabase.auth.signOut();

        // Redirect pengguna ke halaman login setelah logout
        throw redirect(303, '/auth/login');
    }
};