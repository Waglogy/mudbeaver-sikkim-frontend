"use client"

import { useEffect } from "react"

// Same JavaScript libraries, in the same order, as the original EJS pages
const SCRIPTS = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",
    "/lib/wow/wow.min.js",
    "/lib/easing/easing.min.js",
    "/lib/waypoints/waypoints.min.js",
    "/lib/owlcarousel/owl.carousel.min.js",
]
const TEMPLATE_SCRIPT = "/js/main.js"

let loaded = false

// Bootstrap only auto-starts `data-*-ride="carousel"` sliders on window load,
// which may already have fired by the time these scripts run.
function startCarousels() {
    const { bootstrap, jQuery } = window
    if (bootstrap?.Carousel?.carouselInterface) {
        document.querySelectorAll('[data-bs-ride="carousel"]').forEach((el) => {
            if (!bootstrap.Carousel.getInstance(el))
                bootstrap.Carousel.carouselInterface(el)
        })
    }
    if (bootstrap?.Carousel?._jQueryInterface && jQuery) {
        jQuery('[data-ride="carousel"]').each(function () {
            const $carousel = jQuery(this)
            if (!$carousel.data("bs.carousel"))
                bootstrap.Carousel._jQueryInterface.call($carousel, $carousel.data())
        })
    }
}

export default function SiteScripts({ extra = [] }) {
    useEffect(() => {
        // Content is already rendered; external libraries must not block the page.
        document.getElementById("spinner")?.classList.remove("show")
        if (loaded) return
        loaded = true
        const scripts = [...SCRIPTS, ...extra, TEMPLATE_SCRIPT]
        scripts.forEach((src) => {
            const script = document.createElement("script")
            script.src = src
            script.async = false // execute in insertion order
            if (src === TEMPLATE_SCRIPT) {
                script.onload = () => {
                    if (document.readyState === "complete") startCarousels()
                    else window.addEventListener("load", startCarousels, { once: true })
                }
            }
            document.body.appendChild(script)
        })
    }, [extra])

    return null
}
