"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function logOut(){
    const router = useRouter();

    useEffect(() => {
        signOut({ callbackUrl: "/login" });
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Signing you out...</h1>
        </div>
    );
}