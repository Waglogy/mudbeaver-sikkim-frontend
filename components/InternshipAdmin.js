"use client"

import { useEffect, useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"
import InternshipApplications from "@/components/InternshipApplications"
import { BACKGROUNDS, FEE_INCLUDES } from "@/components/InternshipBackground"

// Admin: open or close internship applications, and review the applications received
export default function InternshipAdmin({ onUnauthorized }) {
    const [open, setOpen] = useState(null)
    const [fees, setFees] = useState(null)
    const [busy, setBusy] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        let active = true
        fetch("/api/settings/internship", { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                if (!active) return
                setOpen(data.open === true)
                setFees(data.fees || null)
            })
            .catch(
                () =>
                    active && setError("Could not load the internship status."),
            )
        return () => {
            active = false
        }
    }, [])

    async function change(next) {
        setBusy(true)
        setError("")
        setMessage("")
        try {
            const data = await request("/settings/internship", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ open: next }),
            })
            setOpen(data.open)
            setMessage(
                data.open
                    ? "Internship applications are now open. The form is live on the Internship page."
                    : "Internship applications are now closed. Visitors see that there is no internship at the moment.",
            )
        } catch (error) {
            setError(error.message)
            if (error.status === 401) onUnauthorized?.(error)
        } finally {
            setBusy(false)
        }
    }

    async function saveFees(event) {
        event.preventDefault()
        setBusy(true)
        setError("")
        setMessage("")
        try {
            const data = await request("/settings/internship-fees", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    Object.fromEntries(
                        Object.entries(fees).map(([key, value]) => [key, Number(value)]),
                    ),
                ),
            })
            setFees(data.fees)
            setMessage("Training fees saved. New applicants pay the updated amount.")
        } catch (error) {
            setError(error.message)
            if (error.status === 401) onUnauthorized?.(error)
        } finally {
            setBusy(false)
        }
    }

    return (
        <>
            <div className="mb-admin__intro">
                <div>
                    <p className="mb-admin__eyebrow">TRAINING CUM INTERNSHIP</p>
                    <h1>Internship applications.</h1>
                    <p>
                        Choose whether visitors can apply, and review the
                        applications you receive. When closed, the form is
                        hidden and the page explains that there is no internship
                        at the moment.
                    </p>
                </div>
                <a
                    className="mb-admin__secondary mb-admin__link"
                    href="/internship#apply"
                    target="_blank"
                    rel="noreferrer"
                >
                    View page ↗
                </a>
            </div>
            {message && (
                <p className="mb-admin__success" role="status">
                    {message}
                </p>
            )}
            {error && (
                <p className="mb-admin__error" role="alert">
                    {error}
                </p>
            )}
            <section
                className="mb-admin__setting"
                aria-labelledby="internship-status"
            >
                {open === null && !error ? (
                    <p role="status">Loading…</p>
                ) : (
                    <>
                        <div>
                            <h2 id="internship-status">
                                Applications are{" "}
                                <span
                                    className={open ? "is-open" : "is-closed"}
                                >
                                    {open ? "open" : "closed"}
                                </span>
                            </h2>
                            <p>
                                {open
                                    ? "The application form is visible and accepting submissions."
                                    : "The form is hidden and new applications are refused."}
                            </p>
                        </div>
                        <label className="mb-admin__switch">
                            <input
                                type="checkbox"
                                role="switch"
                                checked={open === true}
                                disabled={busy || open === null}
                                onChange={(event) =>
                                    change(event.target.checked)
                                }
                            />
                            <span aria-hidden="true"></span>
                            {busy ? "Saving…" : open ? "Open" : "Closed"}
                        </label>
                    </>
                )}
            </section>
            {fees && (
                <form
                    className="mb-admin__setting mb-admin__fees"
                    aria-labelledby="internship-fees"
                    onSubmit={saveFees}
                >
                    <div>
                        <h2 id="internship-fees">Training fees</h2>
                        <p>
                            Applicants pay this amount through Razorpay,
                            based on their background.
                        </p>
                    </div>
                    <div className="mb-admin__fee-fields">
                        {BACKGROUNDS.map(({ value, label }) => (
                            <label key={value}>
                                {label}
                                <span className="mb-admin__fee-input">
                                    ₹
                                    <input
                                        type="number"
                                        min="1"
                                        max="500000"
                                        step="1"
                                        required
                                        value={fees[value] ?? ""}
                                        onChange={(event) =>
                                            setFees({
                                                ...fees,
                                                [value]: event.target.value,
                                            })
                                        }
                                    />
                                </span>
                                <small>Includes: {FEE_INCLUDES[value]}</small>
                            </label>
                        ))}
                        <button type="submit" disabled={busy}>
                            {busy ? "Saving…" : "Save fees"}
                        </button>
                    </div>
                </form>
            )}
            <InternshipApplications onUnauthorized={onUnauthorized} />
        </>
    )
}
