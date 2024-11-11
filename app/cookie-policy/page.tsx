import Link from "next/link";
export default function CookiePolicy(){
    return(
        <main className="mainContent">
            <section id="termsFirst" className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <h2>Cookie Policy</h2>
                            <p><Link href="/">OPN.MY</Link> is a powerful and easy-to-use web tool crafted to help users create short links and QR codes for any URL. In today’s digital world, sharing links in a concise, accessible way is essential, whether it’s for personal use, marketing, or business purposes. OPN.MY provides an efficient solution by converting long, complex URLs into short, manageable links and QR codes that can be shared effortlessly across various platforms, including social media, emails, and print materials.</p>
                            <p>By creating shortened links, you not only save space but also make your content more visually appealing, which can improve user engagement and click-through rates. Additionally, QR codes generated by OPN.MY allow users to scan and access URLs directly on their mobile devices, streamlining access to information without the hassle of typing in long web addresses. This makes OPN.MY an ideal tool for businesses looking to improve their marketing efforts or individuals wanting a seamless way to share content with friends, family, or followers.</p>
                            <p>Beyond link and QR code generation, OPN.MY also provides basic analytics, enabling users to track the performance of their shared links. This feature is especially useful for businesses, marketers, and content creators who want to understand their audience’s engagement and optimize their strategies based on real-time data.</p>
                            <p>If you have any questions, technical issues, or feedback, our dedicated support team is here to assist you. We understand the importance of quick and reliable assistance, so feel free to reach out to us at <Link href="mailto:contact@opn.my">contact@opn.my</Link> for inquiries related to the website, advertisements, or general help.</p> 
                            <p>At OPN.MY, our mission is to make URL management simple, effective, and accessible for everyone, so you can focus on sharing valuable content without the hassle of long links or complex QR generation tools.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}