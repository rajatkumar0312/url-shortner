"use client";

import Link from "next/link";

export default function DashboardSidebar() {
    return (
        <nav className="dashboard-sidebar">
            <ul>
                <li>
                    <Link href="/dashboard/home">Home</Link>
                </li>
                <li>
                    <Link href="/dashboard/settings">Settings</Link>
                </li>
                <li>
                    <Link href="/dashboard/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
}
