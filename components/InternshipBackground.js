"use client"

import { useEffect, useRef, useState } from "react"

// Values match the backend's internships.background column
export const BACKGROUNDS = [
    { value: "institute", label: "Institute" },
    { value: "professional", label: "Working professional" },
    { value: "enthusiast", label: "Natural building / sustainability enthusiast" },
]

// Background picker for the internship form. Choosing "Institute" also asks for
// the institute's name, submitted as `institution`.
export default function InternshipBackground() {
    const [choice, setChoice] = useState("")
    const ref = useRef(null)

    // ApiForm resets the form after a successful submit; hide the name box too
    useEffect(() => {
        const form = ref.current?.form
        if (!form) return
        const onReset = () => setChoice("")
        form.addEventListener("reset", onReset)
        return () => form.removeEventListener("reset", onReset)
    }, [])

    return <>
        <label htmlFor="intern-background">Which best describes you?<span className="mb-required" aria-hidden="true">*</span><select ref={ref} id="intern-background" name="background" value={choice} onChange={(event) => setChoice(event.target.value)} required><option value="" disabled>Select an option</option>{BACKGROUNDS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select></label>
        {choice === "institute" && <label htmlFor="intern-institution">Institute name<span className="mb-required" aria-hidden="true">*</span><input id="intern-institution" name="institution" type="text" placeholder="Name of your institute" autoComplete="organization" required maxLength={254} /></label>}
    </>
}
