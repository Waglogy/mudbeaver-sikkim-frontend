const TEAM = [
    { name: "Prajwal Tamang", role: "CEO & Founder", image: "PRAJWAL_TAMANG.png" },
    { name: "Salina Rai", role: "Creative Director / HR", image: "SALINA_RAI.png" },
    { name: "Bhoomika Chaudhari", role: "Architect", image: "BHOOMIKA_CHAUDHARI.png" },
]

export default function HomeTeam() {
    return (
        <section className="mb-home-team" aria-labelledby="home-team-title">
            <div className="mb-container">
                <div className="mb-home-team__head">
                    <div><p className="mb-section-eyebrow">Our Team</p><h2 id="home-team-title">Our expert team.<br /><span>A shared love for the earth.</span></h2></div>
                    <div><p>Our team is the heartbeat of Mud Beavers. Blending years of experience with a passion for sustainable construction, our artisans and designers transform earth into timeless architecture — preserving tradition and nurturing a greener future.</p><a className="mb-home-team__link" href="/teams">Meet the whole team <i className="bi bi-arrow-right" aria-hidden="true"></i></a></div>
                </div>
                <div className="mb-home-team__grid">
                    {TEAM.map((person, index) => <article className="mb-person" key={person.name}><div className="mb-person__portrait"><img src={`/img/teams/${person.image}`} alt={person.name} loading="lazy" /><span aria-hidden="true">0{index + 1}</span></div><div className="mb-person__info"><h3>{person.name}</h3><p>{person.role}</p></div></article>)}
                </div>
            </div>
        </section>
    )
}
