// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
    // Temporarily returning default values for session and user
    return {
        session: null,
        user: null,
        cookies: cookies.getAll(),
    };
};