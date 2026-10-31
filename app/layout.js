import { SITE_URL } from "@/lib/seo"

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Mud beavers sikkim",
    icons: { icon: "/img/favicon.png" },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
