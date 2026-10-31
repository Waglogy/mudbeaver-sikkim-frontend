import RevealOnScroll from "@/components/RevealOnScroll"

// Home page services: four expanding photo panels (wording unchanged)

const SERVICES = [
    {
        title: "SUSTAINABLE CONSULTANT.",
        text: "We not only put in a lot of effort into building a den for our client but foremost we are here to give suggestions & advice for individuals interested in diving into the world of sustainability.",
        image: "/img/sd.jpg",
        icon: "fa-comments",
    },
    {
        title: "TRADITIONAL/VERNACULAR SUSTAINABLE DESIGN",
        text: "Providing designs inspired by rich & aesthetically looking traditional buildings, preserving local culture and heritage with a zest of passive design principles.",
        image: "/img/2.jpg",
        icon: "fa-drafting-compass",
    },
    {
        title: "PERMACULTURE",
        text: "The creation of an ecologically sound way of life in our homes, gardens, communities, and enterprises is the core of permaculture.",
        image: "/img/55.jpg",
        icon: "fa-seedling",
    },
    {
        title: "SUSTAINABLE INTERIOR",
        text: "The structure that we build are of course a work of an art due a lot of enriching factors but what really matters at the end of the day is how ambient.",
        image: "/img/st.webp",
        icon: "fa-couch",
    },
]

export default function Services() {
    return (
        <section id="home-services" className="mb-svc">
            <RevealOnScroll target="#home-services" />
            <div className="mb-container">
                <div className="mb-svc__head">
                    <div>
                        <p className="mb-section-eyebrow">Our Services</p>
                        <h2 className="mb-svc__title-main">What we do.</h2>
                    </div>
                    <a className="mb-svc__all" href="/services">
                        View all services
                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>

                <ul className="mb-svc__list">
                    {SERVICES.map(({ title, text, image, icon }, index) => (
                        <li
                            key={title}
                            className="mb-svc__card"
                            style={{ "--i": index }}
                        >
                            <img src={image} alt="" loading="lazy" />
                            <div className="mb-svc__body">
                                <span
                                    className="mb-svc__icon"
                                    aria-hidden="true"
                                >
                                    <i className={`fas ${icon}`}></i>
                                </span>
                                <h3 className="mb-svc__title">
                                    {/* allow a line break after "/" in long titles */}
                                    {title.split("/").map((part, i) => (
                                        <span key={i}>
                                            {i > 0 && "/"}
                                            {i > 0 && <wbr />}
                                            {part}
                                        </span>
                                    ))}
                                </h3>
                                <div className="mb-svc__more">
                                    <div>
                                        <p>{text}</p>
                                        <a
                                            href="/services"
                                            aria-label={`Read more about ${title}`}
                                        >
                                            READ MORE
                                            <i
                                                className="fa fa-arrow-right"
                                                aria-hidden="true"
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
