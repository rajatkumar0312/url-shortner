import Link from 'next/link';
export default function Footer(){
    return(
        <footer className="bg-dark">
            <div className="container">
                <div className="row">
                    {/* <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="footer-item">
                            <div className="footer-heading">
                            <h2>About Us</h2>
                            </div>
                            <p>Host Cloud is provided by TemplateMo for free of charge. Anyone can download and use this CSS Bootstrap template for commercial purposes.</p>
                        </div>
                    </div>
                    
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="footer-item">
                            <div className="footer-heading">
                            <h2>Hosting Plans</h2>
                            </div>
                            <ul className="footer-list">
                            <li><a href="#">Basic Cloud 5X</a></li>
                            <li><a href="#">Cloud VPS 10X</a></li>
                            <li><a href="#">Advanced Cloud</a></li>
                            <li><a href="#">Custom Designs</a></li>
                            <li><a href="#">Special Solutions</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="footer-item">
                            <div className="footer-heading">
                            <h2>Useful Links</h2>
                            </div>
                            <ul className="footer-list">
                            <li><a href="#">Cloud Hosting Platform</a></li>
                            <li><a href="#">Light Speed Zone</a></li>
                            <li><a href="#">Content Delivery Network</a></li>
                            <li><a href="#">Customer Support</a></li>
                            <li><a href="#">Latest News</a></li>
                            </ul>
                        </div>
                    </div>  
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="footer-item">
                            <div className="footer-heading">
                            <h2>More Information</h2>
                            </div>
                            <ul className="footer-list">
                            <li>Phone: <a href="#">010-020-0560</a></li>
                            <li>Email: <a href="#">mail@company.com</a></li>
                            <li>Support: <a href="#">support@company.com</a></li>
                            <li>Website: <a href="#">www.company.com</a></li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="col-md-12">
                        <div className="sub-footer py-3">
                            <div className="row">
                                <div className="col-lg-6">
                                    <p className="mb-0 text-left text-white d-flex gap-3">
                                        <Link href="/terms" className="text-white">Terms & Conditions</Link> 
                                        <Link href="/privacy-policy" className="text-white">Privacy Policy</Link>
                                        <Link href="/cookie-policy" className="text-white">Cookie Policy</Link>
                                    </p>
                                </div>
                                <div className="col-lg-6">
                                    <p className="mb-0 text-end text-white">&copy; 2024 OPN.MY - Powered by <Link href="https://webdev24x7.com" target="_blank" className="text-white">WebDev24x7</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}