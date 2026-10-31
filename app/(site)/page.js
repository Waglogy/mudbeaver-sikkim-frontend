import Footer from "@/components/Footer"
import About from "@/components/About"
import Appointment from "@/components/Appointment"
import HomeTeam from "@/components/HomeTeam"
import Hero from "@/components/Hero"
import Requirements from "@/components/Requirements"
import Services from "@/components/Services"
import SiteScripts from "@/components/SiteScripts"
import WhyChooseUs from "@/components/WhyChooseUs"

export const metadata = {
    title: "Home-MudBeaversSikkim",
}

export default function HomePage() {
    return (
        <>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8106065768681189"
                crossOrigin="anonymous"
            />
            <Hero />
            <Requirements />
            <About />
            <Services />
            <WhyChooseUs />
            <HomeTeam />
            <Appointment />
            <Footer />
            {/* Back to Top */}
            <a
                href="#"
                className="btn btn-lg btn-primary btn-lg-square back-to-top"
                style={{ backgroundColor: "#964B00", borderColor: "#964B00" }}
            >
                <i className="bi bi-arrow-up"></i>
            </a>
            <SiteScripts />
        </>
    )
}
