import Link from "next/link";
export default function Pricing(){
    return(
        <main className="mainContent">
            <section id="pricingFirst" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Pricing Plans</h2>
                            <p>Find a plan that meets your needs</p>
                            <p className="d-flex gap-2">
                                <span className="text-muted">Billing Cycle:</span> Monthly 
                                <span className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
                                </span>
                                Annually
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <div className="planGrid">
                                <h4>Free</h4>
                                <h2>$0.00 <span className="text-muted text-small">/ mo</span></h2>
                                <p className="text-center fw-700">500 Links with Unlimited click tracking</p>
                                <p className="planFeaturesHead">Get full access to our Free features including:</p>
                                <ul>
                                    <li>QR Code Generator</li>
                                    <li>Link Analytics (Basic)</li>
                                    <li>Link Editing & Deletion</li>
                                    <li>24x7 Email Support</li>
                                </ul>
                                <p className="planLastDetail">Enjoy 500 links with unlimited clicks and track up to 1K clicks on links.</p>
                                <Link href="/register" className="w-100 btn btn-primary">Sign Up</Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="planGrid">
                                <h4>Pro</h4>
                                <h2>$7.99 <span className="text-muted text-small">/ mo</span></h2>
                                <p className="text-center fw-700">100K Links with Unlimited click tracking</p>
                                <p className="planFeaturesHead">Get full access to our Pro features including:</p>
                                <ul>
                                    <li>QR Code Generator</li>
                                    <li>Link Analytics (Advanced)</li>
                                    <li>Advanced Link Management</li>
                                    <li>Link Editing & Deletion</li>
                                    <li>Custom Link Expiration Dates</li>
                                    <li>24x7 Email/WhatsApp/Call Support</li>
                                </ul>
                                <p className="planLastDetail">Enjoy all Pro features, 90-day default link expiration, and track unlimited clicks on short links.</p>
                                <Link href="/register" className="w-100 btn btn-primary">Sign Up</Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="planGrid">
                                <h4>Enterprise</h4>
                                <h2>Custom</h2>
                                <p className="planLastDetail">Need a larger limit, dedicated customer support, custom solutions, or specific compliance requirements?</p>
                                <p className="planLastDetail">We offer tailor-made plans for enterprises that need more than what our regular plans can offer.</p>
                                <p className="planLastDetail">Have a chat with our experts to get started on an enterprise plan.</p>
                                <Link href="/register" className="w-100 btn btn-primary">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}