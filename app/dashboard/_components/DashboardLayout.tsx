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

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <>
            <DashboardHeader></DashboardHeader>
            <main className="dashboardLayout">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="dashboardSidebar">
                                <DashboardSidebar></DashboardSidebar>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="dashboardContent">{children}</div>
                        </div>
                    </div>
                </div>
            </main>
            <DashboardFooter></DashboardFooter>
        </>
    );
}
