import { fail, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";
import { forgotPasswordSchema, loginSchema, registerSchema } from "./schema";



export const actions: Actions = {
    loginHandler: async ({request, locals: {supabase}}) =>
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = loginSchema.parse(formData);

            const {data:{session}, error:loginError} = await supabase.auth.signInWithPassword({
                email: result.email_address,
                password: result.password,
            });

            if(loginError) return fail(400, {msg: loginError.message});
            else if(session) return fail(200, {msg: "Login Success", session});
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            return fail(401, {errors: fieldErrors});
        }
    },

    registerHandler: async ({request, locals: {supabase}}) => 
    {
        const formData = Object.fromEntries(await request.formData());
        
        try {

            const result = registerSchema.parse(formData);

            const {data:{session}, error:registerError} = await supabase.auth.signUp({
                email: result.email_address,
                password: result.password,
                options: {
                    data: {
                        full_name: `
                        ${result.last_name[0].toUpperCase() + result.last_name.slice(1)}, 
                        ${result.first_name[0].toUpperCase() + result.first_name.slice(1)} 
                        ${result.middle_name[0].toUpperCase() + result.middle_name.slice(1)}`
                    }
                }
            });

            if(registerError) return fail(400, {msg: registerError.message});
            else if(session){

                const {error: insertUserError} = await supabase.from("user_list").insert([{
                    user_id: session.user.id,
                    user_email: session.user.email,
                    user_fullname: session.user.user_metadata.full_name,
                    role_name: "student",
                }]);

                if(insertUserError) return fail(400, {msg: insertUserError.message});
                else return fail(200, {msg: "Account Created",  session});
            };


            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            return fail(401, {errors: fieldErrors});
        }
    },

    forgotPasswordHandler: async ({request, locals: {supabase}}) =>
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = forgotPasswordSchema.parse(formData);

            const {error: resetPasswordError} = await supabase.auth.resetPasswordForEmail(result.email_address);
            if(resetPasswordError) return fail(400, {msg: resetPasswordError.message});
            else return fail(200, {msg: `An email has been sent to ${result.email_address} containing the reset password link.`});

        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            console.log(fieldErrors)
            return fail(401, {errors: fieldErrors});
        }
    }
};