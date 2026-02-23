"use server"

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getUserToken() {
    let myCookies = await cookies()

    let tookenFromCookies = myCookies.get("next-auth.session-token")
    console.log(tookenFromCookies?.value);

    if (!tookenFromCookies?.value) {
        return null
    }

    try {
        let decodedJwt = await decode({ token: tookenFromCookies.value, secret: process.env.NEXTAUTH_SECRET! })

        console.log("decodedJwt", decodedJwt?.userTokenFromBackend);

        return decodedJwt?.userTokenFromBackend
    } catch (error) {
        console.error("Error decoding token:", error)
        return null
    }
}