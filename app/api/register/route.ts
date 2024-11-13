import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        if (request.method !== 'POST') {
            console.error('Invalid request method');
            return NextResponse.json(
                { error: 'Invalid request method.' },
                { status: 405 }
            );
        }

        const { name, email, password } = await request.json();
        
        if (!name || !email || !password) {
            console.error('Validation failed: Missing fields');
            return NextResponse.json(
                { error: 'All fields (name, email, password) are required.' },
                { status: 400 }
            );
        }

        //console.log('Sending JSON payload:', JSON.stringify(jsonPayload));

        const apiUrl = process.env.SIGNUP_API_URL;
        const apiKey = process.env.URL_API_KEY;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'key': apiKey,
            },
            body: JSON.stringify({ name, email, password }),
        });

        //console.log('External API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`External API Error: ${response.status} - ${errorText}`);
            return NextResponse.json(
                { error: `Failed to call external API: ${response.statusText}` },
                { status: response.status }
            );
        }

        // Parse the external API response
        const data = await response.json();
        //console.log('External API response data:', data);

        // Return the API result
        return NextResponse.json({ result: data.status });
    } catch (error: any) {
        //console.error('Unexpected API Error:', error.message || error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}