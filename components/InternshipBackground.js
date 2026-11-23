"use client"

import { useEffect, useRef, useState } from "react"

const INSTITUTE = "Institute"
const OPTIONS = [INSTITUTE, "Working professional", "Natural building / sustainability enthusiast"]

// Background picker for the internship form. Choosing "Institute" asks for the
// institute's name, which is what gets submitted as `institution`.
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
        <label htmlFor="intern-background">Which best describes you?<span className="mb-required" aria-hidden="true">*</span><select ref={ref} id="intern-background" value={choice} onChange={(event) => setChoice(event.target.value)} required><option value="" disabled>Select an option</option>{OPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label>
        {choice === INSTITUTE
            ? <label htmlFor="intern-institution">Institute name<span className="mb-required" aria-hidden="true">*</span><input id="intern-institution" name="institution" type="text" placeholder="Name of your institute" autoComplete="organization" required maxLength={254} /></label>
            : <input type="hidden" name="institution" value={choice} />}
    </>
}
