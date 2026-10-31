import RevealOnScroll from "@/components/RevealOnScroll"

// "Why Choose Us! Our Specialization And Features" (wording unchanged)

const FEATURES = [
    {
        title: "Expertise in Earth-Based Building",
        text: "At Mud Beaver Sikkim, we specialize in researching, developing, and promoting earth-based building technologies. Our deep expertise in Rammed Earth construction sets us apart as pioneers in sustainable architecture.",
        icon: "fa-layer-group",
    },
    {
        title: "Ethical and Responsible Construction",
        text: "We believe in construction that respects the earth. Our methods are eco-friendly, minimizing our impact on the environment while creating enduring structures.",
        icon: "fa-leaf",
    },
    {
        title: "Sikkimese Heritage",
        text: "Our work is deeply inspired by the cultural and architectural heritage of Sikkim. By choosing Mud Beaver, you become a patron of preserving and promoting local traditions.",
        icon: "fa-mountain",
    },
    {
        title: "Client-Centric Approach",
        text: "Your satisfaction is at the heart of what we do. We work closely with you at every step to ensure your vision is realized beyond your expectations.",
        icon: "fa-hands-helping",
    },
]

export default function WhyChooseUs() {
    return (
        <section id="why-us" className="mb-why">
            <RevealOnScroll target="#why-us" />
            <div className="mb-container">
                <div className="mb-why__top">
                    <div className="mb-why__intro">
                        <p className="mb-section-eyebrow">Why Choose Us!</p>
                        <h2 className="mb-why__title">
                            Our specialization and features.
                        </h2>
                        <p className="mb-why__lead">
                            We see architecture as a holistic endeavor. Our
                            designs consider not only the physical structure but
                            also the environment, culture, and community.
                        </p>
                    </div>
                    <figure className="mb-why__photo">
                        <img
                            src="/img/6.webp"
                            alt="Traditional stone masonry tower framed by white flowers"
                            loading="lazy"
                        />
                    </figure>
                </div>

                <ul className="mb-why__list">
                    {FEATURES.map(({ title, text, icon }, index) => (
                        <li
                            key={title}
                            className="mb-why__card"
                            style={{ "--i": index }}
                        >
                            <div className="mb-why__card-top">
                                <i
                                    className={`fas ${icon}`}
                                    aria-hidden="true"
                                ></i>
                            </div>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
