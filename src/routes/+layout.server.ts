import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {


    return {
        session: await getSession(),
    }
}