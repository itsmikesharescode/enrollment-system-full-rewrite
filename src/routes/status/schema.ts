import {z} from  "zod";

export const updateApplicationSchema = z.object({
    selected_course: z.string().min(1, {message: "Required"}),
    present_address: z.string().min(1, {message: "Must enter a valid present address."}),
    religion: z.string().min(2, {message: "Must enter a valid religion"}),
    date_of_birth: z.string().min(4, {message: "Must enter a valid date of birth"}),
    fathers_fname: z.string().min(3, {message: "Must enter a valid fathers full name."}),
    mothers_fname: z.string().min(3, {message: "Must enter a valid mothers full name."}),
})