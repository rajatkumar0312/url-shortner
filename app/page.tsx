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
        toast.error('Failed to copy URL.')
      })
    }else{
      toast.error('Please enable JavaScript in your browser');
    }
  }
  const title = 'Home OPN.MY - Free URL Shortener';
  const description = 'Description of page';
  console.log(title);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main className="mainContent">
        <section id="homeFirst" className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="header-text caption py-5">
                    <h1 className="display-4 text-white text-center fw-bold">Free URL Shortner</h1>
                    <p className="mb-5 text-white text-center">Welcome to OPN.MY – Your Go-To URL Shortener and QR Code Generator</p>
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
              <div className="col-lg-12">
                <h2 className="mb-3 text-black">Streamline Your Links with Our Free URL Shortener</h2>
                <p className="text-black">Transform lengthy, cumbersome URLs into clean, memorable, and <Link href="/track">trackable short links</Link> with our fast and easy-to-use URL shortener. Perfect for sharing on social media platforms like Twitter, Facebook, Instagram, and YouTube, as well as in emails, SMS, blogs, ads, and more. Whether you're sharing content on WhatsApp, in emails, or through videos, our service offers a powerful and free alternative to generic shorteners like Bitly or TinyURL. Plus, after shortening your link, you can easily track how many clicks it receives to measure your impact.</p>
                <p className="text-black">Start using our <Link href="https://opn.my">Free URL shortener</Link> today to simplify your sharing and boost your engagement!</p>
              </div>
            </div>
          </div>
        </section>
        <section id="fiveHome" className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center mb-5 text-black">Key Features at a Glance</h2>
              </div>
              <div className="col">
                <div className="singleHowitWorks">
                  <p className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Cut--Streamline-Plump" height="48" width="48"><desc>Cut Streamline Icon: https://streamlinehq.com</desc><g id="cut--coupon-cut-discount-price-prices-scissors"><path id="Exclude" fill="#8fbffa" fillRule="evenodd" d="M17.688 19.975a9 9 0 1 0 -10.943 0.332c1.187 0.969 3.139 2.262 5.505 3.693 -2.366 1.431 -4.318 2.724 -5.506 3.693a9 9 0 1 0 10.943 0.332s2.24 1.39 5.313 3.075l11.056 -3.075A216.767 216.767 0 0 1 24 24c8.666 -3.748 17.862 -6.833 20.856 -7.811 0.547 -0.179 0.816 -0.774 0.511 -1.263C44.486 13.513 42.312 11 38 11c-5.846 0 -20.312 8.975 -20.312 8.975ZM15 13a3 3 0 1 1 -6 0 3 3 0 0 1 6 0Zm0 22a3 3 0 1 0 -6 0 3 3 0 0 0 6 0Z" clipRule="evenodd" strokeWidth="3"></path><path id="Union" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M23 31.1a127.585 127.585 0 0 1 -5.312 -3.075 9 9 0 1 1 -10.943 -0.332c1.187 -0.969 3.139 -2.262 5.505 -3.693 -2.366 -1.431 -4.318 -2.724 -5.506 -3.693a9 9 0 1 1 10.943 -0.332S32.156 11 38 11c4.312 0 6.486 2.513 7.367 3.926 0.305 0.489 0.036 1.084 -0.511 1.263C41.862 17.167 32.666 20.252 24 24a216.767 216.767 0 0 0 10.056 4.025M15 13a3 3 0 1 1 -6 0 3 3 0 0 1 6 0Zm0 22a3 3 0 1 0 -6 0 3 3 0 0 0 6 0Z" strokeWidth="3"></path><path id="Vector 917" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m31 33 -2 0" strokeWidth="3"></path><path id="Vector 918" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m38 33 -2 0" strokeWidth="3"></path><path id="Vector 919" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m45 33 -2 0" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Shorten Your URL</h3>
                  <p className="text-black">Enter your long URL into our tool and get a clean, shareable link in seconds.</p>
                </div>
              </div>
              <div className="col">
                <div className="singleHowitWorks">
                  <p className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Select-All--Streamline-Plump" height="48" width="48"><desc>Select All Streamline Icon: https://streamlinehq.com</desc><g id="select-all"><path id="Rectangle 1101" fill="#ffffff" d="M8.25717 44.461c-2.5553 -0.2076 -4.5106 -2.1629 -4.71821 -4.7182C3.27667 36.5146 2.99999 31.364 2.99999 24c0 -7.364 0.27668 -12.5146 0.53897 -15.74282 0.20761 -2.55529 2.1629 -4.51059 4.7182 -4.7182C11.4854 3.27669 16.636 3.00001 24 3.00001c7.364 0 12.5146 0.27667 15.7428 0.53896 2.5553 0.20762 4.5106 2.16292 4.7182 4.71821C44.7233 11.4854 45 16.636 45 24c0 7.364 -0.2767 12.5146 -0.539 15.7428 -0.2076 2.5553 -2.1629 4.5106 -4.7182 4.7182C36.5146 44.7233 31.364 45 24 45c-7.364 0 -12.5146 -0.2767 -15.74283 -0.539Z" strokeWidth="3"></path><path id="Rectangle 1102" fill="#8fbffa" d="M34.7643 16.365c-0.1218 -1.7048 -1.4245 -3.0075 -3.1293 -3.1293C29.9315 13.1141 27.422 13 24 13c-3.422 0 -5.9315 0.1141 -7.635 0.2357 -1.7048 0.1218 -3.0075 1.4245 -3.1293 3.1293C13.1141 18.0685 13 20.578 13 24c0 3.422 0.1141 5.9315 0.2357 7.635 0.1218 1.7048 1.4245 3.0075 3.1293 3.1293C18.0685 34.8859 20.578 35 24 35c3.422 0 5.9315 -0.1141 7.635 -0.2357 1.7048 -0.1218 3.0075 -1.4245 3.1293 -3.1293C34.8859 29.9315 35 27.422 35 24c0 -3.422 -0.1141 -5.9315 -0.2357 -7.635Z" strokeWidth="3"></path><path id="Rectangle 1100" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M34.7643 16.365c-0.1218 -1.7048 -1.4245 -3.0075 -3.1293 -3.1293C29.9315 13.1141 27.422 13 24 13c-3.422 0 -5.9315 0.1141 -7.635 0.2357 -1.7048 0.1218 -3.0075 1.4245 -3.1293 3.1293C13.1141 18.0685 13 20.578 13 24c0 3.422 0.1141 5.9315 0.2357 7.635 0.1218 1.7048 1.4245 3.0075 3.1293 3.1293C18.0685 34.8859 20.578 35 24 35c3.422 0 5.9315 -0.1141 7.635 -0.2357 1.7048 -0.1218 3.0075 -1.4245 3.1293 -3.1293C34.8859 29.9315 35 27.422 35 24c0 -3.422 -0.1141 -5.9315 -0.2357 -7.635Z" strokeWidth="3"></path><path id="Rectangle 1112" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M26.9995 3.01587c2.2352 0.02407 4.2317 0.07402 6 0.13923" strokeWidth="3"></path><path id="Rectangle 1113" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M15 3.1551c1.7683 -0.06521 3.7648 -0.11516 6 -0.13923" strokeWidth="3"></path><path id="Rectangle 1114" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M9.00013 3.48096c-0.25814 0.01931 -0.50577 0.03867 -0.74303 0.05794 -2.5553 0.20762 -4.5106 2.16291 -4.71821 4.71821 -0.01927 0.2372 -0.03862 0.48478 -0.05793 0.74285" strokeWidth="3"></path><path id="Rectangle 1115" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3.15486 15c-0.06521 1.7683 -0.11516 3.7648 -0.13924 6" strokeWidth="3"></path><path id="Rectangle 1116" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3.15486 33c-0.06521 -1.7683 -0.11516 -3.7648 -0.13924 -6" strokeWidth="3"></path><path id="Rectangle 1117" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M9.00013 44.519c-0.25814 -0.0193 -0.50578 -0.0387 -0.74303 -0.058 -2.5553 -0.2076 -4.5106 -2.1629 -4.71821 -4.7182 -0.01927 -0.2372 -0.03862 -0.4847 -0.05793 -0.7428" strokeWidth="3"></path><path id="Rectangle 1118" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M20.9994 44.9842c-2.2352 -0.0241 -4.2316 -0.074 -5.9999 -0.1392" strokeWidth="3"></path><path id="Rectangle 1119" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M33 44.845c-1.7683 0.0652 -3.7648 0.1151 -6 0.1392" strokeWidth="3"></path><path id="Rectangle 1120" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M44.5188 39c-0.0194 0.2581 -0.0387 0.5056 -0.058 0.7428 -0.2076 2.5553 -2.1629 4.5106 -4.7182 4.7182 -0.2371 0.0193 -0.4846 0.0386 -0.7426 0.0579" strokeWidth="3"></path><path id="Rectangle 1121" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M44.984 27c-0.0241 2.2352 -0.0741 4.2317 -0.1393 6" strokeWidth="3"></path><path id="Rectangle 1122" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M44.8447 15c0.0652 1.7683 0.1152 3.7648 0.1393 6" strokeWidth="3"></path><path id="Rectangle 1123" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M38.9995 3.48096c0.2581 0.01931 0.5058 0.03867 0.743 0.05794 2.5553 0.20762 4.5106 2.16291 4.7183 4.71821 0.0192 0.2372 0.0386 0.48478 0.0579 0.74285" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Generate a QR Code</h3>
                  <p className="text-black">Customize your QR code to match your brand and make sharing effortless.</p>
                </div>
              </div>
              <div className="col">
                <div className="singleHowitWorks">
                  <p className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Content-Statistic--Streamline-Plump" height="48" width="48"><desc>Content Statistic Streamline Icon: https://streamlinehq.com</desc><g id="content-statistic--product-data-analysis-analytics-graph-line-business-board-chart"><path id="Rectangle 1097" fill="#8fbffa" d="M39.743 44.461c2.555 -0.208 4.51 -2.163 4.718 -4.718C44.723 36.515 45 31.364 45 24c0 -7.364 -0.277 -12.515 -0.539 -15.743 -0.208 -2.555 -2.163 -4.51 -4.718 -4.718C36.515 3.277 31.364 3 24 3c-7.364 0 -12.515 0.277 -15.743 0.539 -2.555 0.208 -4.51 2.163 -4.718 4.718C3.277 11.485 3 16.636 3 24c0 7.364 0.277 12.515 0.539 15.743 0.208 2.555 2.163 4.51 4.718 4.718C11.485 44.723 16.636 45 24 45c7.364 0 12.515 -0.277 15.743 -0.539Z" strokeWidth="3"></path><path id="Vector 79 (Stroke)" fill="#ffffff" fillRule="evenodd" d="M31.659 34.651a3.718 3.718 0 0 1 -4.973 0.525 180.782 180.782 0 0 1 -4.941 -3.73 0.98 0.98 0 0 0 -1.402 0.184c-1.126 1.552 -2.378 3.507 -3.384 5.137 -1.174 1.9 -3.487 2.876 -5.345 1.636a12.006 12.006 0 0 1 -1.323 -1.021c-1.577 -1.395 -1.414 -3.735 -0.047 -5.335 2.15 -2.517 4.727 -5.362 7.225 -7.79 1.458 -1.417 3.752 -1.366 5.274 -0.017 1.521 1.348 3.428 2.987 4.957 4.138a0.952 0.952 0 0 0 1.274 -0.116c1.721 -1.853 4.116 -4.704 5.619 -6.52 0.916 -1.108 2.286 -1.858 3.51 -1.104 0.29 0.18 0.571 0.387 0.824 0.61 0.947 0.838 0.778 2.193 0.143 3.286 -1.212 2.087 -3.635 5.874 -7.411 10.117Z" clipRule="evenodd" strokeWidth="3"></path><path id="Rectangle 1096" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M39.743 44.461c2.555 -0.208 4.51 -2.163 4.718 -4.718C44.723 36.515 45 31.364 45 24c0 -7.364 -0.277 -12.515 -0.539 -15.743 -0.208 -2.555 -2.163 -4.51 -4.718 -4.718C36.515 3.277 31.364 3 24 3c-7.364 0 -12.515 0.277 -15.743 0.539 -2.555 0.208 -4.51 2.163 -4.718 4.718C3.277 11.485 3 16.636 3 24c0 7.364 0.277 12.515 0.539 15.743 0.208 2.555 2.163 4.51 4.718 4.718C11.485 44.723 16.636 45 24 45c7.364 0 12.515 -0.277 15.743 -0.539Z" strokeWidth="3"></path><path id="Vector 79 (Stroke)_2" fillRule="evenodd" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M31.66 34.652a3.718 3.718 0 0 1 -4.974 0.524 180.782 180.782 0 0 1 -4.94 -3.73 0.98 0.98 0 0 0 -1.402 0.184c-1.127 1.552 -2.378 3.507 -3.385 5.137 -1.173 1.9 -3.487 2.876 -5.344 1.636a11.934 11.934 0 0 1 -1.324 -1.021c-1.576 -1.395 -1.414 -3.735 -0.046 -5.335 2.15 -2.517 4.727 -5.362 7.224 -7.79 1.459 -1.417 3.752 -1.366 5.274 -0.017 1.522 1.348 3.428 2.987 4.958 4.138a0.952 0.952 0 0 0 1.274 -0.116c1.72 -1.853 4.115 -4.704 5.618 -6.52 0.917 -1.107 2.286 -1.858 3.51 -1.104 0.29 0.18 0.572 0.387 0.824 0.61 0.947 0.838 0.778 2.193 0.143 3.286 -1.212 2.087 -3.635 5.874 -7.41 10.118Z" clipRule="evenodd" strokeWidth="3"></path><path id="Vector 1016" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M11 11h10" strokeWidth="3"></path><path id="Vector 1017" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M11 17h6" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Track & Analyze</h3>
                  <p className="text-black">Use our intuitive dashboard to track clicks, scans, and engagement in real-time</p>
                </div>
              </div>
              <div className="col">
                <div className="singleHowitWorks">
                  <p className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Shield-1--Streamline-Plump" height="48" width="48"><desc>Shield 1 Streamline Icon: https://streamlinehq.com</desc><g id="shield-1--shield-protection-security-defend-crime-war-cover"><path id="Rectangle 115" fill="#8fbffa" d="M3.687 7.802c0.2 -1.73 1.25 -3.158 2.95 -3.534C9.289 3.681 14.43 3 24 3s14.71 0.681 17.363 1.268c1.7 0.376 2.75 1.804 2.95 3.534 0.304 2.616 0.687 6.924 0.687 11.998 0 9.48 -5.003 18.35 -13.432 22.688C28.752 43.938 26.004 45 24 45c-2.004 0 -4.752 -1.063 -7.568 -2.512C8.003 38.15 3 29.28 3 19.8c0 -5.074 0.383 -9.382 0.687 -11.998Z" strokeWidth="3"></path><path id="Rectangle 114" fill="#ffffff" d="M11.34 13.887c0.162 -1.626 1.147 -2.953 2.755 -3.243C15.905 10.317 18.961 10 24 10s8.094 0.317 9.905 0.644c1.608 0.29 2.593 1.617 2.754 3.243A71.13 71.13 0 0 1 37 20.8c0 5.314 -2.58 10.21 -6.902 13.302C27.894 35.678 25.576 37 24 37c-1.576 0 -3.894 -1.322 -6.098 -2.898C13.58 31.01 11 26.114 11 20.8c0 -2.788 0.173 -5.216 0.34 -6.913Z" strokeWidth="3"></path><path id="Rectangle 112" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3.687 7.802c0.2 -1.73 1.25 -3.158 2.95 -3.534C9.289 3.681 14.43 3 24 3s14.71 0.681 17.363 1.268c1.7 0.376 2.75 1.804 2.95 3.534 0.304 2.616 0.687 6.924 0.687 11.998v0c0 9.48 -5.003 18.35 -13.432 22.688C28.752 43.938 26.004 45 24 45c-2.004 0 -4.752 -1.063 -7.568 -2.512C8.003 38.15 3 29.28 3 19.8v0c0 -5.074 0.383 -9.382 0.687 -11.998Z" strokeWidth="3"></path><path id="Rectangle 113" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M11.34 13.887c0.162 -1.626 1.147 -2.953 2.755 -3.243C15.905 10.317 18.961 10 24 10s8.094 0.317 9.905 0.644c1.608 0.29 2.593 1.617 2.754 3.243A71.13 71.13 0 0 1 37 20.8v0c0 5.314 -2.58 10.21 -6.902 13.302C27.894 35.678 25.576 37 24 37c-1.576 0 -3.894 -1.322 -6.098 -2.898C13.58 31.01 11 26.114 11 20.8v0c0 -2.788 0.173 -5.216 0.34 -6.913Z" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Share Confidently</h3>
                  <p className="text-black">Trust that your links and QR codes are protected from scams and malicious activity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sixHome" className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9 text-center">
                <small className="text-black">Great Connections Start with a click OR SCAN</small>
                <h2 className="text-center mb-3 text-black">The Connections Platform</h2>
                <p className="text-black">Transform the way you manage links and QR codes with OPN.MY. Whether it’s tracking marketing campaigns, sharing on social media, or streamlining your digital presence, we’ve got you covered.</p>
                <div className="d-flex gap-3 justify-content-center mb-5">
                  <Link href="/login" className="btn btn-primary">Start now for Free</Link>
                  <Link href="/pricing" className="btn btn-primary">Explore Premium Plans</Link>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="startedToday">
                  <figure>
                    <img src="/link-page.png" alt="" width="100%" />
                  </figure>
                  <div className="startedTodayContent px-4">
                    <div className="d-flex gap-3 flex-auto justify-content-center">
                      <h4 className="w-75 text-black">URL Shortener</h4>
                      <span className="startedTodayIcon w-25 text-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Down-Arrow--Streamline-Guidance-Free" height="24" width="24">
                          <path stroke="#000000" d="M5 16c0.742 0 1.85 0.733 2.78 1.475 1.2 0.954 2.247 2.094 3.046 3.401C11.425 21.856 12 23.044 12 24m0 0c0 -0.956 0.575 -2.145 1.174 -3.124 0.8 -1.307 1.847 -2.447 3.045 -3.401C17.15 16.733 18.26 16 19 16m-7 8 0 -24" strokeWidth="1"></path>
                        </svg>
                      </span>
                    </div>
                    <p className="cardDescription text-black">A comprehensive solution to help make every point of connection between your content and your audience more powerful.</p>
                    <div className="startedTodayContentMore">
                      <h5 className="text-black">Popular URL Shortening Features</h5>
                      <ul className="text-black">
                        <li>URL shortening at scale</li>
                        <li>Custom links with your brand</li>
                        <li>URL redirects</li>
                        <li>Advanced analytics & tracking</li>
                      </ul>
                      <p className="mb-0"><Link href="" className="btn btn-primary w-100">Get started for free</Link></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="startedToday">
                  <figure>
                    <img src="/qr-code-page.png" alt="" width="100%" />
                  </figure>
                  <div className="startedTodayContent px-4">
                    <div className="d-flex gap-3 flex-auto justify-content-center">
                      <h4 className="w-75 text-black">Qr Codes</h4>
                      <span className="startedTodayIcon w-25 text-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Down-Arrow--Streamline-Guidance-Free" height="24" width="24">
                          <path stroke="#000000" d="M5 16c0.742 0 1.85 0.733 2.78 1.475 1.2 0.954 2.247 2.094 3.046 3.401C11.425 21.856 12 23.044 12 24m0 0c0 -0.956 0.575 -2.145 1.174 -3.124 0.8 -1.307 1.847 -2.447 3.045 -3.401C17.15 16.733 18.26 16 19 16m-7 8 0 -24" strokeWidth="1"></path>
                        </svg>
                      </span>
                    </div>
                    <p className="cardDescription text-black">QR Code solutions for every customer, business and brand experience.</p>
                    <div className="startedTodayContentMore">
                      <h5 className="text-black">Popular QR Code Features</h5>
                      <ul className="text-black">
                        <li>Fully customizable QR Codes</li>
                        <li>Dynamic QR Codes</li>
                        <li>QR Code types & destination options</li>
                        <li>Advanced analytics & tracking</li>
                      </ul>
                      <p className="mb-0 text-black"><Link href="" className="btn btn-primary w-100">Get started for free</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="thirdHome" className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <h2 className="text-center mb-5 mt-3 text-black">Why Choose OPN.MY?</h2>
              </div>
              <div className="col-4">
                <div className="singleFeatureHome text-center">
                  <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Flash-1--Streamline-Plump" height="48" width="48"><desc>Flash 1 Streamline Icon: https://streamlinehq.com</desc><g id="flash-1--flash-power-connect-charge-electricity-lightning"><path id="Union" fill="#8fbffa" d="M34.336 6.681c0.314 -1.727 -0.92 -3.34 -2.673 -3.441 -3.633 -0.21 -9.808 -0.423 -15.875 0.02a3.775 3.775 0 0 0 -3.252 2.426c-3.058 8.035 -4.517 15.457 -5.137 19.385 -0.256 1.62 0.91 3.063 2.546 3.176 2.438 0.167 6.2 0.341 10.555 0.253 -0.452 3.222 -0.937 8.17 -1.42 13.617 -0.244 2.75 2.99 4.266 4.874 2.248 7.44 -7.973 14.274 -16.854 18.03 -21.926 1.367 -1.848 0.171 -4.359 -2.127 -4.419A179.18 179.18 0 0 0 32 18c0.867 -3.477 1.635 -7.463 2.336 -11.319Z" strokeWidth="3"></path><path id="Union_2" stroke="#2859c5" strokeLinejoin="round" d="M34.336 6.681c0.314 -1.727 -0.92 -3.34 -2.673 -3.441 -3.633 -0.21 -9.808 -0.423 -15.875 0.02a3.775 3.775 0 0 0 -3.252 2.426c-3.058 8.035 -4.517 15.457 -5.137 19.385 -0.256 1.62 0.91 3.063 2.546 3.176 2.438 0.167 6.2 0.341 10.555 0.253 -0.452 3.222 -0.937 8.17 -1.42 13.617 -0.244 2.75 2.99 4.266 4.874 2.248 7.44 -7.973 14.274 -16.854 18.03 -21.926 1.367 -1.848 0.171 -4.359 -2.127 -4.419A179.18 179.18 0 0 0 32 18c0.867 -3.477 1.635 -7.463 2.336 -11.319Z" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Effortless</h3>
                  <p className="text-black">OPN.MY makes shortening links quick and simple—just enter your long URL, and instantly get a shortened link.</p>
                </div>
              </div>
              <div className="col-4">
                <div className="singleFeatureHome text-center">
                  <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Link-Chain--Streamline-Plump" height="48" width="48"><desc>Link Chain Streamline Icon: https://streamlinehq.com</desc><g id="link-chain--create-hyperlink-link-make-unlink-connection-chain"><path id="Union" fill="#8fbffa" d="M40.399 7.648c-6.167 -6.166 -16.164 -6.166 -22.33 0l-2.382 2.382a4 4 0 0 0 0 5.657l1.786 1.786a4 4 0 0 0 5.657 0l2.382 -2.381a5.263 5.263 0 0 1 7.443 7.443l-2.382 2.382a4 4 0 0 0 0 5.657l1.787 1.786a4 4 0 0 0 5.657 0l2.382 -2.382c6.166 -6.166 6.166 -16.164 0 -22.33Z" strokeWidth="3"></path><path id="Union_2" fill="#8fbffa" d="M7.647 40.398c-6.166 -6.166 -6.166 -16.164 0 -22.33l2.382 -2.382a4 4 0 0 1 5.657 0l1.786 1.787a4 4 0 0 1 0 5.657l-2.382 2.382a5.263 5.263 0 0 0 7.444 7.443l2.382 -2.382a4 4 0 0 1 5.657 0l1.786 1.786a4 4 0 0 1 0 5.657l-2.382 2.382c-6.166 6.166 -16.164 6.166 -22.33 0Z" strokeWidth="3"></path><path id="Rectangle 1673" fill="#ffffff" d="M15.09 32.954a5.263 5.263 0 0 1 0 -7.443l10.422 -10.42a5.263 5.263 0 0 1 7.443 7.443l-10.42 10.42a5.263 5.263 0 0 1 -7.444 0Z" strokeWidth="3"></path><path id="Rectangle 1672" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M15.091 32.954a5.263 5.263 0 0 1 0 -7.443l10.42 -10.42a5.263 5.263 0 0 1 7.444 7.443l-10.42 10.42a5.263 5.263 0 0 1 -7.444 0Z" strokeWidth="3"></path><path id="Union_3" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M7.647 40.398c-6.166 -6.166 -6.166 -16.164 0 -22.33l2.382 -2.382a4 4 0 0 1 5.657 0l1.786 1.787a4 4 0 0 1 0 5.657l-2.382 2.382a5.263 5.263 0 0 0 7.444 7.443l2.382 -2.382a4 4 0 0 1 5.657 0l1.786 1.786a4 4 0 0 1 0 5.657l-2.382 2.382c-6.166 6.166 -16.164 6.166 -22.33 0Z" strokeWidth="3"></path><path id="Union_4" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M40.399 7.648c-6.167 -6.166 -16.164 -6.166 -22.33 0l-2.382 2.382a4 4 0 0 0 0 5.657l1.786 1.786a4 4 0 0 0 5.657 0l2.382 -2.381a5.263 5.263 0 0 1 7.443 7.443l-2.382 2.382a4 4 0 0 0 0 5.657l1.787 1.786a4 4 0 0 0 5.657 0l2.382 -2.382c6.166 -6.166 6.166 -16.164 0 -22.33Z" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Shortened</h3>
                  <p className="text-black">No matter the length, OPN.MY can shorten any link with ease.</p>
                </div>
              </div>
              <div className="col-4">
                <div className="singleFeatureHome text-center">
                  <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Share-Lock--Streamline-Plump" height="48" width="48"><desc>Share Lock Streamline Icon: https://streamlinehq.com</desc><g id="share-lock--give-hand-lock-padlock-secure-security-transfer"><path id="Union" fill="#ffffff" d="M1.798 28.178S9 24.954 14 24.954c3.553 0 7.456 1.402 10.049 2.546 1.95 0.86 3.08 1.95 3.536 4.032 0.316 1.444 -0.721 3.851 -2.194 3.967l-1.132 0.09c3.397 0 12.357 -1.579 15.491 -2.15 0.736 -0.134 1.495 -0.232 2.198 0.022 0.892 0.32 2.096 1.101 2.69 2.994 0.488 1.555 -0.622 3.06 -2.146 3.635C38.06 41.761 28.876 45 24.259 45 12 45 1.798 41.495 1.798 41.495V28.179Z" strokeWidth="3"></path><path id="Rectangle 56" fill="#8fbffa" d="M28.064 14.23c0.092 -1.748 1.323 -2.958 3.069 -3.079C32.357 11.067 34.087 11 36.5 11c2.553 0 4.332 0.075 5.553 0.166 1.597 0.12 2.743 1.203 2.855 2.8 0.054 0.77 0.092 1.762 0.092 3.034a43.67 43.67 0 0 1 -0.092 3.033c-0.112 1.598 -1.258 2.681 -2.855 2.8 -1.22 0.092 -3 0.167 -5.553 0.167s-4.332 -0.075 -5.553 -0.166c-1.597 -0.12 -2.743 -1.203 -2.855 -2.8A43.571 43.571 0 0 1 28 17c0 -1.132 0.026 -2.042 0.064 -2.77Z" strokeWidth="3"></path><path id="Union_2" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3 27.564S9 25 14 25c3.527 0 7.4 1.418 9.994 2.587 1.99 0.896 3.135 1.462 3.59 3.597 0.317 1.483 -0.748 3.955 -2.26 4.077l-1.065 0.086m0 0c-2.442 0 -6.222 -0.724 -6.222 -0.724m6.222 0.724c3.387 0 12.303 -1.609 15.463 -2.2 0.754 -0.14 1.535 -0.243 2.252 0.027 0.902 0.341 2.112 1.164 2.69 3.15 0.452 1.552 -0.633 3.045 -2.14 3.628C38.104 41.662 28.887 45 24.259 45 12 45 3 41.923 3 41.923" strokeWidth="3"></path><path id="Vector" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m41 11 -0.182 -3.88a4.323 4.323 0 0 0 -8.636 0L32 11m4.5 5v2m0 5c2.553 0 4.332 -0.075 5.553 -0.166 1.597 -0.12 2.743 -1.203 2.855 -2.8 0.054 -0.77 0.092 -1.762 0.092 -3.034a43.67 43.67 0 0 0 -0.092 -3.033c-0.112 -1.598 -1.258 -2.681 -2.855 -2.8 -1.22 -0.092 -3 -0.167 -5.553 -0.167 -2.413 0 -4.143 0.067 -5.367 0.151 -1.745 0.12 -2.977 1.33 -3.07 3.078A53.19 53.19 0 0 0 28 17c0 1.272 0.038 2.264 0.092 3.033 0.112 1.598 1.258 2.681 2.855 2.8 1.22 0.092 3 0.167 5.553 0.167Z" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Secure</h3>
                  <p className="text-black">Our service is not only fast but also secure, featuring HTTPS protocol and robust data encryption to protect your information.</p>
                </div>
              </div>
              <div className="col-4">
                <div className="singleFeatureHome text-center">
                  <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Graph-Bar-Increase--Streamline-Plump" height="48" width="48"><desc>Graph Bar Increase Streamline Icon: https://streamlinehq.com</desc><g id="graph-bar-increase--up-product-performance-increase-arrow-graph-business-chart"><path id="Vector" fill="#ffffff" d="M42.377 11.323c0.664 -3.235 0.657 -6.087 0.601 -7.43a0.9 0.9 0 0 0 -0.869 -0.87 31.651 31.651 0 0 0 -7.43 0.601c-0.753 0.154 -1.002 1.075 -0.46 1.618l6.54 6.54c0.544 0.543 1.464 0.293 1.618 -0.459Z" strokeWidth="3"></path><path id="Rectangle 59" fill="#8fbffa" d="M5.267 44.96c-1.128 -0.037 -1.992 -0.719 -2.106 -1.841C3.07 42.239 3 40.932 3 39s0.072 -3.24 0.16 -4.119c0.115 -1.122 0.979 -1.804 2.107 -1.842C5.934 33.017 6.827 33 8 33s2.066 0.017 2.733 0.04c1.128 0.037 1.992 0.719 2.106 1.841 0.09 0.88 0.161 2.187 0.161 4.119s-0.072 3.24 -0.16 4.119c-0.115 1.122 -0.979 1.804 -2.107 1.842 -0.668 0.022 -1.56 0.039 -2.733 0.039s-2.066 -0.017 -2.733 -0.04Z" strokeWidth="3"></path><path id="Rectangle 60" fill="#8fbffa" d="M37.557 44.934c-1.3 -0.08 -2.203 -1.018 -2.297 -2.317C35.132 40.856 35 37.667 35 32c0 -5.668 0.132 -8.856 0.26 -10.617 0.094 -1.299 0.997 -2.238 2.297 -2.317C38.187 19.027 38.99 19 40 19s1.813 0.027 2.443 0.066c1.3 0.08 2.203 1.018 2.297 2.317 0.128 1.761 0.26 4.95 0.26 10.617 0 5.668 -0.132 8.856 -0.26 10.617 -0.094 1.299 -0.997 2.238 -2.297 2.317 -0.63 0.039 -1.432 0.066 -2.443 0.066 -1.01 0 -1.813 -0.027 -2.443 -0.066Z" strokeWidth="3"></path><path id="Rectangle 61" fill="#8fbffa" d="M21.5 44.952c-1.264 -0.055 -2.187 -0.9 -2.293 -2.16C19.098 41.494 19 39.386 19 36c0 -3.386 0.098 -5.494 0.207 -6.792 0.106 -1.26 1.029 -2.105 2.292 -2.16A57.34 57.34 0 0 1 24 27c1.042 0 1.862 0.02 2.5 0.048 1.264 0.055 2.187 0.9 2.293 2.16 0.109 1.298 0.207 3.406 0.207 6.792 0 3.386 -0.098 5.494 -0.207 6.792 -0.106 1.26 -1.029 2.105 -2.292 2.16 -0.639 0.028 -1.459 0.048 -2.501 0.048a57.45 57.45 0 0 1 -2.5 -0.048Z" strokeWidth="3"></path><path id="Vector 79" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M5 26c5.86 -6.959 11.184 -10.966 13.613 -12.612 0.794 -0.539 1.841 -0.363 2.444 0.383a94.922 94.922 0 0 1 3.31 4.377c0.808 1.132 2.513 1.168 3.408 0.104C31.911 13.34 37.501 8.5 37.501 8.5" strokeWidth="3"></path><path id="Vector_2" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M42.376 11.323c0.664 -3.235 0.657 -6.087 0.601 -7.43a0.9 0.9 0 0 0 -0.869 -0.87 31.653 31.653 0 0 0 -7.43 0.601c-0.753 0.154 -1.002 1.075 -0.46 1.618l6.54 6.54c0.544 0.543 1.464 0.293 1.618 -0.459Z" strokeWidth="3"></path><path id="Rectangle 56" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M5.267 44.96c-1.128 -0.037 -1.992 -0.719 -2.106 -1.841C3.07 42.239 3 40.932 3 39s0.072 -3.24 0.16 -4.119c0.115 -1.122 0.979 -1.804 2.107 -1.842C5.934 33.017 6.827 33 8 33s2.066 0.017 2.733 0.04c1.128 0.037 1.992 0.719 2.106 1.841 0.09 0.88 0.161 2.187 0.161 4.119s-0.072 3.24 -0.16 4.119c-0.115 1.122 -0.979 1.804 -2.107 1.842 -0.668 0.022 -1.56 0.039 -2.733 0.039s-2.066 -0.017 -2.733 -0.04Z" strokeWidth="3"></path><path id="Rectangle 57" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M37.557 44.934c-1.3 -0.08 -2.203 -1.018 -2.297 -2.317C35.132 40.856 35 37.667 35 32c0 -5.668 0.132 -8.856 0.26 -10.617 0.094 -1.299 0.997 -2.238 2.297 -2.317C38.187 19.027 38.99 19 40 19s1.813 0.027 2.443 0.066c1.3 0.08 2.203 1.018 2.297 2.317 0.128 1.761 0.26 4.95 0.26 10.617 0 5.668 -0.132 8.856 -0.26 10.617 -0.094 1.299 -0.997 2.238 -2.297 2.317 -0.63 0.039 -1.432 0.066 -2.443 0.066 -1.01 0 -1.813 -0.027 -2.443 -0.066Z" strokeWidth="3"></path><path id="Rectangle 58" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M21.5 44.952c-1.264 -0.055 -2.187 -0.9 -2.293 -2.16C19.098 41.494 19 39.386 19 36c0 -3.386 0.098 -5.494 0.207 -6.792 0.106 -1.26 1.029 -2.105 2.292 -2.16A57.34 57.34 0 0 1 24 27c1.042 0 1.862 0.02 2.5 0.048 1.264 0.055 2.187 0.9 2.293 2.16 0.109 1.298 0.207 3.406 0.207 6.792 0 3.386 -0.098 5.494 -0.207 6.792 -0.106 1.26 -1.029 2.105 -2.292 2.16 -0.639 0.028 -1.459 0.048 -2.501 0.048a57.45 57.45 0 0 1 -2.5 -0.048Z" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Analytics</h3>
                  <p className="text-black">Track the number of clicks your shortened URL has received.</p>
                </div>
              </div>
              <div className="col-4">
                <div className="singleFeatureHome text-center">
                  <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Computer-Pc-Desktop--Streamline-Plump" height="48" width="48"><desc>Computer Pc Desktop Streamline Icon: https://streamlinehq.com</desc><g id="computer-pc-desktop--screen-desktop-monitor-device-electronics-display-pc-computer"><path id="Subtract" fill="#8fbffa" d="M21.318 8.059c0.116 -2.455 1.82 -4.457 4.264 -4.713C27.387 3.156 29.837 3 33 3c3.165 0 5.614 0.156 7.418 0.346 2.444 0.256 4.149 2.258 4.265 4.713C44.836 11.273 45 16.483 45 24c0 7.517 -0.164 12.727 -0.317 15.941 -0.116 2.455 -1.82 4.457 -4.265 4.713 -1.804 0.19 -4.253 0.346 -7.418 0.346 -1.213 0 -2.32 -0.023 -3.327 -0.062a2.917 2.917 0 0 0 -0.01 -0.196c-0.055 -0.625 0.23 -1.74 2.118 -2.761 1.035 -0.56 2.383 -1.292 3.438 -2.36 1.201 -1.218 1.945 -2.767 2.063 -4.741 0.115 -1.914 0.218 -4.774 0.218 -8.88 0 -4.106 -0.103 -6.966 -0.218 -8.88 -0.241 -4.025 -3.393 -7.123 -7.379 -7.353 -1.854 -0.108 -4.63 -0.214 -8.65 -0.252 0.022 -0.525 0.044 -1.01 0.065 -1.456Z" strokeWidth="3"></path><path id="Subtract_2" fill="#ffffff" d="M37.33 18h7.634a291.97 291.97 0 0 0 -0.28 -9.941c-0.116 -2.455 -1.82 -4.457 -4.265 -4.713C38.615 3.156 36.166 3 33.001 3c-3.164 0 -5.613 0.156 -7.417 0.346 -2.444 0.256 -4.149 2.258 -4.265 4.713 -0.021 0.446 -0.043 0.931 -0.064 1.456 4.018 0.038 6.794 0.144 8.648 0.252 3.986 0.23 7.138 3.329 7.379 7.353 0.016 0.274 0.033 0.567 0.048 0.88Z" strokeWidth="3"></path><path id="Rectangle 1096" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m21.273 9 0.043 -0.941c0.116 -2.455 1.82 -4.457 4.265 -4.713C27.385 3.156 29.834 3 32.999 3c3.164 0 5.613 0.156 7.417 0.346 2.444 0.256 4.149 2.258 4.265 4.713C44.834 11.273 45 16.483 45 24c0 7.517 -0.165 12.727 -0.318 15.941 -0.116 2.455 -1.82 4.457 -4.264 4.713 -1.805 0.19 -4.254 0.346 -7.418 0.346 -0.702 0 -1.367 -0.008 -1.999 -0.022" strokeWidth="3"></path><path id="Subtract_3" fill="#8fbffa" d="M14.78 37.985a340.324 340.324 0 0 0 6.44 0l0.385 3.457A4 4 0 0 0 25.58 45H10.42a4 4 0 0 0 3.975 -3.558l0.384 -3.457Z" strokeWidth="3"></path><path id="Rectangle 1097" fill="#ffffff" d="M32.79 17.39c-0.104 -1.729 -1.419 -3.031 -3.147 -3.131C27.43 14.131 23.76 14 18 14c-5.76 0 -9.431 0.131 -11.643 0.259 -1.728 0.1 -3.043 1.402 -3.147 3.13C3.101 19.2 3 21.969 3 26c0 4.032 0.101 6.802 0.21 8.61 0.104 1.729 1.419 3.031 3.147 3.131C8.57 37.869 12.24 38 18 38c5.76 0 9.431 -0.131 11.643 -0.259 1.728 -0.1 3.043 -1.402 3.147 -3.13 0.108 -1.81 0.21 -4.579 0.21 -8.611 0 -4.032 -0.102 -6.802 -0.21 -8.61Z" strokeWidth="3"></path><path id="Intersect" fill="#8fbffa" d="M3.087 32c0.035 1.032 0.076 1.896 0.12 2.61 0.103 1.729 1.418 3.031 3.147 3.131 2.21 0.128 5.882 0.259 11.642 0.259s9.432 -0.131 11.643 -0.259c1.729 -0.1 3.044 -1.402 3.147 -3.13 0.043 -0.715 0.085 -1.579 0.12 -2.611H3.086Z" strokeWidth="3"></path><path id="Vector 2538" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M44.5 18H38" strokeWidth="3"></path><path id="Vector 2539" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M38 9h-1" strokeWidth="3"></path><path id="Vector 2540" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M28 9h1" strokeWidth="3"></path><path id="Subtract_4" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m14.78 37.985 -0.385 3.457A4 4 0 0 1 10.42 45m10.8 -7.015 0.385 3.457A4 4 0 0 0 25.58 45m0 0H10.42m15.16 0H26m-15.58 0H10" strokeWidth="3"></path><path id="Rectangle 1098" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M32.79 17.39c-0.104 -1.729 -1.419 -3.031 -3.147 -3.131C27.43 14.131 23.76 14 18 14c-5.76 0 -9.431 0.131 -11.643 0.259 -1.728 0.1 -3.043 1.402 -3.147 3.13C3.101 19.2 3 21.969 3 26c0 4.032 0.101 6.802 0.21 8.61 0.104 1.729 1.419 3.031 3.147 3.131C8.57 37.869 12.24 38 18 38c5.76 0 9.431 -0.131 11.643 -0.259 1.728 -0.1 3.043 -1.402 3.147 -3.13 0.108 -1.81 0.21 -4.579 0.21 -8.611 0 -4.032 -0.102 -6.802 -0.21 -8.61Z" strokeWidth="3"></path><path id="Intersect_2" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3.087 32h29.819" strokeWidth="3"></path></g></svg></p>
                  <h3 className="text-black">Cross-Platform</h3>
                  <p className="text-black">Works seamlessly on smartphones, tablets, and desktops.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section id="fourHome" className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center mb-5">Clients</h2>
              </div>
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
        </section> */}
        
        
        <section id="sevenHome" className="py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h2 className="text-center mb-4 text-black">Why Security Matters to Us</h2>
                <p className="text-black">At OPN.MY, we believe trust is everything. That’s why we integrate <strong>Google Safe Browsing API</strong>, providing an additional layer of protection against scams, phishing, and malware. Share your links with confidence, knowing they’re secure for your audience.</p>
              </div>
              <div className="col-lg-8">
                <h3 className="text-black">What is Safe Browsing?</h3>
                <p className="text-black">Safe Browsing is a Google service that lets client applications check URLs against Google's constantly updated lists of unsafe web resources. Examples of unsafe web resources are social engineering sites (phishing and deceptive sites) and sites that host malware or unwanted software. Come see what's possible.</p>
                <p className="text-black">With Safe Browsing you can:</p>
                <ul className="text-black">
                  <li>Check pages against our Safe Browsing lists based on platform and threat types.</li>
                  <li>Warn users before they click links in your site that may lead to infected pages.</li>
                  <li>Prevent users from posting links to known infected pages from your site.</li>
                </ul>
              </div>
              <div className="col-lg-4">
                <figure>
                  <img src="/SafeBrowsing.png" width="100%" alt="Protected by Google Safe Browsing API" />
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section id="eightHome">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center mb-5 text-black">Adopted and loved <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="User-Feedback-Heart--Streamline-Plump" height="48" width="48"><desc>User Feedback Heart Streamline Icon: https://streamlinehq.com</desc><g id="user-feedback-heart"><path id="Vector" fill="#ffffff" d="M13.42 34.984a0.895 0.895 0 0 0 -0.503 -1.346c-2.95 -0.886 -6.85 -1.35 -8.761 -1.536a0.953 0.953 0 0 0 -1.048 1.05c0.193 1.843 0.66 5.564 1.545 8.714a0.907 0.907 0 0 0 1.368 0.531c2.715 -1.743 5.667 -4.7 7.4 -7.413Z" strokeWidth="3"></path><path id="Vector 9" fill="#8fbffa" d="M32.942 25.822a7.203 7.203 0 0 0 0.873 -5.38c-0.911 -4.163 -5.957 -5.864 -9.1 -3.074 -0.249 0.22 -0.47 0.473 -0.715 0.725 -0.245 -0.253 -0.466 -0.506 -0.715 -0.725 -3.143 -2.79 -8.189 -1.089 -9.1 3.074a7.203 7.203 0 0 0 0.873 5.38c1.592 2.58 4.09 4.63 6.597 6.48a3.959 3.959 0 0 0 4.69 0c2.508 -1.85 5.005 -3.9 6.597 -6.48Z" strokeWidth="3"></path><path id="Vector 10" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M32.942 25.822a7.203 7.203 0 0 0 0.873 -5.38c-0.911 -4.163 -5.957 -5.864 -9.1 -3.074 -0.249 0.22 -0.47 0.473 -0.715 0.725 -0.245 -0.253 -0.466 -0.506 -0.715 -0.725 -3.143 -2.79 -8.189 -1.089 -9.1 3.074a7.203 7.203 0 0 0 0.873 5.38c1.592 2.58 4.09 4.63 6.597 6.48a3.959 3.959 0 0 0 4.69 0c2.508 -1.85 5.005 -3.9 6.597 -6.48Z" strokeWidth="3"></path><path id="Vector_2" fill="#ffffff" d="M34.58 13.015a0.895 0.895 0 0 0 0.503 1.347c2.95 0.886 6.85 1.35 8.761 1.536a0.953 0.953 0 0 0 1.047 -1.05c-0.192 -1.843 -0.659 -5.564 -1.544 -8.714a0.907 0.907 0 0 0 -1.368 -0.531c-2.715 1.743 -5.667 4.7 -7.4 7.412Z" strokeWidth="3"></path><path id="Vector_3" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M13.42 34.984a0.895 0.895 0 0 0 -0.503 -1.346c-2.95 -0.886 -6.85 -1.35 -8.761 -1.536a0.953 0.953 0 0 0 -1.048 1.05c0.193 1.843 0.66 5.564 1.545 8.714a0.907 0.907 0 0 0 1.368 0.531c2.715 -1.743 5.667 -4.7 7.4 -7.413Z" strokeWidth="3"></path><path id="Vector_4" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M34.58 13.015a0.895 0.895 0 0 0 0.503 1.347c2.95 0.886 6.85 1.35 8.761 1.536a0.953 0.953 0 0 0 1.047 -1.05c-0.192 -1.843 -0.659 -5.564 -1.544 -8.714a0.907 0.907 0 0 0 -1.368 -0.531c-2.715 1.743 -5.667 4.7 -7.4 7.412Z" strokeWidth="3"></path><path id="Subtract" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M9.905 39.237C13.632 42.809 18.668 45 24.211 45c5.74 0 10.938 -2.35 14.7 -6.15A21.041 21.041 0 0 0 45 24" strokeWidth="3"></path><path id="Subtract_2" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M38.094 8.763C34.368 5.191 29.331 3 23.79 3c-5.741 0 -10.938 2.35 -14.7 6.15A21.042 21.042 0 0 0 3 24" strokeWidth="3"></path></g></svg> by users</h2>
              </div>
              <div className="col-lg-3">
                <div className="homeStat">
                  <p className="homeStatIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Stock--Streamline-Plump" height="48" width="48">
                      <g id="stock--price-stock-wallstreet-dollar-money-currency-fluctuate-candlestick-business">
                        <path id="Rectangle 1098" fill="#8fbffa" d="M3.07748 15.3801c0.06158 -2.3511 1.62631 -4.2902 3.97704 -4.3654C7.35086 11.0053 7.66586 11 8 11s0.64913 0.0053 0.94547 0.0147c2.35073 0.0752 3.91543 2.0143 3.97703 4.3654C12.9654 17.016 13 19.2032 13 22s-0.0346 4.984 -0.0775 6.6199c-0.0616 2.3512 -1.6263 4.2902 -3.97702 4.3654C8.64914 32.9947 8.33414 33 8 33s-0.64914 -0.0053 -0.94548 -0.0147c-2.35072 -0.0752 -3.91546 -2.0142 -3.97704 -4.3654C3.03463 26.984 3 24.7968 3 22s0.03463 -4.984 0.07748 -6.6199Z" strokeWidth="3"></path>
                        <path id="Rectangle 1099" fill="#8fbffa" d="M20.0384 27.5075c0.0587 -2.4881 1.8199 -4.4634 4.3083 -4.5025 0.2091 -0.0032 0.4268 -0.005 0.6533 -0.005 0.2265 0 0.4442 0.0018 0.6533 0.005 2.4884 0.0391 4.2496 2.0144 4.3083 4.5025 0.023 0.9751 0.0384 2.1351 0.0384 3.4925 0 1.3574 -0.0154 2.5174 -0.0384 3.4925 -0.0587 2.4881 -1.8199 4.4634 -4.3083 4.5025 -0.2091 0.0032 -0.4268 0.005 -0.6533 0.005 -0.2265 0 -0.4442 -0.0018 -0.6533 -0.005 -2.4884 -0.0391 -4.2496 -2.0144 -4.3083 -4.5025C20.0154 33.5174 20 32.3574 20 31c0 -1.3574 0.0154 -2.5174 0.0384 -3.4925Z" strokeWidth="3"></path>
                        <path id="Vector 1639" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M8 3.04297 8 11" strokeWidth="3"></path>
                        <path id="Vector 1641" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M8 33v6" strokeWidth="3"></path>
                        <path id="Vector 1640" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m25 39.043 0 6" strokeWidth="3"></path>
                        <path id="Vector 1642" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M25 15.043 25 23" strokeWidth="3"></path>
                        <path id="Rectangle 1096" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3.07748 15.3801c0.06158 -2.3511 1.62631 -4.2902 3.97704 -4.3654C7.35086 11.0053 7.66586 11 8 11s0.64913 0.0053 0.94547 0.0147c2.35073 0.0752 3.91543 2.0143 3.97703 4.3654C12.9654 17.016 13 19.2032 13 22s-0.0346 4.984 -0.0775 6.6199c-0.0616 2.3512 -1.6263 4.2902 -3.97702 4.3654C8.64914 32.9947 8.33414 33 8 33s-0.64914 -0.0053 -0.94548 -0.0147c-2.35072 -0.0752 -3.91546 -2.0142 -3.97704 -4.3654C3.03463 26.984 3 24.7968 3 22s0.03463 -4.984 0.07748 -6.6199Z" strokeWidth="3"></path>
                        <path id="Rectangle 1097" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M20.0384 27.5075c0.0587 -2.4881 1.8199 -4.4634 4.3083 -4.5025 0.2091 -0.0032 0.4268 -0.005 0.6533 -0.005 0.2265 0 0.4442 0.0018 0.6533 0.005 2.4884 0.0391 4.2496 2.0144 4.3083 4.5025 0.023 0.9751 0.0384 2.1351 0.0384 3.4925 0 1.3574 -0.0154 2.5174 -0.0384 3.4925 -0.0587 2.4881 -1.8199 4.4634 -4.3083 4.5025 -0.2091 0.0032 -0.4268 0.005 -0.6533 0.005 -0.2265 0 -0.4442 -0.0018 -0.6533 -0.005 -2.4884 -0.0391 -4.2496 -2.0144 -4.3083 -4.5025C20.0154 33.5174 20 32.3574 20 31c0 -1.3574 0.0154 -2.5174 0.0384 -3.4925Z" strokeWidth="3"></path>
                        <path id="Vector" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M45 7.60714S43 6 40 6c-2.4999 0 -5 1.60714 -5 3.75 0 5.3571 10 2.1429 10 7.5 0 2.1429 -2.5 3.75 -5 3.75 -3 0 -5 -1.6071 -5 -1.6071" strokeWidth="3"></path>
                        <path id="Vector 837" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m40 6 0 -3" strokeWidth="3"></path>
                        <path id="Vector 838" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m40 24 0 -3" strokeWidth="3"></path>
                      </g>
                    </svg>
                  </p>
                  <h4 className="text-black">150+</h4>
                  <h5 className="text-black">Global paying customers</h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="homeStat">
                  <p className="homeStatIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="3d-Coordinate-Axis--Streamline-Plump" height="48" width="48">
                      <g id="3d-coordinate-axis">
                        <path id="Subtract" fill="#ffffff" d="M28.4308 16.8614c-0.2907 3.1638 -0.6661 6.9486 -1.0614 10.1403 2.3558 1.0249 4.8735 2.165 7.0871 3.1835l-4.159 7.7754c-2.0972 -1.4829 -4.5065 -3.2086 -6.6975 -4.832 -1.9814 1.4682 -4.1413 3.02 -6.0875 4.4002l-4.1521 -7.6269c2.3028 -1.056 4.8757 -2.2152 7.2293 -3.2289 -0.3806 -3.1206 -0.7404 -6.7558 -1.0212 -9.8117l8.8623 0.0001Z" strokeWidth="3"></path>
                        <path id="Vector" fill="#8fbffa" d="M15.3186 16.3178c-1.3974 -0.2949 -1.905 -1.712 -1.2201 -2.9652 2.923 -5.34823 6.4242 -8.199 8.3823 -9.48324 0.9356 -0.61358 2.1019 -0.61357 3.0375 0 1.9582 1.28424 5.4593 4.13502 8.3823 9.48324 0.6849 1.2532 0.1773 2.6703 -1.2201 2.9652 -1.6467 0.3475 -4.3554 0.6821 -8.6809 0.6821 -4.3256 0 -7.0342 -0.3346 -8.681 -0.6821Z" strokeWidth="3"></path>
                        <path id="Vector_2" fill="#8fbffa" d="M37.1033 26.6179c0.91 -1.0031 2.2658 -0.7276 3.0168 0.4133 3.4525 5.2455 4.5251 9.6763 4.8521 12.1512 0.1755 1.3281 -0.4923 2.5513 -1.6675 3.0546 -2.19 0.9379 -6.3544 2.1709 -12.3758 1.6314 -1.3097 -0.1174 -2.2132 -1.2215 -1.8468 -2.5565 0.4306 -1.569 1.3663 -4.0458 3.379 -7.7327 2.0126 -3.687 3.5728 -5.7824 4.6422 -6.9613Z" strokeWidth="3"></path>
                        <path id="Vector_3" fill="#8fbffa" d="M10.8967 26.6179c-0.91 -1.0031 -2.26585 -0.7276 -3.01678 0.4133 -3.45248 5.2455 -4.5251 9.6763 -4.85214 12.1512 -0.17549 1.3281 0.49228 2.5513 1.66751 3.0546 2.19003 0.9379 6.35441 2.1709 12.37581 1.6314 1.3097 -0.1174 2.2132 -1.2215 1.8468 -2.5565 -0.4306 -1.569 -1.3663 -4.0458 -3.379 -7.7327 -2.0126 -3.687 -3.5728 -5.7824 -4.6422 -6.9613Z" strokeWidth="3"></path>
                        <path id="Vector_4" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M10.8967 26.6179c-0.91 -1.0031 -2.26585 -0.7276 -3.01678 0.4133 -3.45248 5.2455 -4.5251 9.6763 -4.85214 12.1512 -0.17549 1.3281 0.49228 2.5513 1.66751 3.0546 2.19003 0.9379 6.35441 2.1709 12.37581 1.6314 1.3097 -0.1174 2.2132 -1.2215 1.8468 -2.5565 -0.4306 -1.569 -1.3663 -4.0458 -3.379 -7.7327 -2.0126 -3.687 -3.5728 -5.7824 -4.6422 -6.9613Z" strokeWidth="3"></path>
                        <path id="Vector_5" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M37.1033 26.6179c0.91 -1.0031 2.2658 -0.7276 3.0168 0.4133 3.4525 5.2455 4.5251 9.6763 4.8521 12.1512 0.1755 1.3281 -0.4923 2.5513 -1.6675 3.0546 -2.19 0.9379 -6.3544 2.1709 -12.3758 1.6314 -1.3097 -0.1174 -2.2132 -1.2215 -1.8468 -2.5565 0.4306 -1.569 1.3663 -4.0458 3.379 -7.7327 2.0126 -3.687 3.5728 -5.7824 4.6422 -6.9613Z" strokeWidth="3"></path>
                        <path id="Vector_6" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M15.3191 16.3178c-1.3974 -0.2949 -1.905 -1.712 -1.2201 -2.9652 2.923 -5.34823 6.4242 -8.199 8.3823 -9.48324 0.9356 -0.61358 2.1019 -0.61357 3.0375 0 1.9581 1.28424 5.4593 4.13502 8.3823 9.48324 0.6849 1.2532 0.1773 2.6703 -1.2201 2.9652 -1.6468 0.3475 -4.3554 0.6821 -8.6809 0.6821 -4.3256 0 -7.0342 -0.3346 -8.681 -0.6821Z" strokeWidth="3"></path>
                        <path id="Subtract_2" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M19.5687 16.8613c0.2808 3.0559 0.6407 6.6911 1.0212 9.8117 -2.3535 1.0137 -4.9264 2.1729 -7.2293 3.2289M28.431 16.8614c-0.2906 3.1638 -0.666 6.9486 -1.0614 10.1403 2.3559 1.0249 4.8736 2.165 7.0872 3.1835m-4.159 7.7754c-2.0973 -1.4829 -4.5066 -3.2086 -6.6976 -4.832 -1.9813 1.4682 -4.1413 3.02 -6.0875 4.4002" strokeWidth="3"></path>
                      </g>
                    </svg>
                  </p>
                  <h4 className="text-black">2M+</h4>
                  <h5 className="text-black">Links & QR Codes created monthly</h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="homeStat">
                  <p className="homeStatIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Browser-Code-1--Streamline-Plump" height="48" width="48">
                      <g id="browser-code-1--code-browser-line-shell-command-terminal">
                        <path id="Rectangle 1097" fill="#ffffff" d="M3.539 39.743c0.208 2.555 2.163 4.51 4.718 4.718C11.485 44.723 16.636 45 24 45c7.364 0 12.515 -0.277 15.743 -0.539 2.555 -0.208 4.51 -2.163 4.718 -4.718C44.723 36.515 45 31.364 45 24c0 -7.364 -0.277 -12.515 -0.539 -15.743 -0.208 -2.555 -2.163 -4.51 -4.718 -4.718C36.515 3.277 31.364 3 24 3c-7.364 0 -12.515 0.277 -15.743 0.539 -2.555 0.208 -4.51 2.163 -4.718 4.718C3.277 11.485 3 16.636 3 24c0 7.364 0.277 12.515 0.539 15.743Z" strokeWidth="3"></path>
                        <path id="Intersect" fill="#8fbffa" d="M44.784 13.5H3.217c0.095 -2.117 0.21 -3.857 0.322 -5.243 0.208 -2.555 2.163 -4.51 4.719 -4.718C11.486 3.277 16.637 3 24 3c7.364 0 12.515 0.277 15.743 0.539 2.556 0.208 4.51 2.163 4.719 4.718 0.112 1.386 0.227 3.126 0.322 5.243Z" strokeWidth="3"></path>
                        <path id="Vector 1456" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M12 23s8 4 8 6 -8 6 -8 6" strokeWidth="3"></path>
                        <path id="Vector 1462" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M26 34h10" strokeWidth="3"></path>
                        <path id="Rectangle 1096" stroke="#2859c5" strokeLinejoin="round" d="M3.539 39.743c0.208 2.555 2.163 4.51 4.718 4.718C11.485 44.723 16.636 45 24 45c7.364 0 12.515 -0.277 15.743 -0.539 2.555 -0.208 4.51 -2.163 4.718 -4.718C44.723 36.515 45 31.364 45 24c0 -7.364 -0.277 -12.515 -0.539 -15.743 -0.208 -2.555 -2.163 -4.51 -4.718 -4.718C36.515 3.277 31.364 3 24 3c-7.364 0 -12.515 0.277 -15.743 0.539 -2.555 0.208 -4.51 2.163 -4.718 4.718C3.277 11.485 3 16.636 3 24c0 7.364 0.277 12.515 0.539 15.743Z" strokeWidth="3"></path>
                        <path id="Vector 146" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="m3.5 13.5 41 0" strokeWidth="3"></path><path id="Vector 1501" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M10 8.5h2" strokeWidth="3"></path>
                        <path id="Vector 1502" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M18 8.5h2" strokeWidth="3"></path>
                      </g>
                    </svg>
                  </p>
                  <h4 className="text-black">50+</h4>
                  <h5 className="text-black">API Integrations</h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="homeStat">
                  <p className="homeStatIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Earth-1--Streamline-Plump" height="48" width="48">
                      <g id="earth-1--planet-earth-globe-world">
                        <path id="Ellipse 19" fill="#8fbffa" d="M24 3c11.598 0 21 9.402 21 21s-9.402 21 -21 21S3 35.598 3 24 12.402 3 24 3Z" strokeWidth="3"></path>
                        <path id="Intersect" fill="#ffffff" d="M15.575 43C8.822 40.097 3.899 33.782 3 26.24c3.789 -0.2 7.335 0.167 8.528 0.31 0.285 0.035 0.564 0.092 0.833 0.191 3.157 1.158 4.987 4.388 5.796 6.205 0.369 0.828 0.42 1.748 0.199 2.626A36.729 36.729 0 0 1 15.576 43Z" strokeWidth="3"></path>
                        <path id="Intersect_2" fill="#ffffff" d="M39.837 10A20.82 20.82 0 0 1 45 23.747c0 5.111 -1.839 9.795 -4.894 13.433 -3.754 -3.208 -6.892 -9.106 -8.146 -11.671a3.016 3.016 0 0 0 -1.924 -1.601l-2.412 -0.64c-2.676 -0.71 -4.894 -2.869 -4.411 -5.582 0.104 -0.582 0.261 -1.19 0.493 -1.803 0.577 -1.527 2.04 -2.465 3.617 -2.91 2.817 -0.796 7.698 -2.091 12.514 -2.973Z" strokeWidth="3"></path>
                        <path id="Ellipse 18" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M24 3c11.598 0 21 9.402 21 21s-9.402 21 -21 21S3 35.598 3 24 12.402 3 24 3Z" strokeWidth="3"></path>
                        <path id="Intersect_3" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M15.575 43a36.723 36.723 0 0 0 2.78 -7.428c0.223 -0.878 0.17 -1.798 -0.198 -2.627 -0.809 -1.816 -2.64 -5.046 -5.796 -6.204a3.688 3.688 0 0 0 -0.833 -0.19c-1.17 -0.141 -4.605 -0.496 -8.312 -0.322" strokeWidth="3"></path>
                        <path id="Intersect_4" stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M40.106 37.18c-3.754 -3.208 -6.892 -9.106 -8.146 -11.671a3.016 3.016 0 0 0 -1.924 -1.601l-2.412 -0.64c-2.676 -0.71 -4.894 -2.869 -4.411 -5.582 0.104 -0.582 0.261 -1.19 0.493 -1.803 0.577 -1.527 2.04 -2.465 3.617 -2.911 2.786 -0.787 7.59 -2.062 12.354 -2.943" strokeWidth="3"></path>
                      </g>
                    </svg>
                  </p>
                  <h4 className="text-black">1M+</h4>
                  <h5 className="text-black">Reached (Clicks & Scans monthly)</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="secondHome" className="bg-light py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="mb-3 text-black">Simplify Your Links with Our Free URL Shortener</h2>
                <p className="text-black">Turn long, complicated URLs into concise, easy-to-share links using our Free URL Shortener. Perfect for social media, emails, blogs, SMS, and more, our tool allows you to create memorable, trackable short URLs for all your needs. Whether you're sharing on Twitter, Facebook, Instagram, YouTube, or any other platform, our Free URL Shortener is the ideal solution for making your links more user-friendly. Plus, you can track the clicks your shortened URLs receive, giving you valuable insights into your audience's engagement.</p>
                <p className="text-black">Try our <Link href="https://opn.my">Free URL Shortener</Link> now and enhance your sharing experience!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
