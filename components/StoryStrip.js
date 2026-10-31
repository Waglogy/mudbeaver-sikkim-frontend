"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// "Why do we call ourselves Mud Beaver Sikkim?" — the six-part story as a swipeable
// strip; clicking a card opens it full size in a viewer with previous/next.

const STORY = [
    {
        src: "/img/w1.jpg",
        alt: "Why do we call ourselves Mud Beaver Sikkim? First, let us talk about our mascots, the beavers.",
    },
    {
        src: "/img/w2.jpg",
        alt: "Beavers are widely known as ecosystem engineers because they create and help restore the ecosystem.",
    },
    {
        src: "/img/w3.jpg",
        alt: "They construct dams that outweigh the damaging influence of climate change, with next to no carbon footprint.",
    },
    {
        src: "/img/w4.jpg",
        alt: "We took the moniker Mud Beavers because their construction helps restore the ecosystem.",
    },
    {
        src: "/img/w5.jpg",
        alt: "Our project deals with construction of sustainable earthen structures and green practices, using locally sourced materials.",
    },
    {
        src: "/img/w7.jpg",
        alt: "Mud Beaver is based in Sikkim, and aims to put Sikkim on the map for sustainable construction.",
    },
]

const pad = (n) => String(n).padStart(2, "0")

export default function StoryStrip() {
    const trackRef = useRef(null)
    const viewerRef = useRef(null)
    const [active, setActive] = useState(0)
    const [open, setOpen] = useState(0)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    // Track which card is nearest the left edge, and whether we can scroll further
    useEffect(() => {
        const track = trackRef.current
        const onScroll = () => {
            const cards = [...track.children]
            const left = track.getBoundingClientRect().left
            let nearest = 0
            cards.forEach((card, i) => {
                if (
                    Math.abs(card.getBoundingClientRect().left - left) <
                    Math.abs(cards[nearest].getBoundingClientRect().left - left)
                )
                    nearest = i
            })
            setActive(nearest)
            setAtStart(track.scrollLeft < 8)
            setAtEnd(
                track.scrollLeft + track.clientWidth > track.scrollWidth - 8,
            )
        }
        onScroll()
        track.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            track.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    const scrollByCard = (dir) => {
        const track = trackRef.current
        const card = track.children[0]
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0
        track.scrollBy({
            left: dir * (card.offsetWidth + gap),
            behavior: "smooth",
        })
    }

    const show = (index) => {
        setOpen(index)
        const viewer = viewerRef.current
        if (!viewer.open) {
            viewer.showModal()
            document.documentElement.classList.add("mb-modal-lock")
        }
    }

    const step = useCallback(
        (dir) => setOpen((i) => (i + dir + STORY.length) % STORY.length),
        [],
    )

    useEffect(() => {
        const viewer = viewerRef.current
        const onKey = (event) => {
            if (event.key === "ArrowRight") step(1)
            if (event.key === "ArrowLeft") step(-1)
        }
        const onClose = () =>
            document.documentElement.classList.remove("mb-modal-lock")
        viewer.addEventListener("keydown", onKey)
        viewer.addEventListener("close", onClose)
        return () => {
            viewer.removeEventListener("keydown", onKey)
            viewer.removeEventListener("close", onClose)
        }
    }, [step])

    return (
        <div className="mb-story">
            <div className="mb-story__head">
                <h2 className="mb-story__title">
                    Why do we call ourselves <span>"Mud Beaver Sikkim" ?</span>
                </h2>
                <div className="mb-story__controls">
                    <span className="mb-story__count" aria-hidden="true">
                        <strong>{pad(active + 1)}</strong> / {pad(STORY.length)}
                    </span>
                    <button
                        type="button"
                        aria-label="Previous"
                        onClick={() => scrollByCard(-1)}
                        disabled={atStart}
                    >
                        <i
                            className="bi bi-chevron-left"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <button
                        type="button"
                        aria-label="Next"
                        onClick={() => scrollByCard(1)}
                        disabled={atEnd}
                    >
                        <i
                            className="bi bi-chevron-right"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </div>

            <ol className="mb-story__track" ref={trackRef}>
                {STORY.map(({ src, alt }, index) => (
                    <li
                        key={src}
                        className="mb-story__card"
                        style={{ "--i": index }}
                    >
                        <button
                            type="button"
                            onClick={() => show(index)}
                            aria-label={`Open part ${index + 1}: ${alt}`}
                        >
                            <img src={src} alt="" loading="lazy" />
                            <span className="mb-story__zoom" aria-hidden="true">
                                <i className="bi bi-arrows-angle-expand"></i>
                            </span>
                        </button>
                        <span className="mb-story__part">
                            Part {pad(index + 1)}
                        </span>
                    </li>
                ))}
            </ol>

            <div className="mb-story__progress" aria-hidden="true">
                <span
                    style={{ width: `${((active + 1) / STORY.length) * 100}%` }}
                ></span>
            </div>

            <dialog
                ref={viewerRef}
                className="mb-viewer"
                aria-label="Why do we call ourselves Mud Beaver Sikkim?"
                onClick={(event) =>
                    event.target === event.currentTarget &&
                    viewerRef.current.close()
                }
            >
                <figure className="mb-viewer__figure" key={open}>
                    <img src={STORY[open].src} alt={STORY[open].alt} />
                    <figcaption>
                        Part {pad(open + 1)} / {pad(STORY.length)}
                    </figcaption>
                </figure>
                <button
                    type="button"
                    className="mb-viewer__nav mb-viewer__nav--prev"
                    aria-label="Previous"
                    onClick={() => step(-1)}
                >
                    <i className="bi bi-chevron-left" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    className="mb-viewer__nav mb-viewer__nav--next"
                    aria-label="Next"
                    onClick={() => step(1)}
                >
                    <i className="bi bi-chevron-right" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    className="mb-viewer__close"
                    aria-label="Close"
                    autoFocus
                    onClick={() => viewerRef.current.close()}
                >
                    <i className="fas fa-times" aria-hidden="true"></i>
                </button>
            </dialog>
        </div>
    )
}
