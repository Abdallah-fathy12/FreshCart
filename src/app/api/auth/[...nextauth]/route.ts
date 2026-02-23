import { nextAuthConfig } from "@/lib/nextAuth.config"
import NextAuth from "next-auth"

const handler = NextAuth( nextAuthConfig )

export { handler as GET, handler as POST }