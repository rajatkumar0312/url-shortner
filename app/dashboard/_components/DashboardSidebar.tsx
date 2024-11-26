"use client";

import Link from "next/link";
import Image from "next/image";

export default function DashboardSidebar() {
    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">OPN.MY</div>
                </Link>
                <li className="nav-item active">
                    <Link className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Analytics</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Links</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"></i>
                        <span>QR Code</span></Link>
                </li>

                <div className="sidebar-card d-none d-lg-flex">
                    <Image className="sidebar-card-illustration mb-2" src="/undraw_rocket.svg" width="50" height="50" alt="..." />
                    <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                    <Link className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</Link>
                </div>

                </ul>
        </>
    );
}
