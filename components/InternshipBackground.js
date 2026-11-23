"use client"

// Values match the backend's internships.background column
export const BACKGROUNDS = [
    { value: "institute", label: "Institute" },
    { value: "professional", label: "Working professional" },
    { value: "enthusiast", label: "Natural building / sustainability enthusiast" },
]

// What the fee covers for each background (amounts are set in the admin workspace)
export const FEE_INCLUDES = {
    institute: "Training",
    professional: "Training, accommodation and food",
    enthusiast: "Training, accommodation and food",
}

export const rupees = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`

// Background picker for the internship form. Choosing "Institute" also asks for
// the institute's name, submitted as `institution`.
export default function InternshipBackground({ value, onChange }) {
    return <>
        <label htmlFor="intern-background">Which best describes you?<span className="mb-required" aria-hidden="true">*</span><select id="intern-background" name="background" value={value} onChange={(event) => onChange(event.target.value)} required><option value="" disabled>Select an option</option>{BACKGROUNDS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select></label>
        {value === "institute" && <label htmlFor="intern-institution">Institute name<span className="mb-required" aria-hidden="true">*</span><input id="intern-institution" name="institution" type="text" placeholder="Name of your institute" autoComplete="organization" required maxLength={254} /></label>}
    </>
}
