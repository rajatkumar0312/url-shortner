"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <h2 className="lh-1"><Link className="navbar-brand lh-1" href="/">OPN.MY</Link></h2>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav mx-auto gap-2">
                            <li className="nav-item">
                                <Link className={`nav-link text-white ${pathname === '/' ? 'active' : ''} `} href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-white ${pathname === '/about' ? 'active' : ''} `} href="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-white ${pathname === '/pricing' ? 'active' : ''} `} href="/pricing">Price Plan</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="functional-buttons">
                        <ul className="navbar-nav ml-auto gap-3">
                            <li className="nav-item"><Link className="btn btn-primary" href="/login">Log in</Link></li>
                            <li className="nav-item"><Link className="btn btn-success" href="/register">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}