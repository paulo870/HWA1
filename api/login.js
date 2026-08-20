import crypto from "crypto";

function createToken() {
    const timestamp = Date.now().toString();

    const signature = crypto
        .createHmac("sha256", process.env.POLIGLOTA_SESSION_SECRET)
        .update(timestamp)
        .digest("hex");

    return `${timestamp}.${signature}`;
}

export default function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { password } = req.body || {};

    const correctPassword = process.env.POLIGLOTA_BOOK_PASSWORD;

    if (!correctPassword) {
        return res.status(500).json({
            error: "Password is not configured"
        });
    }

    if (!process.env.POLIGLOTA_SESSION_SECRET) {
        return res.status(500).json({
            error: "Session secret is not configured"
        });
    }

    if (password !== correctPassword) {
        return res.status(401).json({
            error: "Incorrect password"
        });
    }

    const token = createToken();

    res.setHeader(
        "Set-Cookie",
        `poliglota_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
    );

    return res.status(200).json({
        success: true
    });
}
