import RevealOnScroll from "@/components/RevealOnScroll"
import StoryStrip from "@/components/StoryStrip"

// About Us — "The Enterprise" (wording unchanged) merged with the
// "Why do we call ourselves Mud Beaver Sikkim?" story

const PROMISES = [
    { label: "Ontime at services", icon: "fa-clock" },
    { label: "24/7 Online Presence", icon: "fa-globe-asia" },
    { label: "Verified professionals", icon: "fa-user-check" },
]

export default function About() {
    return (
        <section id="about" className="mb-about">
            <RevealOnScroll target="#about" />
            <div className="mb-container">
                <div className="mb-about__grid">
                    <div className="mb-about__media">
                        <figure className="mb-about__photo">
                            <img
                                src="/img/10.jpg"
                                alt="Earthen arches and curved roof tiles at a Mud Beaver site"
                                loading="lazy"
                            />
                        </figure>
                        <div className="mb-about__badge" aria-hidden="true">
                            <span>Mud</span>
                            <span>Beavers</span>
                            <span>Sikkim</span>
                        </div>
                    </div>

                    <div className="mb-about__text">
                        <p className="mb-about__eyebrow">About Us</p>
                        <h2 className="mb-about__title">THE ENTERPRISE</h2>
                        <p className="mb-about__lead">
                            Mud Beaver Sikkim is a socio-sustainable
                            construction enterprise focussing on specialisation
                            in research, development, promotion and transfer of
                            earth based building technologies.
                        </p>
                        <p>
                            We construct timeless, unique traditional,
                            vernacular, cost effective, low carbon embodied,
                            climate responsive, energy efficient dwellings
                            alongside designing and implementing green products
                            &amp; practices to sustainably contribute as a part
                            of the project but development as a whole.
                        </p>
                        <ul className="mb-about__promises">
                            {PROMISES.map(({ label, icon }) => (
                                <li key={label}>
                                    <span aria-hidden="true">
                                        <i className={`fas ${icon}`}></i>
                                    </span>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <StoryStrip />
            </div>
        </section>
    )
}
