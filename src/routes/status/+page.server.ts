import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Session } from "@supabase/supabase-js";
import type { FormModel } from "$lib/types";
import type { ZodError } from "zod";
import { updateApplicationSchema } from "./schema";


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
    },

    update_application: async ({request, cookies, locals: {supabase}}) =>
    {
        const formData = Object.fromEntries(await request.formData());
        let cookie = cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token");
        
        try {
            const result = updateApplicationSchema.parse(formData);
            if(cookie){

                let session: Session = JSON.parse(cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token") as string);

                if(session){
                    
                    const {error:updateApplicationError} = await supabase.from("applications").update([{
                        user_application: JSON.stringify({
                            selected_course: result.selected_course,
                            present_address: result.present_address,
                            religion: result.religion,
                            date_of_birth: result.date_of_birth,
                            fathers_fname: result.fathers_fname,
                            mothers_fname: result.mothers_fname,
                        }),
                    }]).eq("user_id", session.user.id);
                    
                    if(updateApplicationError) return fail(400, {msg: updateApplicationError.message});
                    else return fail(200, {msg: "Application Update Successfully"});

                };
                
            }else throw redirect(302, "/login")

        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            return fail(401, {errors: fieldErrors});
        }
    }
};