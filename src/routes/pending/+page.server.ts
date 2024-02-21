import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({request, cookies, locals: {supabase}}) => {
    
};

export const actions: Actions = {

    paginate: async ({request, cookies, locals: {supabase}}) => 
    {
        const formData = await request.formData();

        const pageReq = Number(formData.get("pageReq") as string);
        
        const application_query = "id, created_at, user_email, user_fullname, user_application, is_accepted, application_type";
        const initial = ( pageReq - 1 ) * 10;
        const final = pageReq * 10;

        const {data:applications, error:applicationsError} = await supabase.from("applications").select(application_query).range(initial, final);

        if(applicationsError) return fail(400, {msg: applicationsError.message});
        else if(applications) return fail(200, {msg: "Applications Retrieve", applications});

    }
};