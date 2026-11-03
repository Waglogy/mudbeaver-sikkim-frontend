"use client"

import { useEffect } from "react"

// Why Choose Us: the beaver pops up and "says" each reason's facts the first time
// they scroll into view. Without JavaScript the facts simply stay visible.
export default function FactsReveal({ selector = ".mb-reason__facts" }) {
    useEffect(() => {
        const groups = document.querySelectorAll(selector)
        if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    entry.target.classList.replace("is-waiting", "is-in")
                    observer.unobserve(entry.target)
                }
            },
            { rootMargin: "0px 0px -15% 0px" },
        )
        groups.forEach((group) => {
            group.classList.add("is-waiting")
            observer.observe(group)
        })
        return () => observer.disconnect()
    }, [selector])

    return null
}
