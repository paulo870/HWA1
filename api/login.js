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

    if (password !== correctPassword) {
        return res.status(401).json({
            error: "Incorrect password"
        });
    }

    return res.status(200).json({
        success: true
    });
}
