"use server"

import { nextAuthConfig } from "@/lib/nextAuth.config"
import axios from "axios"
import { getServerSession } from "next-auth"

type shippingAddressType = {
    shippingAddress: {
        details: string,
        city: string,
        phone: string,
    }
}

async function getBackendToken() {
    const session: any = await getServerSession(nextAuthConfig)
    return session?.userTokenFromBackend
}

export async function CashOrder(cartId: string, userData: shippingAddressType) {
    const token = await getBackendToken();
    try {
        const { data } = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            userData,
            {
                headers: {
                    token: token
                }
            }
        );
        return data;
    } catch (error: any) {
        return error.response?.data || { message: "Error in Cash Order" , position : "top-center" };
    }
}

export async function OnlineOrder(cartId: string, userData: shippingAddressType) {
    const token = await getBackendToken();
    const origin = process.env.NEXTAUTH_URL || "http://localhost:3000";

    try {
        const { data } = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${origin}`,
            userData,
            {
                headers: {
                    token: token
                }
            }
        );
        return data;
    } catch (error: any) {
        return error.response?.data || { message: "Error in Online Order" , position : "top-center"};
    }
}