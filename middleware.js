import { NextResponse } from "next/server";

async function createSignature(timestamp, secret) {

    const encoder = new TextEncoder();

    const keyData = encoder.encode(secret);

    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        {
            name: "HMAC",
            hash: "SHA-256"
        },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(timestamp)
    );

    return Array.from(new Uint8Array(signature))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


export default async function middleware(request) {

    const pathname = request.nextUrl.pathname;

    /*
     * These routes must remain public.
     */

    if (
        pathname === "/access.html" ||
        pathname === "/api/login"
    ) {
        return NextResponse.next();
    }


    /*
     * Get the session cookie.
     */

    const session = request.cookies.get("poliglota_session")?.value;

    if (!session) {

        const url = new URL("/access.html", request.url);

        return NextResponse.redirect(url);
    }


    /*
     * Split the token.
     *
     * timestamp.signature
     */

    const parts = session.split(".");

    if (parts.length !== 2) {

        const url = new URL("/access.html", request.url);

        return NextResponse.redirect(url);
    }


    const timestamp = parts[0];
    const suppliedSignature = parts[1];

    const timestampNumber = Number(timestamp);


    /*
     * Make sure the timestamp is valid.
     */

    if (!Number.isFinite(timestampNumber)) {

        const url = new URL("/access.html", request.url);

        return NextResponse.redirect(url);
    }


    /*
     * Session lifetime:
     * 24 hours
     */

    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (Date.now() - timestampNumber > twentyFourHours) {

        const response = NextResponse.redirect(
            new URL("/access.html", request.url)
        );

        response.cookies.delete("poliglota_session");

        return response;
    }


    /*
     * Create the expected signature.
     */

    const secret = process.env.POLIGLOTA_SESSION_SECRET;

    if (!secret) {

        return new Response(
            "Session security is not configured.",
            { status: 500 }
        );
    }

    const expectedSignature = await createSignature(
        timestamp,
        secret
    );


    /*
     * Compare signatures.
     */

    if (suppliedSignature !== expectedSignature) {

        const response = NextResponse.redirect(
            new URL("/access.html", request.url)
        );

        response.cookies.delete("poliglota_session");

        return response;
    }


    /*
     * Session is valid.
     * Allow the request to continue.
     */

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/((?!api/login|access\\.html).*)"
    ]
};
