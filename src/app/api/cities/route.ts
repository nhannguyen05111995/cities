import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
export async function GET(req: NextRequest,) {

    try {
        const API_URL = process.env.API_URL;
        const X_RAPID_API_KEY = process.env.API_KEY;
        const X_RAPID_API_HOST = process.env.API_HOST;
        const page = req ? req?.nextUrl?.searchParams.get("offset") : "";
        const sort = req ? req?.nextUrl?.searchParams.get("sort") : "";
        const query = req ? req?.nextUrl?.searchParams.get("query")?.replaceAll("+", "%2B") : "";
        const url = `${API_URL}/v1/geo/cities?includeDeleted=None&offset=${page}&limit=10&${query}&sort=${sort}`;
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

