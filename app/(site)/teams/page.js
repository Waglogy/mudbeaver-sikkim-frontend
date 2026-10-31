import Footer from "@/components/Footer"
import TeamMembers from "@/components/TeamMembers"
import SiteScripts from "@/components/SiteScripts"

export const metadata = { title: "Our Team | Mud Beavers Sikkim" }
export default function TeamPage() {
    return <>
        <main className="mb-home-team" aria-labelledby="team-page-title">
            <div className="mb-container">
                <div className="mb-home-team__head">
                    <div><p className="mb-section-eyebrow">Our Team</p><h1 id="team-page-title" className="mb-team-page-title">Our expert team.<br /><span>A shared love for the earth.</span></h1></div>
                    <p>Our team is the heartbeat of Mud Beavers. Blending years of experience with a passion for sustainable construction, our artisans and designers transform earth into timeless architecture — preserving tradition and nurturing a greener future.</p>
                </div>
                <TeamMembers />
            </div>
        </main>
        <Footer />
        <SiteScripts />
    </>
}
