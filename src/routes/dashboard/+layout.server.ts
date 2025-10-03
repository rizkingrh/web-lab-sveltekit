// src/routes/dashboard/+layout.server.ts

import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    // Panggil helper baru yang sudah kita definisikan di hook
    const { session, user } = await safeGetSession();

    // Jika tidak ada sesi (dan user), redirect ke halaman login
    if (!session) {
        throw redirect(303, '/auth/login');
    }

    // Ambil data profil dari tabel 'profiles'
    // Kita bisa gunakan user.id yang sudah terjamin valid
    const { data: profile } = await supabase
        .from('profiles')
        .select(`
			nim,
			roles ( name )
		`)
        .eq('id', session.user.id) // Gunakan user.id dari safeGetSession
        .single();

    // Kirim data sesi, user, dan profil ke halaman
    return { session, user, profile };
};