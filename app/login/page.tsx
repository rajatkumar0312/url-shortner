"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn, getSession, signOut } from "next-auth/react";

export default function Login(){
    const router = useRouter();
    const [formData, setFormData] = useState({username: '', password: ''});
    const [loading, setLoading] = useState(false);
    //const [result, setResult] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setFormData(prevFormData =>({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        if (!formData.username || !formData.password) {
            toast.error("Please fill in both username and password.");
            setLoading(false);
            return;
        }
    
        try {
            //console.log("Attempting to sign in with credentials:", formData);
            const result = await signIn("credentials", {
                redirect: false, // Prevent redirect for manual handling
                username: formData.username,
                password: formData.password,
            });
    
            //console.log("SignIn Result:", result);
    
            if (result?.error) {
                toast.error(result.error || "Login failed. Please try again.");
                setLoading(false);
                return;
            }
    
            //console.log("Fetching session after successful sign-in...");
            const session = await getSession();
            //console.log("Retrieved Session Data:", session);
    
            // Check session status
            if (!session || session?.ustatus === "not_found" || session?.ustatus === "failed") {
                //console.log("Unauthenticated session detected.");
                toast.error(session?.message || "Login failed. Please check your credentials and try again.");

                // Destroy session, JWT, and cookies
                await signOut({ redirect: false }); 
                document.cookie.split(";").forEach((cookie) => {
                    const name = cookie.split("=")[0].trim();
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
                });
                //console.log("session destroyed");
                router.push("/login"); 
                return;
            }

    
            if (session?.ustatus === "success") {
                toast.success(session.message || "Login successful! Redirecting...");
                router.push("/dashboard/home");
            } else {
                toast.error("Unexpected session status. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            toast.info("Redirecting to Google login...");
    
            const result = await signIn("google", {
                callbackUrl: "/dashboard/home",
            });
        } catch (error) {
            console.error("Google login error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return(
        <main className="mainContent">
            <section id="firstRegister" className="py-5">
                <div className="container">
                    <div className="row slign-items-center justify-content-center">
                        <div className="col-lg-4">
                            <h2 className="text-center text-black">OPN.MY</h2>
                            <p className="text-center mb-3 text-black">Welcome to OPN.MY Free URL Shortner</p>
                            <div className="registerForm">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail" className="form-label text-black">Email address</label>
                                        <input type="email" className="form-control" value={formData.username} name="username" aria-describedby="emailHelp" required onChange={handleChange} placeholder="Enter Email Address" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword" className="form-label text-black">Password</label>
                                        <input type="password" className="form-control" value={formData.password}  name="password" required onChange={handleChange} placeholder="Enter Password" />
                                    </div>
                                    <p className="fs-10 my-3"><Link href="/forgot-password">Forgot Password?</Link>.</p>
                                    <button type="submit" className={`btn btn-primary w-100 ${loading === true ? 'd-none' : ''} `}>Sign In</button>
                                    {loading &&
                                        <div className="spinner-border text-success d-block mx-auto" role="status" id="urlProcess">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                    
                                    <button
                                        className={`btn btn-danger mt-3 w-100 ${loading ? "d-none" : ""}`}
                                        onClick={handleGoogleLogin}
                                    >
                                        Sign in with Google
                                    </button>
                                    <p className="fs-10 mt-3 text-center text-black">Don’t have an account? <Link href="/register">Sign Up</Link>.</p>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}