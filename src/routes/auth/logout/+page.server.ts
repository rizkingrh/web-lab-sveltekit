// src/routes/auth/logout/+page.server.ts

import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { clearCachedProfile } from '$lib/profile-cache';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { session } = await safeGetSession();

    // If already logged out, redirect to login
    if (!session) {
        throw redirect(303, '/auth/login');
    }

    return {};
};

export const actions: Actions = {
    default: async ({ locals, cookies }) => {
        const supabase = locals.supabase;

        try {
            // Get current session to clear cache
            const { session } = await locals.safeGetSession();
            const userId = session?.user?.id;

            // Clear profile cache for this user
            if (userId) {
                clearCachedProfile(userId);
            }

            // Sign out from Supabase
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Logout error:', error);
                return fail(500, {
                    error: 'Failed to logout. Please try again.'
                });
            }

            // Clear all auth-related cookies
            const cookieOptions = {
                path: '/',
                maxAge: 0
            };

            cookies.delete('sb-access-token', cookieOptions);
            cookies.delete('sb-refresh-token', cookieOptions);

        } catch (error) {
            console.error('Unexpected logout error:', error);
            return fail(500, {
                error: 'An unexpected error occurred during logout.'
            });
        }

        // Redirect to login page
        throw redirect(303, '/auth/login');
    }
};