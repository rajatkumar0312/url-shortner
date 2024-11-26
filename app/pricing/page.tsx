import Link from "next/link";
export const metadata: Metadata = {
    title: 'Pricing Plan OPN.MY - Free URL Shortner',
    description: 'Check pricing for Free URL Shortner',
}
export default function Pricing(){
    return(
        <main className="mainContent">
            <section id="pricingFirst" className="py-5 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="text-black">Pricing Plans</h2>
                            <p className="text-black">Find a plan that meets your needs</p>
                            {/* <p className="d-flex gap-2">
                                <span className="text-muted">Billing Cycle:</span> Monthly 
                                <span className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
                                </span>
                                Annually
                            </p> */}
                        </div>
                        <div className="col-lg-4">
                            <div className="planGrid">
                                <h4 className="text-black">Basic</h4>
                                <h2 className="text-black">Free</h2>
                                <p className="planFeaturesHead text-black">Get full access to our Free features including:</p>
                                <ul className="text-black">
                                    <li>500 Links with Unlimited click tracking</li>
                                    <li>QR Code Generator</li>
                                    <li>Link Analytics (Basic)</li>
                                    <li>Link Editing & Deletion</li>
                                    <li>24x7 Email Support</li>
                                </ul>
                                <p className="planLastDetail text-black">Enjoy 500 links with unlimited clicks and track unlimited clicks on short links.</p>
                                <Link href="/register" className="btn btn-primary">Sign Up</Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="planGrid">
                                <h4 className="text-black">Pro</h4>
                                <h2 className="text-black">$4.99 <span className="text-muted text-small">/ mo</span></h2>
                                <p className="planFeaturesHead text-black">Get full access to our Pro features including:</p>
                                <ul className="text-black">
                                    <li>100K Links with Unlimited click tracking</li>
                                    <li>QR Code Generator</li>
                                    <li>Link Analytics (Advanced)</li>
                                    <li>Advanced Link Management</li>
                                    <li>Link Editing & Deletion</li>
                                    <li>Custom Link Expiration Dates</li>
                                    <li>24x7 Email/WhatsApp/Call Support</li>
                                </ul>
                                <p className="planLastDetail text-black">Enjoy all Pro features, 90-day default link expiration, and track unlimited clicks on short links.</p>
                                <Link href="/register" className="btn btn-primary">Sign Up</Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="planGrid">
                                <h4 className="text-black">Enterprise</h4>
                                <h2 className="text-black">Custom</h2>
                                <p className="planLastDetail text-black">Need a larger limit, dedicated customer support, custom solutions, or specific compliance requirements?</p>
                                <p className="planLastDetail text-black">We offer tailor-made plans for enterprises that need more than what our regular plans can offer.</p>
                                <p className="planLastDetail text-black">Have a chat with our experts to get started on an enterprise plan.</p>
                                <Link href="/contact" className="btn btn-primary">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}