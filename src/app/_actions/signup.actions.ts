"use server"

import { signupDataType } from "@/Schema/signup.Schema";
import axios from "axios";
import { cookies } from "next/headers";

export async function signupAction(userData: signupDataType) {
    console.log(userData);

    try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData)
        console.log(data);

        if (data.message === "success") {
            const cookiy = await cookies()
            cookiy.set("user-token", data.token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "strict"
            })
            return { success: true, data }
        } else {
            return { success: false, message: data.message }
        }
    } catch (error: any) {
        console.error("Error in signupAction:", error.response?.data || error.message)
        return { success: false, message: error.response?.data?.message || "Registration failed" }
    }
}