import * as z from "zod"

export const loginSchema = z.object({

    email: z.email("enter vailed email").nonempty("enter vailed email"),

    password: z.string().nonempty("please enter your password").
        min(8, "password must be at least 8 characters.").
        max(15, "password must not exceed 15 characters."),

})



export type loginDataType = z.infer< typeof loginSchema >