import crypto from "crypto";

function createToken(secret) {
    const timestamp = Date.now().toString();

    const signature = crypto
        .createHmac("sha256", secret)
        .update(timestamp)
        .digest("hex");

    return `${timestamp}.${signature}`;
}

function passwordsMatch(input, actual) {
    const inputBuffer = Buffer.from(input);
    const actualBuffer = Buffer.from(actual);

    if (inputBuffer.length !== actualBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(
        inputBuffer,
        actualBuffer
    );
}

export default function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const password =
        process.env.POLIGLOTA_ACCESS_PASSWORD;

    const secret =
        process.env.POLIGLOTA_SESSION_SECRET;

    if (!password || !secret) {
        console.error(
            "Missing authentication environment variables."
        );

        return res.status(500).json({
            error: "Authentication is not configured."
        });
    }

    const submittedPassword =
        req.body?.password;

    if (typeof submittedPassword !== "string") {
        return res.status(400).json({
            error: "Password is required."
        });
    }

    if (!passwordsMatch(submittedPassword, password)) {
        return res.status(401).json({
            error: "Incorrect password."
        });
    }

    const token = createToken(secret);

    res.setHeader(
        "Set-Cookie",
        [
            `poliglota_session=${token}`,
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
