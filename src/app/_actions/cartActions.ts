"use server"

import { getUserToken } from "@/lib/authUtils"
import axios from "axios"

/**
 * Removes a specific product from the cart
 */
export async function RemoveFromCart(productId: string) {
    const token = await getUserToken()

    if (!token) {
        return { status: "error", message: "User not authenticated" }
    }

    try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: {
                token: token as string
            }
        })
        return data
    } catch (error: any) {
        console.error("Error in RemoveFromCart:", error.response?.data || error.message)
        return error.response?.data || { status: "error", message: "Failed to remove item" }
    }
}

/**
 * Clears the entire cart for the logged-in user
 */
export async function ClearCart() {
    const token = await getUserToken()

    if (!token) {
        return { status: "error", message: "User not authenticated" }
    }

    try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: token as string
            }
        })
        return data
    } catch (error: any) {
        console.error("Error in ClearCart:", error.response?.data || error.message)
        return error.response?.data || { status: "error", message: "Failed to clear cart" }
    }
}
