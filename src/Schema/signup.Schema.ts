// import { signupSchema } from '@/Schema/signup.Schema';
import * as z from "zod"

export const signupSchema = z.object({
    name: z.string().nonempty("please enter your name").
        min(3, "name must be at least 3 characters.").
        max(25, "name must not exceed 25 characters."),

    email: z.email("enter vailed email").nonempty("enter vailed email"),

    password: z.string().nonempty("please enter your password").
        min(8, "password must be at least 8 characters.").
        max(15, "password must not exceed 15 characters."),

    rePassword: z.string().nonempty("please enter your rePassword").
        min(8, "rePassword must be at least 8 characters.").
        max(15, "rePassword must not exceed 15 characters."),

    phone: z.string().nonempty("please enter your phone").regex(/^01[0125][0-9]{8}$/),

}).refine( (data) => data.rePassword == data.password , {
    path : ["rePassword"],
    error : "password and rePassword not matched"
})



export type signupDataType = z.infer< typeof signupSchema >