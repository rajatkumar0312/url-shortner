import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const url = req.nextUrl.clone();

    // Define protected routes
    const protectedRoutes = ["/dashboard"];

    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        if (!token) {
            // Redirect to login if no token is found
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/dashboard/:path*"], // Protect all routes under /dashboard
};