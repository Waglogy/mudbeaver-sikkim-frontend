const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000"

/** @type {import('next').NextConfig} */
const nextConfig = {
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
