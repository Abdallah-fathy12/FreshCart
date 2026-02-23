"use server"

import { getUserToken } from "@/lib/authUtils"
import axios from "axios"

/**
 * Adds a product to the user's wishlist
 */
export async function AddToWishlist(productId: string) {
    const token = await getUserToken()

    try {
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId },
            {
                headers: {
                    token: token as string
                }
            })
        return data
    } catch (error: any) {
        return error.response?.data || { status: "error", message: "Failed to add to wishlist" }
    }
}

/**
 * Removes a product from the user's wishlist
 */
export async function RemoveFromWishlist(productId: string) {
    const token = await getUserToken()

    try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: {
                token: token as string
            }
        })
        return data
    } catch (error: any) {
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
        return error.response?.data || { status: "error", message: "Failed to fetch wishlist" }
    }
}
