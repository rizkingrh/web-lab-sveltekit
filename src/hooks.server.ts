// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'
import type { Session, User } from '@supabase/supabase-js'

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            /**
             * Note: You have to add the `path` variable to the
             * set and remove method due to sveltekit's cookie API
             * requiring this to be set, setting the path to `/`
             * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
             */
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' })
                })
            },
        },
    })

    /**
     * Optimized session validation - memoized per request to prevent duplicate calls
     */
    let sessionPromise: Promise<{ session: Session | null; user: User | null }> | null = null;

    event.locals.safeGetSession = async () => {
        // Return memoized result if already called in this request
        if (sessionPromise) {
            return sessionPromise;
        }

        // Create and cache the promise
        sessionPromise = (async () => {
            try {
                const { data: { user }, error } = await event.locals.supabase.auth.getUser()
                if (error || !user) {
                    return { session: null, user: null }
                }

                const { data: { session } } = await event.locals.supabase.auth.getSession()
                return { session, user }
            } catch {
                return { session: null, user: null }
            }
        })();

        return sessionPromise;
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name: string) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}