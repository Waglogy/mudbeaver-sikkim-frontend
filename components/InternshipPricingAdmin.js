"use client"

import { useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"

// New categories and options get a random id; saved applications keep it even if the name changes
const newId = () => `x${Math.random().toString(36).slice(2, 10)}`

// Admin: applicant categories, fee options (e.g. with or without food & lodging)
// and the price for each pair. Applicants pick one category and one option.
export default function InternshipPricingAdmin({ pricing, onSaved, onUnauthorized }) {
    const [draft, setDraft] = useState(pricing)
    const [busy, setBusy] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const { categories, options } = draft

    const edit = (next) => {
        setDraft({ ...draft, ...next })
        setMessage("")
    }
    const editCategory = (id, change) =>
        edit({ categories: categories.map((item) => (item.id === id ? { ...item, ...change } : item)) })
    const editOption = (id, change) =>
        edit({ options: options.map((item) => (item.id === id ? { ...item, ...change } : item)) })

    function addCategory() {
        edit({ categories: [...categories, { id: newId(), label: "", ask_institution: false, prices: {} }] })
    }
    function addOption() {
        edit({ options: [...options, { id: newId(), label: "", note: "" }] })
    }

    async function save(event) {
        event.preventDefault()
        setBusy(true)
        setError("")
        setMessage("")
        try {
            const data = await request("/settings/internship-pricing", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    options,
                    categories: categories.map((item) => ({
                        ...item,
                        prices: Object.fromEntries(options.map((option) => [option.id, Number(item.prices[option.id])])),
                    })),
                }),
            })
            setDraft(data.pricing)
            onSaved?.(data.pricing)
            setMessage("Training fees saved. New applicants see the updated categories and prices.")
        } catch (error) {
            setError(error.message)
            if (error.status === 401) onUnauthorized?.(error)
        } finally {
            setBusy(false)
        }
    }

    return (
        <form
            className="mb-admin__setting mb-admin__fees"
            aria-labelledby="internship-fees"
            onSubmit={save}
        >
            <div>
                <h2 id="internship-fees">Training fees</h2>
                <p>
                    Applicants choose a category and an option, and pay the
                    matching price through Razorpay. Renaming or removing one
                    doesn&apos;t change applications already received.
                </p>
            </div>
            <div className="mb-admin__pricing">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Category</th>
                            {options.map((option, index) => (
                                <th scope="col" key={option.id}>
                                    <span className="mb-admin__pricing-option">
                                        <input
                                            aria-label={`Option ${index + 1} name`}
                                            placeholder="Option name"
                                            value={option.label}
                                            maxLength={80}
                                            required
                                            onChange={(event) => editOption(option.id, { label: event.target.value })}
                                        />
                                        <button
                                            type="button"
                                            className="mb-admin__pricing-remove"
                                            aria-label={`Remove option ${option.label || index + 1}`}
                                            disabled={options.length < 2}
                                            onClick={() => edit({ options: options.filter((item) => item.id !== option.id) })}
                                        >
                                            ×
                                        </button>
                                    </span>
                                    <input
                                        aria-label={`Option ${index + 1} description`}
                                        placeholder="Short description (optional)"
                                        value={option.note}
                                        maxLength={160}
                                        onChange={(event) => editOption(option.id, { note: event.target.value })}
                                    />
                                </th>
                            ))}
                            <th scope="col">Ask for institute / college name<small>Tick for students only</small></th>
                            <th scope="col"><span className="mb-admin__sr">Remove</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <th scope="row">
                                    <input
                                        aria-label={`Category ${index + 1} name`}
                                        placeholder="Category name"
                                        value={category.label}
                                        maxLength={120}
                                        required
                                        onChange={(event) => editCategory(category.id, { label: event.target.value })}
                                    />
                                </th>
                                {options.map((option) => (
                                    <td key={option.id}>
                                        <span className="mb-admin__fee-input">
                                            ₹
                                            <input
                                                type="number"
                                                min="1"
                                                max="500000"
                                                step="1"
                                                required
                                                aria-label={`${category.label || "Category"} · ${option.label || "option"} price`}
                                                value={category.prices[option.id] ?? ""}
                                                onChange={(event) =>
                                                    editCategory(category.id, {
                                                        prices: { ...category.prices, [option.id]: event.target.value },
                                                    })
                                                }
                                            />
                                        </span>
                                    </td>
                                ))}
                                <td>
                                    <input
                                        type="checkbox"
                                        aria-label={`${category.label || "Category"} asks for the institute name`}
                                        checked={category.ask_institution}
                                        onChange={(event) => editCategory(category.id, { ask_institution: event.target.checked })}
                                    />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="mb-admin__pricing-remove"
                                        aria-label={`Remove category ${category.label || index + 1}`}
                                        disabled={categories.length < 2}
                                        onClick={() => edit({ categories: categories.filter((item) => item.id !== category.id) })}
                                    >
                                        ×
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mb-admin__pricing-actions">
                <button type="button" className="mb-admin__secondary" onClick={addCategory} disabled={categories.length >= 20}>
                    + Add category
                </button>
                <button type="button" className="mb-admin__secondary" onClick={addOption} disabled={options.length >= 10}>
                    + Add option
                </button>
                <button type="submit" disabled={busy}>
                    {busy ? "Saving…" : "Save fees"}
                </button>
            </div>
            {message && <p className="mb-admin__success" role="status">{message}</p>}
            {error && <p className="mb-admin__error" role="alert">{error}</p>}
        </form>
    )
}
