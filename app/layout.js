import { SITE_URL } from "@/lib/seo"

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Mud beavers sikkim",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "48x48" },
            { url: "/img/favicon-beaver-32.png", sizes: "32x32", type: "image/png" },
            { url: "/img/favicon-beaver-192.png", sizes: "192x192", type: "image/png" },
        ],
        apple: "/img/apple-touch-icon.png",
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
