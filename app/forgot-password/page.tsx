import Link from "next/link";
export default function forgotPassword(){
    return(
        <main className="mainContent">
            <section id="firstForgot" className="py-5">
                <div className="container">
                    <div className="row slign-items-center justify-content-center">
                        <div className="col-lg-4">
                            <h2 className="text-center">OPN.MY</h2>
                            <p className="text-center mb-3">Welcome to OPN.MY Free URL Shortner</p>
                            <div className="registerForm">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Forgot Password</button>
                                    {/* <p className="fs-10 d-flex flex-auto gap-3 mt-3"> <Link href="/login" className="btn btn-primary w-100">Login</Link> <Link href="/register" className="btn btn-primary w-100">SignUp</Link>.</p> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}