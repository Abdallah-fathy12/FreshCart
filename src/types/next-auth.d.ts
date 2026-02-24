import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        userTokenFromBackend?: string
        user: {
            userTokenFromBackend?: string
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        userTokenFromBackend?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userTokenFromBackend?: string
    }
}
