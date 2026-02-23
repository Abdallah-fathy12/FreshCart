import * as z from "zod"

export const checkoutSchema = z.object({
    details: z.string().min(5, "Details must be at least 5 characters."),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number."),
    city: z.string().min(3, "City must be at least 3 characters."),
    paymentMethod: z.enum(["cash", "online"], {
        error: "Please select a payment method.",
    }),
})

export type checkoutDataType = z.infer<typeof checkoutSchema>
