import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    try {
        // Fetch data from the "list-praktikum" table
        const { data: praktikum, error } = await supabase
            .from('list-praktikum')
            .select('id, nama_praktikum, nama_lab, semester')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching praktikum data:', error);
            return {
                praktikum: []
            };
        }

        return {
            praktikum: praktikum || []
        };
    } catch (error) {
        console.error('Unexpected error fetching praktikum data:', error);
        return {
            praktikum: []
        };
    }
};