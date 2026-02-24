"use server"

import axios from "axios"
import { getUserToken } from "@/lib/authUtils"


export async function addItemToCart(productId: string) {
    let token = await getUserToken()

    if (!token) {
        return { status: "error", message: "User not authenticated" }
    }

    try {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers: {
                token: token as string
            }
        })

        return data
    } catch (error: any) {
        console.error("Error in addItemToCart:", error.response?.data || error.message)
        return error.response?.data || { status: "error", message: "Failed to add item to cart" }
    }
}