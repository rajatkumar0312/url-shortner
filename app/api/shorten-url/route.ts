import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Forward the request to the external API
    //const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch('https://opn.my/api/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'key': '1234567890abcdef',
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