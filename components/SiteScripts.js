"use client"

import { useEffect } from "react"

// Small replacement for the old template scripts (jQuery, Bootstrap JS, WOW, easing,
// waypoints, Owl Carousel and main.js). The redesigned site only needs two things:
// hide the loading spinner, and show/handle the back-to-top button.

const SHOW_AFTER = 600 // px scrolled before the back-to-top button appears

export default function SiteScripts() {
    useEffect(() => {
        document.getElementById("spinner")?.classList.remove("show")

        const buttons = () => document.querySelectorAll(".back-to-top")
        let frame = 0
        const update = () => {
            frame = 0
            const visible = window.scrollY > SHOW_AFTER
            buttons().forEach((b) => b.classList.toggle("is-visible", visible))
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }
        const onClick = (event) => {
            const button = event.target.closest(".back-to-top")
            if (!button) return
            event.preventDefault()
            const smooth = !window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches
            window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" })
        }

        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        document.addEventListener("click", onClick)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("scroll", onScroll)
            document.removeEventListener("click", onClick)
        }
    }, [])

    return null
}
