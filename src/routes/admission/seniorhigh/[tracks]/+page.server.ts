import { error, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { admissionState } from "../../resources";
import type { CourseModel } from "$lib/types";
import { enrollment_schema } from "../../schema";
import type { Session } from "@supabase/supabase-js";
import type { ZodError } from "zod";

export const load: PageServerLoad = async ({url}) => {
    
   
    let courseReference: CourseModel | undefined;

    admissionState.subscribe(contains => {
        contains.seniorHigh.forEach(item => {
            item.courses.forEach(innerItem => innerItem.url === url.pathname ? courseReference = innerItem : "");
        });
    });

    if(!courseReference) error(404, JSON.stringify({
        msg: "Page not found",
        callbackUrl: "/admission/seniorhigh",
        title: "Senior High Tracks"
    }));

    return courseReference;
    
};

export const actions: Actions = {
    authCheck: async ({request, locals: {getSession}}) => 
    {
        const session = await getSession();

        if(session) return fail(200, {msg: "Log in verified"});
        else return fail(401, {msg: "You have to log in to enroll in this course."});
    },

    enrollment: async ({request, locals: {supabase}, cookies}) => 
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            
            const session: Session = JSON.parse(cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token") as string);

            const result = enrollment_schema.parse(formData);

            if(session){

                const { error:insertError } = await supabase.from("applications").insert([{
                    user_id: session.user.id,
                    user_email: session.user.email,
                    user_fullname: session.user.user_metadata.full_name,
                    user_application: JSON.stringify({
                        selected_course: result.selected_course,
                        present_address: result.present_address,
                        religion: result.religion,
                        date_of_birth: result.date_of_birth,
                        fathers_fname: result.fathers_fname,
                        mothers_fname: result.mothers_fname,
                    }),
                    is_accepted: false,
                    application_type: "senior high"

                }]);

                if(insertError) return fail(400, {msg: insertError.message});
                else return fail(200, {msg: "Successfully submitted your form."});

            }else error(500, "Internal Error")

            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            return fail(401, {errors: fieldErrors});
        }
    }
};