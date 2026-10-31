export const metadata = {
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
