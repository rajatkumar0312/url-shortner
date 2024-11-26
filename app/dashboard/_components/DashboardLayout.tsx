// app/_component/DashboardLayout.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        // Dynamically add the CSS file for the dashboard
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/css/sb-admin-2.css";
        link.id = "dashboard-css"; // Add an ID for easy identification
        document.head.appendChild(link);

        return () => {
            // Remove the CSS file when the component is unmounted
            const existingLink = document.getElementById("dashboard-css");
            if (existingLink) {
                existingLink.remove();
            }
        };
    }, []);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div id="wrapper">
                <DashboardSidebar></DashboardSidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <DashboardHeader></DashboardHeader>
                        {children}
                    </div>
                    <DashboardFooter></DashboardFooter>
                </div>
            </div>    
        </>
    );
}
