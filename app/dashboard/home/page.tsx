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

    return (
        <main className="mainContent">
            <section id="dHomeFirst" className="py-5">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="dashboardSidebar">
                                {/* Sidebar Component */}
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="dashboardContent">
                                <h2>Welcome {session?.user?.name || "User"}!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}