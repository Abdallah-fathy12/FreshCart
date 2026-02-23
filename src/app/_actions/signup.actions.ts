"use server"

import { signupDataType } from "@/Schema/signup.Schema";
import axios from "axios";
import { cookies } from "next/headers";

export async function signupAction(userData: signupDataType) {
    console.log(userData);

    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData)
    console.log(data);
    //   localStorage.setItem("token" , data.token)

    if (data.message == "success") {

        const cookiy = await cookies()
        cookiy.set("user-token", data.token , {
            httpOnly : true,
            maxAge : 60 * 60 * 24,
            sameSite : "strict"
        })

        return true

    } else {
        return false
    }
}