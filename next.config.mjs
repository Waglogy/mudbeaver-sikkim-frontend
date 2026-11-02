// Trimmed so a stray space/newline pasted into a CI secret doesn't break the build
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:4000").trim().replace(/\/+$/, "")
if (!/^https?:\/\/[^/\s]+/.test(BACKEND_URL)) {
    throw new Error(
        "BACKEND_URL must be a full address starting with http:// or https:// " +
            "(for example https://api.mudbeaversikkim.in). Check the BACKEND_URL build argument / CI secret.",
    )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Self-contained server build for the Docker image
    output: "standalone",
    // Hide the Next.js dev-mode indicator badge (bottom-left corner)
    devIndicators: false,
    // Forward browser form submissions (/api/*) to the Express backend
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${BACKEND_URL}/api/:path*`,
            },
        ]
    },
}

export default nextConfig
