"use server"

import { getUserToken } from "@/lib/authUtils"
import axios from "axios"

export async function UpdateCart(id: string, count: number) {

    const token = await getUserToken()

    if (!token) {
        return { status: "error", message: "User not authenticated" }
    }

    try {
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count
        }, {
            headers: {
                token: token as string
            }
        })

        return data
    } catch (error: any) {
        console.error("Error in UpdateCart:", error.response?.data || error.message)
        return error.response?.data || { status: "error", message: "Failed to update cart" }
    }
}