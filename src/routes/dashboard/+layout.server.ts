import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getCachedProfile, setCachedProfile, cleanupExpiredCache } from '$lib/profile-cache';

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession }, setHeaders }) => {
    // Get user session
    const { session } = await safeGetSession();

    // Redirect if no session
    if (!session) {
        throw redirect(303, '/auth/login');
    }

    // Set cache headers to prevent unnecessary requests
    setHeaders({
        'Cache-Control': 'private, max-age=300, stale-while-revalidate=60',
        'Vary': 'Cookie'
    });

    const userId = session.user.id;

    // Try to get cached profile data
    let userData = getCachedProfile(userId);

    if (userData) {
        return { userData };
    }

    let profile = null;
    try {
        const { data: profileData } = await supabase
            .from('profiles')
            .select(`nim, roles ( name )`)
            .eq('id', userId)
            .single();
        profile = profileData;
    } catch (error) {
        console.error('❌ Error fetching profile:', error);
    }

    // Create clean user data object
    let roleName: string | null = null;
    if (profile?.roles) {
        if (Array.isArray(profile.roles)) {
            roleName = profile.roles[0]?.name || null;
        } else {
            roleName = (profile.roles as { name: string }).name || null;
        }
    }

    userData = {
        nim: session.user.user_metadata?.nim || profile?.nim || null,
        email: session.user.email || null,
        role: roleName
    };

    // Cache the result
    setCachedProfile(userId, userData);

    // Clean up expired cache entries periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup
        cleanupExpiredCache();
    }

    return { userData };
};