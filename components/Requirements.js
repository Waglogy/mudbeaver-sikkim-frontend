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
    { label: "Architectural Drawings", icon: "fa-file-pdf" },
]

// Editorial photo collage: position and size (%), tilt, stacking order, shape and caption
const PHOTOS = [
    {
        src: "/img/3.jpg",
        caption: "Earthen home",
        x: 10,
        y: 6,
        w: 60,
        h: 66,
        r: 0,
        z: 2,
        kind: "main",
    },
    {
        src: "/img/22.jpg",
        caption: "Bamboo dome",
        x: 66,
        y: 2,
        w: 34,
        h: 27,
        r: 0,
        z: 3,
        kind: "round",
    },
    {
        src: "/img/20.jpg",
        caption: "Rammed earth",
        x: 57,
        y: 40,
        w: 41,
        h: 40,
        r: 2.5,
        z: 4,
        kind: "print",
    },
    {
        src: "/img/2.jpg",
        caption: "Stone & timber",
        x: 0,
        y: 66,
        w: 47,
        h: 31,
        r: -2,
        z: 5,
        kind: "print",
    },
]

export default function Requirements() {
    return (
        <section id="requirements" className="mb-req">
            <BlueprintBackdrop />
            <RevealOnScroll target="#requirements" />
            <div className="mb-container mb-req__grid">
                <div className="mb-req__intro">
                    <span className="mb-req__bar" aria-hidden="true"></span>
                    <h1 className="mb-req__title">
                        LET'S BE SPECIFIC ABOUT YOUR REQUIREMENTS
                    </h1>
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
                    {PHOTOS.map(
                        ({ src, caption, x, y, w, h, r, z, kind }, index) => (
                            <figure
                                key={src}
                                className={`mb-req__tile mb-req__tile--${kind}`}
                                style={{
                                    "--i": index,
                                    "--r": `${r}deg`,
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    width: `${w}%`,
                                    height: `${h}%`,
                                    zIndex: z,
                                }}
                            >
                                <img src={src} alt={caption} loading="lazy" />
                                {kind !== "round" && (
                                    <figcaption>{caption}</figcaption>
                                )}
                            </figure>
                        ),
                    )}
                </div>
            </div>
        </section>
    )
}
