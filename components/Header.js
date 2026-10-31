"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { openRequirements } from "@/components/RequirementsModal"

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/teams", label: "Our Team" },
    { href: "/services", label: "Services" },
    { href: "/internship", label: "Internship" },
    { href: "/blog", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
]

const SOCIAL_LINKS = [
    {
        href: "https://www.instagram.com/mudbeaver.sikkim/",
        icon: "fab fa-instagram",
        label: "Instagram",
    },
    {
        href: "https://www.facebook.com/profile.php?id=100094136772334&mibextid=LQQJ4d",
        icon: "fab fa-facebook-f",
        label: "Facebook",
    },
    {
        href: "https://www.linkedin.com/company/mud-beaver-sikkim/",
        icon: "fab fa-linkedin-in",
        label: "LinkedIn",
    },
    {
        href: "https://twitter.com/mudbeaversikkim?s=11",
        icon: "fab fa-twitter",
        label: "Twitter",
    },
    {
        href: "https://wa.link/lolas0/",
        icon: "fab fa-whatsapp",
        label: "WhatsApp",
    },
]

const CTA_HREF = "/#plan-your-project"

export default function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const headerRef = useRef(null)

    // On the home page the header sits transparently over the hero
    const overlay = pathname === "/"
    // Once scrolled, the bar morphs into a floating dark-glass capsule
    const floating = scrolled && !menuOpen
    const onDark = floating || (overlay && !scrolled && !menuOpen)

    useEffect(() => {
        let frame = 0
        const update = () => {
            frame = 0
            const { scrollY, innerHeight } = window
            const max = document.documentElement.scrollHeight - innerHeight
            setScrolled(scrollY > 40)
            headerRef.current?.style.setProperty(
                "--mb-scroll",
                max > 0 ? Math.min(scrollY / max, 1) : 0,
            )
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }
        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    useEffect(() => {
        if (!menuOpen) return
        const onKeyDown = (event) =>
            event.key === "Escape" && setMenuOpen(false)
        const onResize = () => window.innerWidth >= 992 && setMenuOpen(false)
        document.documentElement.classList.add("mb-scroll-lock")
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("resize", onResize)
        return () => {
            document.documentElement.classList.remove("mb-scroll-lock")
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("resize", onResize)
        }
    }, [menuOpen])

    const isActive = (href) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href)

    const classes = [
        "mb-header",
        floating && "is-floating",
        onDark && "is-on-dark",
        menuOpen && "is-open",
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <>
            <header className={classes} ref={headerRef}>
                <div className="mb-topbar">
                    <div className="mb-container mb-topbar__inner">
                        <ul className="mb-topbar__contact">
                            <li>
                                <i
                                    className="bi bi-geo-alt"
                                    aria-hidden="true"
                                ></i>
                                Jorthang Namchi Road, Sikkim
                            </li>
                            <li>
                                <a href="tel:+918927273545">
                                    <i
                                        className="bi bi-telephone"
                                        aria-hidden="true"
                                    ></i>
                                    +91 89272 73545
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@mudbeaversikkim.in">
                                    <i
                                        className="bi bi-envelope"
                                        aria-hidden="true"
                                    ></i>
                                    info@mudbeaversikkim.in
                                </a>
                            </li>
                        </ul>
                        <ul className="mb-topbar__social">
                            {SOCIAL_LINKS.map(({ href, icon, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i
                                            className={icon}
                                            aria-hidden="true"
                                        ></i>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mb-container mb-nav">
                    <a
                        href="/"
                        className="mb-brand"
                        aria-label="Mud Beaver Sikkim — home"
                    >
                        <img
                            src="/img/logo.png"
                            alt="Mud Beaver Sikkim"
                            width="500"
                            height="183"
                        />
                    </a>

                    <nav className="mb-links" aria-label="Main">
                        {NAV_LINKS.map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                className="mb-link"
                                aria-current={
                                    isActive(href) ? "page" : undefined
                                }
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="mb-actions">
                        <a
                            href={CTA_HREF}
                            className="mb-cta"
                            onClick={openRequirements}
                        >
                            Plan your project
                            <span className="mb-cta__icon" aria-hidden="true">
                                <i className="bi bi-arrow-up-right"></i>
                            </span>
                        </a>
                        <button
                            type="button"
                            className="mb-burger"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mb-menu"
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                    </div>

                    <span className="mb-progress" aria-hidden="true"></span>
                </div>

                <div id="mb-menu" className="mb-drawer" aria-hidden={!menuOpen}>
                    <nav className="mb-drawer__links" aria-label="Mobile">
                        {NAV_LINKS.map(({ href, label }, index) => (
                            <a
                                key={href}
                                href={href}
                                className="mb-drawer__link"
                                aria-current={
                                    isActive(href) ? "page" : undefined
                                }
                                tabIndex={menuOpen ? undefined : -1}
                                style={{ "--i": index }}
                                onClick={() => setMenuOpen(false)}
                            >
                                <span className="mb-drawer__index">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="mb-drawer__footer">
                        <a
                            href={CTA_HREF}
                            className="mb-cta mb-cta--block"
                            onClick={(event) => {
                                openRequirements(event)
                                setMenuOpen(false)
                            }}
                            tabIndex={menuOpen ? undefined : -1}
                        >
                            Plan your project
                            <span className="mb-cta__icon" aria-hidden="true">
                                <i className="bi bi-arrow-up-right"></i>
                            </span>
                        </a>
                        <p>
                            <a
                                href="tel:+918927273545"
                                tabIndex={menuOpen ? undefined : -1}
                            >
                                +91 89272 73545
                            </a>
                            <a
                                href="mailto:info@mudbeaversikkim.in"
                                tabIndex={menuOpen ? undefined : -1}
                            >
                                info@mudbeaversikkim.in
                            </a>
                        </p>
                    </div>
                </div>
            </header>
            {!overlay && (
                <div className="mb-header-spacer" aria-hidden="true"></div>
            )}
        </>
    )
}
