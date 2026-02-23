"use server"

import { getUserToken } from "@/lib/authUtils"
import axios from "axios"

/**
 * Interface for JWT payload to extract user ID
 */
interface MyJwtPayload {
    id: string;
}

/**
 * Fetches all orders for the currently logged-in user
 */
export async function getUserOrders() {
    const token = await getUserToken();

    if (!token) {
        return { status: "error", message: "User not authenticated" };
    }

    try {
        // 1. Decode token to get userId using our helper
        const decoded = custom_jwt_decode<MyJwtPayload>(token as string);
        const userId = decoded.id;

        // 2. Fetch orders from API using userId
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);

        return data;
    } catch (error: any) {
        console.error("Error fetching user orders:", error);
        return error.response?.data || { status: "error", message: "Failed to fetch orders" };
    }
}

/**
 * Custom JWT decoder to avoid dependency issues in this environment
 */
function custom_jwt_decode<T>(token: string): T {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        throw new Error("Invalid Token Format");
    }
}
