import {z} from "zod";

export const loginSchema = z.object({
    email_address: z.string().email({message: "Email is required."}),
    password: z.string().min(1, {message: "Must enter a password."})
});

export const registerSchema = z.object({
    first_name: z.string().min(1, {message: "Must enter a valid first name."}),
    middle_name: z.string().min(1, {message: "Must enter a valid middle name."}),
    last_name: z.string().min(1, {message: "Must enter a valid last name."}),
    email_address: z.string().min(1, {message: "Must enter a valid email address."}),
    password: z.string().min(8, {message: "Must choose a strong password."}),
    confirm_password: z.string().min(1, {message: "Must confirm your password"}),
}).superRefine( ({password, confirm_password}, ctx) => {

    if(password !== confirm_password){
        ctx.addIssue({
            code: "custom",
            message: "Password must match",
            path: ["password"]
        });

        ctx.addIssue({
            code: "custom",
            message: "Password must match",
            path: ["confirm_password"]
        });
    }
});

export const forgotPasswordSchema = z.object({
    email_address: z.string().email({message: "Email is required."}),
})
