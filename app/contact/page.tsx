import Link from "next/link"
export default function Contact(){
    return (
        <main className="mainContent">
            <section id="firstContact" className="py-5">
                <div className="container">
                    <div className="row justify-content-start">
                        <div className="col-lg-12 mb-3">
                            <h2>Contact Us</h2>
                            <p>Please fill below form if you want have any query/message/feedback/feature request.</p>
                        </div>
                        <div className="col-lg-3">
                            <div className="contactPageInfo">
                                <h4>Email</h4>
                                <p><Link href="mailto:contact@opn.my">contact@opn.my</Link></p>    
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="contactPageInfo">
                                <h4>Phone</h4>
                                <p><Link href="tel:917827422309">+91-7827422309</Link></p>    
                            </div>
                        </div>
                    </div>
                    <div className="contactForm mb-5 pt-5">
                        <form>
                            <div className="row">
                                <div className="col-lg-6 form-group mb-3">
                                    <input type="text" placeholder="Enter Full Name" className="form-control" required/>
                                </div>
                                <div className="col-lg-6 form-group mb-3">
                                    <input type="email" placeholder="Enter Email Address" className="form-control" required/>
                                </div>
                                <div className="col-lg-6 form-group mb-3">
                                    <input type="tel" placeholder="Enter Phone Number" className="form-control" required />
                                </div>
                                <div className="col-lg-6 form-group mb-3">
                                    <input type="text" placeholder="Enter Subject" className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <textarea placeholder="Enter Name" className="form-control" rows={5} required></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="submit" value="Send Message" className="form-control btn btn-success" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}