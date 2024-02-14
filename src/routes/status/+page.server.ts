import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Session } from "@supabase/supabase-js";
import type { FormModel } from "$lib/types";


const application_query = "id, created_at, user_email, user_fullname, user_application, is_accepted, application_type";

export const load: PageServerLoad = async ({url, cookies, locals: {supabase}}) => {
   
    let cookie = cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token");
    if(cookie){
        let session: Session = JSON.parse(cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token") as string);
        
        if(session) return {get_application: await supabase.from("applications").select(application_query).eq("user_id", session.user.id).limit(1).single()};
        else throw redirect(302, "/login?you-have-to-login");

    }else return redirect(302, "/login?you-have-to-login");

};

export const actions: Actions = {

    delete_application: async ({request, locals: {supabase}}) =>
    {
        const formData = await request.formData();
        
        const student_form_id: number = Number(formData.get("student_form_id") as string);

        const {error: delete_form_error} = await supabase.from("applications").delete().eq("id", student_form_id);
        if(delete_form_error) return fail(400, {msg: delete_form_error.message});
        else return fail(200, {msg: "Successully deleted."});
    }
};