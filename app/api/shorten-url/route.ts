import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const apiUrl = process.env.SIGNUP_API_URL;
    const apiKey = process.env.URL_API_KEY;
    
    if (!apiUrl || !apiKey) {
        throw new Error("Missing API URL or API key in environment variables");
    }
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'key': apiKey,
      },
      body: JSON.stringify({ url, type: 'url' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ result: data.short_url }); // Adjust `data.result` if necessary
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to shorten URL' }, { status: 500 });
  }
}