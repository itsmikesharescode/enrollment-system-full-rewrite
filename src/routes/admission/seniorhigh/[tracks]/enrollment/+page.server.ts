import type { PageServerLoad } from "./$types";
import { admissionState } from "../../../resources";
import type { CourseModel } from "$lib/types";
import { error, type Actions, redirect } from "@sveltejs/kit";
import type { PostgrestError, Session } from "@supabase/supabase-js";

export const load: PageServerLoad = async ({url, locals: {supabase}, cookies}) => {
    
    let courseReference: CourseModel | undefined;
    let cookie = cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token");

    admissionState.subscribe(contains => {
        contains.seniorHigh.forEach(item => {
            item.courses.forEach(innerItem => innerItem.url === url.pathname.replace("/enrollment", "") ? courseReference = innerItem : "");
        });
    });

    if(!courseReference) error(404, JSON.stringify({
        msg: "Page not found",
        callbackUrl: "/admission/seniorhigh",
        title: "Senior High Tracks"
    }));

    if(cookie){

        let session: Session = JSON.parse(cookies.get("sb-cyamrqqtnrherbhogqwg-auth-token") as string);
        if(session){

            const {data:alreadySubmit, error: alreadySubmitError} = await supabase.rpc("is_submitted_application") as {data: boolean, error: PostgrestError | null};

            if(alreadySubmitError) throw redirect(302, "/?has-error-contact-mikey");
            else if(alreadySubmit) throw redirect(302, "/status");
            else return courseReference;
        }
        else throw redirect(302, `${courseReference.url}`);

    }else throw redirect(302, `${courseReference?.url}`);

};

