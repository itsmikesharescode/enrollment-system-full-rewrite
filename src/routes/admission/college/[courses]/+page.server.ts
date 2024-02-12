import { error, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { admissionState } from "../../resources";
import type { CourseModel } from "$lib/types";

export const load: PageServerLoad = async ({url}) => {
    
   
    let courseReference: CourseModel | undefined;

    admissionState.subscribe(contains => {
        contains.college.forEach(item => {
            item.courses.forEach(innerItem => innerItem.url === url.pathname ? courseReference = innerItem : "");
        });
    });

    if(!courseReference) error(404, JSON.stringify({
        msg: "Page not found",
        callbackUrl: "/admission/college",
        title: "College Courses"
    }));

    return courseReference;
    
};

export const actions: Actions = {
    authCheck: async ({request, locals: {getSession}}) => 
    {
        const session = await getSession();

        if(session) return fail(200, {msg: "Log in verified"});
        else return fail(401, {msg: "You have to log in to enroll in this course."});
    }
};