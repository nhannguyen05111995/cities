import { NextResponse } from "next/server";
export async function GET() {

    try {
        const API_URL = process.env.API_URL;
        const X_RAPID_API_KEY = process.env.API_KEY;
        const X_RAPID_API_HOST = process.env.API_HOST;

        const url = `${API_URL}/v1/locale/languages?limit=10`;
        const headers = new Headers();

        headers.append("x-rapidapi-key", X_RAPID_API_KEY as string);
        headers.append("x-rapidapi-host", X_RAPID_API_HOST as string);


        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        const response = await fetch(url, requestOptions);
        const json = await response.json();

        if ("message" in json || "errors" in json)
            return NextResponse.json({});

        return NextResponse.json(json);
    } catch (err: unknown) {
        console.log(err);

        return NextResponse.json({ error: "failed" });
    }
}

