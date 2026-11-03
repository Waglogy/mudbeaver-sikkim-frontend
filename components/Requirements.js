import BlueprintBackdrop from "@/components/BlueprintBackdrop"
import OpenRequirementsButton from "@/components/OpenRequirementsButton"
import RevealOnScroll from "@/components/RevealOnScroll"

// "Let's be specific about your requirements": intro, a preview of what the form
// asks for, and a button that opens the form popup (components/RequirementsModal.js)

const ASKS = [
    { label: "Site Details", icon: "fa-mountain" },
    { label: "Builtup Area", icon: "fa-ruler-combined" },
    { label: "Project Budget", icon: "fa-rupee-sign" },
    { label: "Category", icon: "fa-home" },
    { label: "Services Required", icon: "fa-tools" },
    { label: "Reference Images", icon: "fa-images" },
]

// Photo collage: four same-size photos, staggered over two columns (position and size in %;
// focus is the part of a wide photo kept in the crop)
const PHOTOS = [
    { src: "/img/3.webp", caption: "Cob house", x: 0, y: 0, w: 48, h: 44 },
    { src: "/img/rammed-earth-house.webp", caption: "Rammed earth house", x: 52, y: 8, w: 48, h: 44 },
    { src: "/img/2.jpg", caption: "Bhutia traditional house", x: 0, y: 48, w: 48, h: 44 },
    { src: "/img/lepcha-house.jpg", caption: "Lepcha traditional house", x: 52, y: 56, w: 48, h: 44, focus: "35% 50%" },
]

export default function Requirements() {
    return (
        <section id="requirements" className="mb-req">
            <BlueprintBackdrop />
            <RevealOnScroll target="#requirements" />
            <div className="mb-container mb-req__grid">
                <div className="mb-req__intro">
                    <span className="mb-req__bar" aria-hidden="true"></span>
                    <p className="mb-section-eyebrow">Plan your project</p>
                    <h2 className="mb-req__title">
                        Let&apos;s be specific about your requirements.
                    </h2>
                    <p className="mb-req__lead">
                        To get started with your project planning, fill out this
                        quick form. After you submit your specific requirements,
                        a dedicated member of our team will get in touch with
                        you to brief and help you prepare an actual estimation
                        of your project.
                    </p>
                    <ol className="mb-req__asks">
                        {ASKS.map(({ label, icon }, index) => (
                            <li key={label}>
                                <span
                                    className="mb-req__ask-icon"
                                    aria-hidden="true"
                                >
                                    <i className={`fas ${icon}`}></i>
                                </span>
                                <span className="mb-req__ask-text">
                                    <span className="mb-req__ask-num">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    {label}
                                </span>
                            </li>
                        ))}
                    </ol>
                    <OpenRequirementsButton className="mb-btn mb-btn--primary mb-req__open">
                        Fill out the form
                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </OpenRequirementsButton>
                </div>
                <div className="mb-req__collage">
                    <span className="mb-req__dots" aria-hidden="true"></span>
                    <span className="mb-req__outline" aria-hidden="true"></span>
                    {PHOTOS.map(({ src, caption, x, y, w, h, focus }, index) => (
                        <figure
                            key={src}
                            className="mb-req__tile mb-req__tile--main"
                            style={{
                                "--i": index,
                                left: `${x}%`,
                                top: `${y}%`,
                                width: `${w}%`,
                                height: `${h}%`,
                            }}
                        >
                            <img src={src} alt={caption} loading="lazy" style={focus && { objectPosition: focus }} />
                            <figcaption>{caption}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}
