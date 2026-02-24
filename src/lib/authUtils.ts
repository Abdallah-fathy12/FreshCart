"use server"

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { getServerSession } from "next-auth"
import { nextAuthConfig } from "./nextAuth.config"

export async function getUserToken() {
    try {
        // Try getting session from next-auth first (More reliable)
        const session: any = await getServerSession(nextAuthConfig)
        if (session?.userTokenFromBackend) {
            return session.userTokenFromBackend
        }
    } catch (error) {
        console.error("Error getting session in getUserToken:", error)
    }

    // Fallback to manual cookie parsing if session is not available
    let myCookies = await cookies()
    let tookenFromCookies = myCookies.get("next-auth.session-token") || myCookies.get("__Secure-next-auth.session-token")

    if (!tookenFromCookies?.value) {
        return null
    }

    try {
        let decodedJwt = await decode({ token: tookenFromCookies.value, secret: process.env.NEXTAUTH_SECRET! })
        return decodedJwt?.userTokenFromBackend || null
    } catch (error) {
        console.error("Error decoding token manually:", error)
        return null
    }
}