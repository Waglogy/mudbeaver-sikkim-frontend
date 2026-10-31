import Header from "@/components/Header"
import RequirementsModal from "@/components/RequirementsModal"

// Original template stylesheets (same order), followed by the modern theme
const STYLESHEETS = [
    // Google Web Fonts
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Poppins:wght@600;700&display=swap",
    // Icon Font Stylesheet
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css",
    // Libraries Stylesheet
    "/lib/animate/animate.min.css",
    // Customized Bootstrap Stylesheet
    "/css/bootstrap.min.css",
    // Template Stylesheet
    "/css/style.css",
    // Modern theme (header + hero)
    "/css/theme.css",
]

export default function SiteChrome({ children }) {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin=""
            />
            {STYLESHEETS.map((href) => (
                <link
                    key={href}
                    rel="stylesheet"
                    href={href}
                    precedence="default"
                />
            ))}
            <Header />
            {children}
            <RequirementsModal />
        </>
    )
}
