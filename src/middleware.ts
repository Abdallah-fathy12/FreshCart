import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    const { pathname } = req.nextUrl

    // Allow the requests if the following is true...
    // 1) It's a request for next-auth session & provider fetching
    // 2) the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    // Redirect them to login if they don't have token AND are requesting a protected route
    // The matcher already excludes public routes, but this is a double safety
    if (!token && pathname !== '/login' && pathname !== '/signup' && pathname !== '/') {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (auth page)
     * - signup (auth page)
     * - public files (images folder etc)
     * - home page (/)
     */
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|signup|images|$).*)'],
}
