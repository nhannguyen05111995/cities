import { NextResponse } from "next/server";


export async function GET(req,) {

    try {
        const API_URL = process.env.API_URL;
        const X_RAPID_API_KEY = process.env.API_KEY;
        const X_RAPID_API_HOST = process.env.API_HOST;
        const page = req.nextUrl.searchParams.get("offset");
        const query = req.nextUrl.searchParams.get("query").replaceAll("+", "%2B");      
        const url = `${API_URL}/v1/geo/cities?offset=${page}&limit=10&${query}`;        
        const response = await fetch(url, {
            headers: {
                "x-rapidapi-key": X_RAPID_API_KEY,
                "x-rapidapi-host": X_RAPID_API_HOST,
            },
        });
        const json = await response.json();        
        return NextResponse.json(json);
    } catch (err) {
        console.log(err);
        
        return NextResponse.json({ error: err.message });
    }
}

