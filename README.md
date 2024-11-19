URL Shortener Next.js Authentication Project

This project demonstrates user authentication and session management using NextAuth.js with a custom credentials provider and Google OAuth. It includes protected routes, a custom login page, a signout page, and error handling.

Features

	•	✅ User authentication via credentials (username and password) from a third-party API.
	•	✅ Google OAuth login.
	•	✅ Protected routes for authenticated users only.
	•	✅ Customizable login, signout, and error pages.
	•	✅ JWT-based session management.

Project Structure

/app
  /api
    /auth
      /[...nextauth]
        route.ts         # NextAuth API configuration
  /dashboard
    /home
      page.tsx          # Protected dashboard page
  /login
    page.tsx            # Custom login page
  /signout
    page.tsx            # Signout page
  /error
    page.tsx            # Custom error page
  layout.tsx            # Wraps app in SessionProvider
  globals.css           # Global styles

Getting Started

1. Prerequisites

Ensure the following tools are installed:
	•	Node.js (v14 or later)
	•	npm or yarn

2. Installation

Clone the repository and install dependencies:

git clone <repository-url>
cd <project-folder>
npm install

3. Environment Variables

Create a .env.local file in the root directory and configure the following environment variables:

# NextAuth Configuration
NEXTAUTH_SECRET=your-random-secret

# Custom API
LOGIN_API_URL=https://your-api.com/authenticate
URL_API_KEY=your-api-key

# Google OAuth
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

4. Running the Development Server

Start the development server:

npm run dev

Visit http://localhost:3000 in your browser.

Usage

Authentication Flow

	1.	Login Page:
	•	Users can log in via credentials or Google OAuth.
	•	Invalid credentials or non-existent users show appropriate error messages.
	2.	Dashboard Page:
	•	Accessible only to authenticated users.
	•	Non-authenticated users are redirected to the login page.
	3.	Signout:
	•	Users can sign out and will be redirected to the login page.

Custom Pages

Login Page

	•	Location: /login
	•	Handles user login via credentials or Google OAuth.

Dashboard Page

	•	Location: /dashboard/home
	•	Protected page accessible only to logged-in users.

Signout Page

	•	Location: /signout
	•	Logs out the user and redirects to /login.

Error Page

	•	Location: /error
	•	Displays custom error messages for authentication failures.

Code Overview

NextAuth Configuration

File: /app/api/auth/[...nextauth]/route.ts
	•	Configures NextAuth.js with:
	•	Credentials Provider: Authenticates users via a third-party API.
	•	Google Provider: Allows login via Google OAuth.
	•	Includes custom JWT and session callbacks for passing additional fields (e.g., status, message, role) to the client.

Protecting Routes

The /dashboard/home page uses useSession to check authentication status. Non-authenticated users are redirected to the login page.

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardHome() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return <h1>Welcome to the Dashboard, {session?.user?.name || "User"}!</h1>;
}

Custom Signout

The /signout page calls the signOut function from NextAuth to log out users and redirect them to /login.

Custom Error Handling

The authorize function in CredentialsProvider handles errors and passes relevant messages to the client. Example:

async authorize(credentials) {
    const { username, password } = credentials;

    try {
        const response = await fetch(process.env.LOGIN_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                key: process.env.URL_API_KEY!,
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { id: data.user.id, name: data.user.name, email: data.user.email_address };
        } else if (data.status === "not_found") {
            throw new Error("User not found.");
        } else if (data.status === "failed") {
            throw new Error("Invalid username or password.");
        }

        throw new Error("Unexpected error occurred.");
    } catch (error) {
        console.error("Authorization Error:", error);
        throw new Error(error.message || "Login failed.");
    }
}

Scripts

	•	npm run dev: Start the development server.
	•	npm run build: Build the application for production.
	•	npm run start: Start the production server.

Troubleshooting

	1.	Invalid Credentials:
	•	Ensure the third-party API URL and key are correctly set in .env.local.
	2.	Google OAuth Issues:
	•	Verify the AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET in the Google Developer Console.
	3.	Session Issues:
	•	Ensure the SessionProvider wraps your application in /app/layout.tsx.

Future Enhancements

	•	🔒 Add role-based access control (e.g., admin, user).
	•	🔑 Implement password reset functionality.
	•	📊 Enhance error logging and reporting.

License

This project is open-source and available under the MIT License.

Feel free to copy this directly into your GitHub repository. Let me know if you’d like further adjustments! 😊