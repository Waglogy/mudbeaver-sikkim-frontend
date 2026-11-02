"use client"

import { useState } from "react"
import Beaver from "@/components/Beaver"

// Slide content is unchanged from the original home page carousel
const SLIDES = [
    {
        image: "/img/23.webp",
        position: "68% center",
        title: "Building a Greener Tomorrow: Mud Beaver Sikkim's Earth-Centric Approach",
        tags: [
            { label: "SUSTAINABLE CONSULTANT", icon: "fa-user-tie" },
            { label: "SUSTAINABLE DESIGN", icon: "fa-drafting-compass" },
            { label: "SUSTAINABLE PRACTISES", icon: "fa-seedling" },
        ],
    },
    {
        image: "/img/carousel-1.webp",
        position: "center 40%",
        title: "Discover the Beauty of Earth at Mud Beaver Sikkim - Where Tradition Meets Innovation.",
        tags: [
            { label: "SUSTAINABLE LANDSCAPING", icon: "fa-tree" },
            { label: "AQUAPONICS", icon: "fa-fish" },
            { label: "WASTE MANAGEMENT", icon: "fa-recycle" },
        ],
    },
]

const pad = (n) => String(n).padStart(2, "0")

export default function Hero() {
    const [active, setActive] = useState(0)
    const slide = SLIDES[active]

    const go = (index) => setActive((index + SLIDES.length) % SLIDES.length)

    return (
        <section
            className="mb-hero"
            aria-roledescription="carousel"
            aria-label="Mud Beaver Sikkim"
        >
            <div className="mb-hero__media">
                {SLIDES.map(({ image, position }, index) => (
                    <div
                        key={image}
                        className={`mb-hero__slide${index === active ? " is-active" : ""}`}
                        aria-hidden={index !== active}
                    >
                        <img
                            src={image}
                            alt="Image"
                            style={{ objectPosition: position }}
                            fetchPriority={index === 0 ? "high" : undefined}
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
            </div>

            <div className="mb-container mb-hero__inner">
                <div className="mb-hero__content" key={active}>
                    <h1
                        className="mb-hero__title mb-reveal"
                        style={{ "--d": 0 }}
                    >
                        {slide.title}
                    </h1>
                    <ul
                        className="mb-hero__tags mb-reveal"
                        style={{ "--d": 1 }}
                    >
                        {slide.tags.map(({ label, icon }) => (
                            <li key={label}>
                                <span
                                    className="mb-hero__tag-icon"
                                    aria-hidden="true"
                                >
                                    <i className={`fas ${icon}`}></i>
                                </span>
                                {label}
                            </li>
                        ))}
                    </ul>
                    <div
                        className="mb-hero__actions mb-reveal"
                        style={{ "--d": 2 }}
                    >
                        <a
                            href="/why-choose-us"
                            className="mb-btn mb-btn--primary"
                        >
                            Why Choose Us
                            <i
                                className="bi bi-arrow-up-right"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </div>
                </div>

                <div className="mb-hero__bottom">
                    <Beaver />
                    <div className="mb-hero__controls">
                        <span className="mb-hero__counter" aria-hidden="true">
                            <strong>{pad(active + 1)}</strong> /{" "}
                            {pad(SLIDES.length)}
                        </span>
                        <div className="mb-hero__progress">
                            {SLIDES.map((item, index) => (
                                <button
                                    key={item.image}
                                    type="button"
                                    className={`mb-hero__bar${index === active ? " is-active" : ""}${
                                        index < active ? " is-done" : ""
                                    }`}
                                    aria-label={`Show slide ${index + 1}`}
                                    aria-current={
                                        index === active ? "true" : undefined
                                    }
                                    onClick={() => go(index)}
                                >
                                    <span
                                        className="mb-hero__fill"
                                        onAnimationEnd={
                                            index === active
                                                ? () => go(active + 1)
                                                : undefined
                                        }
                                    ></span>
                                </button>
                            ))}
                        </div>
                        <div className="mb-hero__arrows">
                            <button
                                type="button"
                                aria-label="Previous"
                                onClick={() => go(active - 1)}
                            >
                                <i
                                    className="bi bi-chevron-left"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <button
                                type="button"
                                aria-label="Next"
                                onClick={() => go(active + 1)}
                            >
                                <i
                                    className="bi bi-chevron-right"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-hero__strata" aria-hidden="true"></div>
        </section>
    )
}
