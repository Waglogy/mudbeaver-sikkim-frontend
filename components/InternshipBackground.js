"use client"

export const rupees = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`

// Category picker for the internship form. Categories (and whether they ask for
// an institute name, submitted as `institution`) are set in the admin workspace.
export default function InternshipBackground({ categories = [], value, onChange, institution }) {
    const category = categories.find((item) => item.id === value)
    return <>
        <label htmlFor="intern-background">Which best describes you?<span className="mb-required" aria-hidden="true">*</span><select id="intern-background" name="background" value={value} onChange={(event) => onChange(event.target.value)} required><option value="" disabled>Select an option</option>{categories.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}</select></label>
        {category?.ask_institution && <label htmlFor="intern-institution">Institute / college name<span className="mb-required" aria-hidden="true">*</span><input id="intern-institution" name="institution" type="text" placeholder="Name of your institute" autoComplete="organization" required maxLength={254} defaultValue={institution || ""} /></label>}
    </>
}
