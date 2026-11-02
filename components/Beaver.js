"use client"

import { useEffect, useRef } from "react"

// Mud Beaver mascot: walks back and forth along the hero divider line, from just
// past the Why Choose Us button to the end of the line. Its speech bubble
// greets visitors, then shares short sustainability and beaver facts.
// beaver.webp is the Canva animation converted to a transparent animated WebP.

const SPEED = 70 // px per second
const PAUSE_MS = 1800 // rest at each end before turning back
const INTRO_MS = 2600 // wait for the pop-up entrance before the first walk
const HEAD = 0.68 // horizontal position of the head in the image (facing right)
const GAP_AFTER_BUTTON = 24
const MIN_WALK = 120 // below this there is no room to walk, so use the whole line
const PILL_CLEARANCE = 12 // the bubble only shows once it is clear of the service pills

// First greeting, then short awareness messages in rotation
const GREETING = { tag: "Hello! 👋", text: "Welcome to Mud Beaver Sikkim" }
const MESSAGES = [
    { tag: "Beaver fact", text: "Beavers are nature's engineers — our dams turn streams into wetlands full of life." },
    { tag: "Did you know?", text: "Making cement causes about 8% of the world's CO₂ emissions." },
    { tag: "How I help", text: "I build with earth instead of concrete — less carbon, more nature. 🌍" },
    { tag: "Did you know?", text: "Thick earth walls keep homes cool in summer and warm in winter." },
    { tag: "Beaver fact", text: "My teeth never stop growing — and they're orange because of iron! 🦷" },
    { tag: "Did you know?", text: "Rammed earth lasts for centuries — parts of the Great Wall of China are made of it." },
    { tag: "How I help", text: "Earth dug nearby needs little transport, saving fuel and money. 🚚" },
    { tag: "Did you know?", text: "Some bamboo grows almost a metre a day — a fast, renewable building material. 🎋" },
    { tag: "Beaver fact", text: "Beavers build with mud, sticks and stones — the original earth builders! 🏡" },
    { tag: "Did you know?", text: "Earth walls breathe — they soak up and release moisture to balance indoor air." },
    { tag: "How I help", text: "Rainwater harvesting saves water and recharges the ground beneath us. 💧" },
    { tag: "Did you know?", text: "Unfired earth can be broken down and reused — almost zero building waste. ♻️" },
]

export default function Beaver() {
    const beaverRef = useRef(null)
    const stepRef = useRef(null)
    const faceRef = useRef(null)
    const bubbleRef = useRef(null)
    const tagRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const beaver = beaverRef.current
        const step = stepRef.current
        const face = faceRef.current
        const bubble = bubbleRef.current
        const bar = beaver.parentElement
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        let min = 0
        let max = 0
        let x = 0
        let dir = 1
        let walking = false
        let travelled = 0
        let resumeAt = performance.now() + INTRO_MS
        let last = performance.now()
        let hovering = false
        let onScreen = true
        let introDone = false
        let bubbleShown = false
        let message = -1 // -1 = greeting
        let frame = 0

        // Swap the message text (only while hidden or turning, so size changes never cause flicker)
        const nextMessage = () => {
            message = (message + 1) % MESSAGES.length
            tagRef.current.textContent = MESSAGES[message].tag
            textRef.current.textContent = MESSAGES[message].text
        }

        const measure = () => {
            const barRect = bar.getBoundingClientRect()
            const button = bar.parentElement.querySelector(".mb-hero__actions .mb-btn")
            max = Math.max(0, barRect.width - beaver.offsetWidth)
            let start = button ? button.getBoundingClientRect().right - barRect.left + GAP_AFTER_BUTTON : 0
            if (start > max - MIN_WALK) start = 0
            min = Math.min(Math.max(start, 0), max)
            x = Math.min(Math.max(x, min), max)
        }

        const place = () => {
            beaver.style.transform = `translate3d(${x}px, 0, 0)`
            // Waddle while walking
            const phase = travelled / 9
            step.style.transform = walking
                ? `translateY(${-Math.abs(Math.sin(phase)) * 3}px) rotate(${Math.sin(phase) * 3}deg)`
                : ""
            // Keep the bubble over the head, inside the line, with its tail pointing at the head
            const width = beaver.offsetWidth
            const bubbleWidth = bubble.offsetWidth
            const head = x + width * (dir > 0 ? HEAD : 1 - HEAD)
            const left = Math.min(Math.max(head - bubbleWidth * 0.3, 0), bar.clientWidth - bubbleWidth)
            const tail = Math.min(Math.max(head - left, 18), bubbleWidth - 18)
            bubble.style.transform = `translate3d(${left}px, 0, 0)`
            bubble.style.setProperty("--mb-tail", `${tail}px`)
            setBubble(introDone && !overlapsPills(left, bubbleWidth))
        }

        // True when the bubble (at `left`) would cover any of the service pills
        const overlapsPills = (left, bubbleWidth) => {
            const barRect = bar.getBoundingClientRect()
            const b = bubble.getBoundingClientRect()
            const bubbleLeft = barRect.left + left
            const bubbleRight = bubbleLeft + bubbleWidth
            const pills = bar.parentElement.querySelectorAll(".mb-hero__tags li")
            for (const pill of pills) {
                const p = pill.getBoundingClientRect()
                if (
                    bubbleLeft < p.right + PILL_CLEARANCE &&
                    bubbleRight > p.left - PILL_CLEARANCE &&
                    b.top < p.bottom + PILL_CLEARANCE &&
                    b.bottom > p.top - PILL_CLEARANCE
                )
                    return true
            }
            return false
        }

        const setBubble = (show) => {
            if (show === bubbleShown) return
            bubbleShown = show
            bubble.classList.toggle("is-visible", show)
            if (show) pop()
            // Queue the next fact for the next time it appears (after the CSS fade-out)
            else window.setTimeout(() => !bubbleShown && nextMessage(), 450)
        }

        const pop = () => {
            bubble.classList.remove("is-pop")
            void bubble.offsetWidth // restart the animation
            bubble.classList.add("is-pop")
        }

        const tick = (now) => {
            const dt = Math.min(now - last, 64)
            last = now
            if (!hovering && onScreen) {
                if (!walking && now >= resumeAt) walking = true
                if (walking) {
                    const move = (SPEED * dt) / 1000
                    x += dir * move
                    travelled += move
                    if (x >= max || x <= min) {
                        x = Math.min(Math.max(x, min), max)
                        walking = false
                        resumeAt = now + PAUSE_MS
                        dir = -dir
                        face.classList.toggle("is-left", dir < 0)
                        if (bubbleShown) {
                            nextMessage()
                            pop()
                        }
                    }
                }
            } else if (hovering) {
                walking = false
                resumeAt = Math.max(resumeAt, now + 600)
            }
            place()
            frame = requestAnimationFrame(tick)
        }

        measure()
        x = min
        place()

        const showBubble = window.setTimeout(
            () => {
                introDone = true
                place()
            },
            reduceMotion ? 0 : 1900,
        )

        const onEnter = () => (hovering = true)
        const onLeave = () => (hovering = false)
        beaver.addEventListener("pointerenter", onEnter)
        beaver.addEventListener("pointerleave", onLeave)

        const resizeObserver = new ResizeObserver(() => {
            measure()
            place()
        })
        resizeObserver.observe(bar)

        const visibility = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting))
        visibility.observe(bar)

        if (!reduceMotion) frame = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(frame)
            window.clearTimeout(showBubble)
            beaver.removeEventListener("pointerenter", onEnter)
            beaver.removeEventListener("pointerleave", onLeave)
            resizeObserver.disconnect()
            visibility.disconnect()
        }
    }, [])

    return (
        <>
            <div className="mb-beaver-bubble" ref={bubbleRef} aria-hidden="true">
                <span className="mb-beaver-bubble__inner">
                    <span className="mb-beaver-bubble__tag" ref={tagRef}>
                        {GREETING.tag}
                    </span>
                    <span className="mb-beaver-bubble__text" ref={textRef}>
                        {GREETING.text}
                    </span>
                </span>
            </div>
            <div className="mb-beaver" ref={beaverRef} aria-hidden="true">
                <span className="mb-beaver__shadow"></span>
                <div className="mb-beaver__rise">
                    <div className="mb-beaver__bob">
                        <div className="mb-beaver__step" ref={stepRef}>
                            <div className="mb-beaver__face" ref={faceRef}>
                                <img
                                    className="mb-beaver__img"
                                    src="/img/beaver/beaver.webp"
                                    alt=""
                                    width="250"
                                    height="240"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
