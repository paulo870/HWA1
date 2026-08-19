import crypto from "crypto";

function createSignature(payload, secret) {

    return crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");

}

function createSession(secret) {

    const timestamp = Date.now();

    const payload = String(timestamp);

    const signature = createSignature(payload, secret);

    return `${payload}.${signature}`;

}

function safeCompare(a, b) {

    const aBuffer = Buffer.from(a);
    const bBuffer = Buffer.from(b);

    if (aBuffer.length !== bBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(aBuffer, bBuffer);

}

export default function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed."
        });

    }

    const configuredPassword =
        process.env.POLIGLOTA_ACCESS_PASSWORD;

    const sessionSecret =
        process.env.POLIGLOTA_SESSION_SECRET;

    if (!configuredPassword || !sessionSecret) {

        console.error(
            "Authentication environment variables are missing."
        );

        return res.status(500).json({
            error: "Authentication system is not configured."
        });

    }

    const submittedPassword =
        req.body?.password;

    if (
        typeof submittedPassword !== "string" ||
        submittedPassword.length === 0
    ) {

        return res.status(400).json({
            error: "Please enter your password."
        });

    }

    const passwordCorrect =
        safeCompare(
            submittedPassword,
            configuredPassword
        );

    if (!passwordCorrect) {

        return res.status(401).json({
            error: "Incorrect password."
        });

    }

    const session =
        createSession(sessionSecret);

    res.setHeader(
        "Set-Cookie",
        [
            `poliglota_session=${session}`,
            "Path=/",
            "HttpOnly",
            "Secure",
            "SameSite=Strict",
            "Max-Age=86400"
        ].join("; ")
    );

    return res.status(200).json({
        success: true
    });

}
