import { NextResponse } from "next/server"

export default function POST(request: Request){
    try {
        const { username, password } = await request.json();
        if(!username, !password){
            console.error("Required fields missing");
            return NextResponse.json(
                { error: 'All Fields are mandatory.' },
                { status: 400 },
            );
        }
        const apiUrl = process.env.LOGIN_API_URL;
        const apiKey = process.env.URL_API_KEY;

        const response = await fetch (apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'key': apiKey,
            }
            body: JSON.stringify({ username, password });
        })
    } catch (error) {
        
    }
}