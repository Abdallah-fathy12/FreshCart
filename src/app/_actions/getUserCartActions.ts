"use server"

import axios from "axios"
import { getUserToken } from "@/lib/authUtils"

export async function getUserCart() {
    let token = await getUserToken()

    if (!token || typeof token !== 'string' || token.trim() === '' || token === 'undefined') {
        return { status: "error", message: "User token not found. Please log in." }
    }

    try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: token as string
            },
            timeout: 10000 // Set a 10s timeout
        })

        return data
    } catch (error: any) {
        console.error("Error fetching cart (getUserCart):", error.message)

        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
            return { status: "error", message: "Network Timeout: The server is taking too long to respond. Please check your internet connection." }
        }

        return error.response?.data || { status: "error", message: "Failed to fetch cart. The server might be down." }
    }
}