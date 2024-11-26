// app/dashboard/home/page.tsx
"use client";

import { useSession } from "next-auth/react";
import DashboardLayout from "@/app/dashboard/_components/DashboardLayout";

export default function DashboardHome() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <DashboardLayout>
            <h2>Welcome {session?.user?.name || "User"}! to the Dashboard!</h2>
            <p>This is your personalized dashboard where you can manage everything.</p>
        </DashboardLayout>
    );
}
