"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Login(){
    const [formData, setFormData] = useState({username: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setFormData(prevFormData =>({
            ...prevFormData,
            [name]: value
        }));
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch('/api/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'key': apiKey,
                },
                body: JSON.stringify({ username: formData.username, password: formData.password })
            });
        } catch (error) {
            
        }
    }
    
    return(
        <main className="mainContent">
            <section id="firstRegister" className="py-5">
                <div className="container">
                    <div className="row slign-items-center justify-content-center">
                        <div className="col-lg-4">
                            <h2 className="text-center">OPN.MY</h2>
                            <p className="text-center mb-3">Welcome to OPN.MY Free URL Shortner</p>
                            <div className="registerForm">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                                        <input type="email" className="form-control" value={formData.username} name="username" id="exampleInputEmail" aria-describedby="emailHelp" required onChange={handleChange} />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" value={formData.password}  name="password" id="exampleInputPassword" required onChange={handleChange} />
                                    </div>
                                    <p className="fs-10 my-3"><Link href="/forgot-password">Forgot Password?</Link>.</p>
                                    <button type="submit" className={`btn btn-primary w-100 ${loading === true ? 'd-none' : ''} `}>Sign In</button>
                                    {loading &&
                                        <div className="spinner-border text-success d-block mx-auto" role="status" id="urlProcess">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                    <p className="fs-10 mt-3 text-center">Don’t have an account? <Link href="/register">Sign Up</Link>.</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}