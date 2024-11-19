import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    debug: true,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
            
                const apiUrl = process.env.LOGIN_API_URL;
                const apiKey = process.env.URL_API_KEY || "";
            
                if (!username || !password || !apiUrl) {
                    return { status: "failed", message: "Missing required credentials or API URL" };
                }
            
                try {
                    const response = await fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            key: apiKey,
                        },
                        body: JSON.stringify({ username, password }),
                    });
            
                    const data = await response.json();
                    console.log('API Response:', data);
                    if (response.ok) {
                        if (data.status === "success") {
                            return {
                                id: data.user.id,
                                name: data.user.name,
                                email: data.user.email_address,
                                status: "success",
                                message: data.message,
                            };
                        }
            
                        if (data.status === "not_found") {
                            return(data.message || "User not found.");
                        }
            
                        if (data.status === "failed") {
                            return(data.message || "Login failed.");
                        }
                        
                    }
                    throw new Error("Unexpected error occurred. Please try again.");
                } catch (error) {
                    console.error("Authorization Error:", error);
                    return { status: "failed", message: "An error occurred. Please try again." };
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.status = user.status || null; // Add custom status
                token.message = user.message || null; // Add custom message
                token.role = user.role || "user"; // Add role if provided
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role, // Pass role to session
                };
                session.status = token.status || null; // Add custom status
                session.message = token.message || null; // Add custom message
            }
            return session;
        },
    },
    pages: {
        signIn: "/login", // Custom login page
        error: "/error",  // Custom error page
    },
});

export { handler as GET, handler as POST };