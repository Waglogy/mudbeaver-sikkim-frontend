"use client"

import { useEffect } from "react"

// Adds `className` to the element matching `target` the first time it scrolls into view
export default function RevealOnScroll({ target, className = "is-in" }) {
    useEffect(() => {
        const el = document.querySelector(target)
        if (!el) return
        if (!("IntersectionObserver" in window)) {
            el.classList.add(className)
            return
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(className)
                    observer.disconnect()
                }
            },
            { rootMargin: "0px 0px -20% 0px" },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [target, className])

    return null
}
