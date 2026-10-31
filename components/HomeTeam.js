import TeamMembers from "@/components/TeamMembers"

export default function HomeTeam() {
    return (
        <section className="mb-home-team" aria-labelledby="home-team-title">
            <div className="mb-container">
                <div className="mb-home-team__head">
                    <div><p className="mb-section-eyebrow">Our Team</p><h2 id="home-team-title">Our expert team.<br /><span>A shared love for the earth.</span></h2></div>
                    <div><p>Our team is the heartbeat of Mud Beavers. Blending years of experience with a passion for sustainable construction, our artisans and designers transform earth into timeless architecture — preserving tradition and nurturing a greener future.</p><a className="mb-home-team__link" href="/teams">Meet the whole team <i className="bi bi-arrow-right" aria-hidden="true"></i></a></div>
                </div>
                <TeamMembers featured />
            </div>
        </section>
    )
}
