"use client";
//import { Metadata } from "next";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
// browser metadata
// export const metadata: Metadata = {
//     title: "Register OPN.MY - Free URL Shortner",
//     description: "About - Free URL Shortner",
// };
//handle change in input

export default function Register(){
    const [formData, setFormData] = useState({name:'', email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch('/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
            });
            if(!response.ok){
                toast.error('Sorry! There is some issue at our end, please try again later.')
            }
            const data = await response.json();
            setResult(data.result);
            if(result === 'success' ){
                toast.success(`${formData.name}, You've registered successfully. You can now login.`);
            }
            
            if(formRef.current){
                formRef.current.reset();
            }
            setFormData({ name: '', email: '', password: '' });

        } catch (error) {
            console.error('API Error:', error);
        }
        setLoading(false);
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
                                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            className="form-control" 
                                            placeholder="Enter Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            className="form-control" 
                                            id="inputEmail" 
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            aria-describedby="emailHelp" 
                                            required
                                        />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            name="password"
                                            className="form-control" 
                                            placeholder="Enter Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            id="exampleInputPassword" 
                                            required 
                                        />
                                    </div>
                                    <p className="fs-10">By clicking on “Create Account”, I agree to the <Link href="/terms">Terms of Service</Link>, <Link href="/privacy-policy">Privacy Policy</Link>, and <Link href="/cookies-policy">Use of Cookies</Link>.</p>
                                    <button type="submit" className={`btn btn-primary w-100 ${loading === true ? 'd-none' : ''} `}>Create An Account</button>
                                    {loading &&
                                        <div className="spinner-border text-success d-block mx-auto" role="status" id="urlProcess">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                </form>
                            </div>
                            {/* <p>{result}</p> */}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}