"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const clearSession = async () => {
            await signOut({ redirect: false });
            
            document.cookie.split(";").forEach((cookie) => {
                const name = cookie.split("=")[0].trim();
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
            });

            router.replace("/login");
        };

        clearSession();
    }, [router]);

    return (
        <div className="container text-center">
            <h1 className="py-5 text-center">Logging you out...</h1>
        </div>
    );
}
