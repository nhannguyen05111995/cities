import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {

    try {
        const API_URL = process.env.API_URL;
        const X_RAPID_API_KEY = process.env.API_KEY;
        const X_RAPID_API_HOST = process.env.API_HOST;
        const param = await params
        const slug = param.slug
        const url = `${API_URL}/v1/geo/countries/${slug}`;
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

