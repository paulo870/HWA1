import crypto from "crypto";

function parseCookies(cookieHeader) {

    const cookies = {};

    if (!cookieHeader) {
        return cookies;
    }

    cookieHeader.split(";").forEach(cookie => {

        const parts = cookie.trim().split("=");

        const name = parts.shift();

        const value = parts.join("=");

        if (name) {
            cookies[name] = value;
        }

    });

    return cookies;

}

function createSignature(payload, secret) {

    return crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");

}

function isValidSession(session, secret) {

    if (!session) {
        return false;
    }

    const parts = session.split(".");

    if (parts.length !== 2) {
        return false;
    }

    const timestamp = parts[0];
    const signature = parts[1];

    const timestampNumber =
        Number(timestamp);

    if (!Number.isFinite(timestampNumber)) {
        return false;
    }

    const SESSION_DURATION =
        24 * 60 * 60 * 1000;

    if (
        Date.now() - timestampNumber >
        SESSION_DURATION
    ) {

        return false;

    }

    if (
        Date.now() - timestampNumber < 0
    ) {

        return false;

    }

    const expectedSignature =
        createSignature(
            timestamp,
            secret
        );

    try {

        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );

    } catch {

        return false;

    }

}

export default function middleware(req, res) {

    const pathname =
        req.url.split("?")[0];

    /*
     * Allow the login page.
     */

    if (
        pathname === "/login.html" ||
        pathname === "/api/login"
    ) {

        return res.next();

    }

    /*
     * Allow the login stylesheet.
     */

    if (
        pathname === "/css/login.css"
    ) {

        return res.next();

    }

    /*
     * Allow the logo used by the login page.
     */

    if (
        pathname === "/images/logo.png"
    ) {

        return res.next();

    }

    const sessionSecret =
        process.env.POLIGLOTA_SESSION_SECRET;

    if (!sessionSecret) {

        return res.status(500).send(
            "Authentication system is not configured."
        );

    }

    const cookies =
        parseCookies(
            req.headers.cookie
        );

    const session =
        cookies.poliglota_session;

    const valid =
        isValidSession(
            session,
            sessionSecret
        );

    if (!valid) {

        res.writeHead(302, {
            Location: "/login.html"
        });

        return res.end();

    }

    return res.next();

}

export const config = {

    matcher: [
        "/((?!_next/|favicon.ico).*)"
    ]

};
