import { NextResponse } from "next/server";

export async function GET(req) {

    try {
        const API_URL = process.env.API_URL;
        const X_RAPID_API_KEY = process.env.API_KEY;
        const X_RAPID_API_HOST = process.env.API_HOST;
        const value = req.nextUrl.searchParams.get("namePrefix");
        const url = `${API_URL}/v1/geo/countries?namePrefix=${value}`;

        const response = await fetch(url, {
            headers: {
                "x-rapidapi-key": X_RAPID_API_KEY,
                "x-rapidapi-host": X_RAPID_API_HOST,
            },
        });
        const json = await response.json();

        return NextResponse.json(json);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

