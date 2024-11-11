import Link from "next/link";
export const metadata: Metadata = {
    title: "Login OPN.MY - Free URL Shortner",
    description: "About - Free URL Shortner",
};
export default function Login(){
    return(
        <main className="mainContent">
            <section id="firstRegister" className="py-5">
                <div className="container">
                    <div className="row slign-items-center justify-content-center">
                        <div className="col-lg-4">
                            <h2 className="text-center pt-5">OPN.MY</h2>
                            <p className="text-center mb-3">Welcome to OPN.MY Free URL Shortner</p>
                            <div className="registerForm">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" required />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword" required />
                                    </div>
                                    <p className="fs-10 my-3"><Link href="/forgot-password">Forgot Password?</Link>.</p>
                                    <button type="submit" className="btn btn-primary w-100">Sign In</button>
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