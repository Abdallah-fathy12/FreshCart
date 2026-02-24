import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const nextAuthConfig: NextAuthOptions = {

    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async function (userData) {

                console.log(userData);

                let res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "post",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let finalRes = await res.json()
                console.log("finalRes", finalRes);

                if (finalRes.message == "success") {
                    return {
                        id: "",
                        name: finalRes.user.name,
                        email: finalRes.user.email,
                        userTokenFromBackend: finalRes.token,
                    }
                } else {
                    return null
                }

            }
        })
    ],
    pages: {
        signIn: "/login",
        // signOut : "/signout"
    },

    callbacks: {
        // jwt => بتشتغل مرتين مره مع ال login ومره مع ال navgation
        jwt({ token, user }: any) {
            if (user) {
                token.userTokenFromBackend = user.userTokenFromBackend
            }
            return token
        },
        session({ session, token }: any) {
            if (token) {
                session.userTokenFromBackend = token.userTokenFromBackend
            }
            return session
        }
    },

    session: {
        maxAge: 60 * 60 * 24
    },

    secret: process.env.NEXTAUTH_SECRET
}