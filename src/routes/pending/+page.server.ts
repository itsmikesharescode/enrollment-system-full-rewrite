import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostgrestError, Session } from "@supabase/supabase-js";

const application_query = "id, created_at, user_email, user_fullname, user_application, is_accepted, application_type";

export const load: PageServerLoad = async ({request, cookies, locals: {supabase}}) => {
    
    let cookie = cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token");

    if(cookie){

        let session: Session = JSON.parse(cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token") as string);
        

        if(session){

            const {data:is_admin, error:is_admin_error} = await supabase.rpc("is_admin") as {data: boolean, error: PostgrestError | null};

            if(!is_admin) throw redirect(302, "/status");

            else{
                return {
                    appData: await supabase.from("applications").select(application_query).range(0,10)
                }
            };
        };

    }else throw redirect(302, "/login?error=You-have-to-login");
};

export const actions: Actions = {

    paginate: async ({request, cookies, locals: {supabase}}) => 
    {
        const formData = await request.formData();

        const pageReq = Number(formData.get("pageReq") as string);
        
        const initial = ( pageReq - 1 ) * 10;
        const final = pageReq * 10;

        const {data:applications, error:applicationsError} = await supabase.from("applications").select(application_query).range(initial, final);

        if(applicationsError) return fail(400, {msg: applicationsError.message});
        else if(applications) return fail(200, {msg: "Applications Retrieve", applications});

    }
};