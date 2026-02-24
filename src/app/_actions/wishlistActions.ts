"use server"

import { getUserToken } from "@/lib/authUtils"
import axios from "axios"

/**
 * Adds a product to the user's wishlist
 */
export async function AddToWishlist(productId: string) {
    const token = await getUserToken()

    if (!token) {
        return { status: "error", message: "User not authenticated" }
    }

    try {
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId },
            {
                headers: {
                    token: token as string
                }
            })

        console.log("Wishlist Add Success:", data.message)
        return data
    } catch (error: any) {
        console.error("Error in AddToWishlist:", error.response?.data || error.message)
        // Ensure we return the API error if it exists
        return error.response?.data || { status: "error", message: "Failed to add to wishlist" }
    }
}

/**
 * Removes a product from the user's wishlist
 */
export async function RemoveFromWishlist(productId: string) {
    const token = await getUserToken()

    if (!token) {
        return { status: "error", message: "User not authenticated" }
    }

    try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: {
                token: token as string
            }
        })
        console.log("Wishlist Remove Success:", data.message)
        return data
    } catch (error: any) {
        console.error("Error in RemoveFromWishlist:", error.response?.data || error.message)
        return error.response?.data || { status: "error", message: "Failed to remove from wishlist" }
    }
}

/**
 * Fetches all products in the user's wishlist
 */
export async function GetUserWishlist() {
    const token = await getUserToken()

    if (!token) {
        return { status: "error", message: "User not authenticated" }
    }

    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token: token as string
            }
        })
        return data
    } catch (error: any) {
        console.error("Error in GetUserWishlist:", error.response?.data || error.message)
        return error.response?.data || { status: "error", message: "Failed to fetch wishlist" }
    }
}
