"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [activeTab, setActiveTab] = useState('shortUrl');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try{
      const response = await fetch('/api/shorten-url', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorMessage = `This is a malicious/banned URL we can't create shortlink, please try with any safe URL.`;
        alert(errorMessage);
      }

      const data = await response.json();
      //console.log(data.result);
      setResult(data.result);
    }catch(error){
      console.log('API Error:', error);
      setResult(`${error}`);
    }
    setLoading(false);
  }

  const handleUrlCopy = () => {
    const responseUrlElement = document.getElementById('responseUrlExact') as HTMLInputElement;
    if(responseUrlElement && responseUrlElement.value){
      navigator.clipboard.writeText(responseUrlElement.value)
      .then(() => {
        alert(`${responseUrlElement.value} copied to clipboard!`);
      })
      .catch((error) => {
        console.error('Failed to copy URL', error);
        alert('Failed to copy URL.')
      })
    }else{
      alert('Please enable JavaScript in your browser');
    }
  }

  return (
    <main className="mainContent">
      <Head>
          <title>Home OPN.MY - Free URL Shortner</title>
          <meta name="description" content="Description of my page" />
      </Head>
      <section id="homeFirst" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="header-text caption py-5">
                  <h1 className="display-4 text-white text-center fw-bold">Free URL Shortner</h1>
                  <p className="mb-5 text-white text-center">OPN.MY is a free tool to shorten URLs powered by Rebrandly. Create short & memorable links in seconds.</p>
                  <div className="d-flex flex-auto mb-3">
                    <p className="text-center mx-auto d-flex gap-3">
                      <button className={`btn btn-primary mr-3 ${activeTab === 'shortUrl' ? 'disabled' : ''}`} id="shortUrlTabBtn" onClick={() => (setActiveTab('shortUrl'))}>Generate Short URL</button>
                      <button className={`btn btn-primary ${activeTab === 'qrCode' ? 'disabled' : ''} `} id="qrCodeTabBtn" onClick={() => (setActiveTab('qrCode'))}>Generate QR Code</button>
                    </p>
                  </div>
                  <div className={`urlForm ${activeTab === 'shortUrl' ? '' : 'd-none'}`}>
                    <form onSubmit={handleSubmit} id="urlForm">
                      <div className="mb-3 text-center">
                        <div className="row">
                          <div className="col-lg-9">
                            <input 
                              type="url" 
                              placeholder="Enter/Paste URL to convert shortlink" 
                              className="form-control text-center mb-3" 
                              value={url}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-lg-3">
                            <input type="submit" value="Shorten URL" className={`btn btn-success w-100 ${loading === true ? 'd-none' : ''}`} />
                            {loading &&
                              <div className="spinner-border text-success" role="status" id="urlProcess">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            }
                          </div>                            
                        </div>
                      </div>
                    </form>
                    {result &&
                      <div className="urlResponse">
                        <div className="row">
                          <div className="col-lg-8">
                            <div className="responseUrlField">
                              <input type="url" id="responseUrlExact" value={result} disabled className="form-control"/>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="d-flex gap-3 flex-auto">
                              <div className="copyBtn w-100">
                                <button id="copyUrl" className="btn btn-primary w-100" onClick={handleUrlCopy}>Copy</button>
                              </div>
                              <div className="trackBtn w-100">
                                <button id="trackUrl" className="btn btn-primary w-100">Track</button>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <p className="loginText text-small text-center py-3 text-white">You can track unlimited URL with our Free Plan, <Link href="/register" className="text-white">Register Now!</Link> Offer ends soon</p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div className={`qrForm ${activeTab === 'qrCode' ? '' : 'd-none'}`}>
                    <form id="qrForm">
                      <div className="mb-3">
                        <div className="row">
                          <div className="col-lg-9">
                            <input type="url" id="url" placeholder="Enter/Paster URL to convert QR code" className="form-control text-center mb-3" required/>
                          </div>
                          <div className="col-lg-3">
                          <input type="submit" value="Get QR Code" className="btn btn-success w-100" />
                            {loading &&
                              <div className="spinner-border text-success" role="status" id="urlProcess">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            }
                          </div>                            
                        </div>
                      </div>
                    </form>
                    <div className="qrResponse d-none">
                      <div className="row justify-content-center">
                        <div className="col-lg-12">
                          <div className="responseQrField text-center">
                            <Image src="/qr.png" alt="QR Code generated using OPN.MY Free URL Shortner" className="img-responsive mb-3" width={150} height={150} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="d-flex gap-3 flex-auto">
                            <div className="copyBtn w-100">
                              <button id="downloadUrl" className="btn btn-primary w-100">Download QR</button>
                            </div>
                            <div className="trackBtn w-100">
                              <button id="trackUrl" className="btn btn-primary w-100">Track</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <p className="loginText text-small text-center text-white py-3">You can track unlimited URL with our Free Plan, <Link href="/register">Register Now!</Link> Offer ends soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <p className="w-100 text-center text-white">By clicking Shorten URL, you agree to OPN.MY's <Link href="/terms" className="text-white">Terms of Use</Link>, <Link href="/privacy-policy" className="text-white">Privacy Policy</Link> and <Link href="/cookie-policy" className="text-white">Cookie Policy</Link></p>
          </div>
        </div>
      </section>
      <section id="secondHome" className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5">
              <h2>Streamline Your Links with Our Free URL Shortener</h2>
              <p>Transform lengthy, cumbersome URLs into clean, memorable, and <Link href="/track">trackable short links</Link> with our fast and easy-to-use URL shortener. Perfect for sharing on social media platforms like Twitter, Facebook, Instagram, and YouTube, as well as in emails, SMS, blogs, ads, and more. Whether you're sharing content on WhatsApp, in emails, or through videos, our service offers a powerful and free alternative to generic shorteners like Bitly or TinyURL. Plus, after shortening your link, you can easily track how many clicks it receives to measure your impact.</p>
              <p>Start using our <Link href="https://opn.my">Free URL shortener</Link> today to simplify your sharing and boost your engagement!</p>
            </div>
            <div className="col-lg-12">
              <h2>Simplify Your Links with Our Free URL Shortener</h2>
              <p>Turn long, complicated URLs into concise, easy-to-share links using our Free URL Shortener. Perfect for social media, emails, blogs, SMS, and more, our tool allows you to create memorable, trackable short URLs for all your needs. Whether you're sharing on Twitter, Facebook, Instagram, YouTube, or any other platform, our Free URL Shortener is the ideal solution for making your links more user-friendly. Plus, you can track the clicks your shortened URLs receive, giving you valuable insights into your audience's engagement.</p>
              <p>Try our <Link href="https://opn.my">Free URL Shortener</Link> now and enhance your sharing experience!</p>
            </div>
          </div>
        </div>
      </section>
      <section id="thirdHome" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="singleFeatureHome">
                <h3>Effortless</h3>
                <p>OPN.MY makes shortening links quick and simple—just enter your long URL, and instantly get a shortened link.</p>
              </div>
            </div>
            <div className="col">
              <div className="singleFeatureHome">
                <h3>Shortened</h3>
                <p>No matter the length, OPN.MY can shorten any link with ease.</p>
              </div>
            </div>
            <div className="col">
              <div className="singleFeatureHome">
                <h3>Secure</h3>
                <p>Our service is not only fast but also secure, featuring HTTPS protocol and robust data encryption to protect your information.</p>
              </div>
            </div>
            <div className="col">
              <div className="singleFeatureHome">
                <h3>Analytics</h3>
                <p>Track the number of clicks your shortened URL has received.</p>
              </div>
            </div>
            <div className="col">
              <div className="singleFeatureHome">
                <h3>Cross-Platform</h3>
                <p>Works seamlessly on smartphones, tablets, and desktops.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="fourHome" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <Image
                src="/Brand-Keepers.png"
                alt="Client Logo"
                width={300}
                height={80}
              />
            </div>
            <div className="col">
              <Image
                src="/webdev-logo.png"
                alt="Client Logo"
                width={250}
                height={70}
              />
            </div>
            <div className="col">
              <Image
                src="/fixmyspeakers-logo.png"
                alt="Client Logo"
                width={250}
                height={80}
              />
            </div>
            <div className="col">
              <Image
                src="/final-logo-dvc.png"
                alt="Client Logo"
                width={200}
                height={100}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
