"use client"

import { useCallback, useEffect, useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"
import { rupees } from "@/components/InternshipBackground"

// Admin review list for internship applications (admin-only API)

const STATUSES = [
    { value: "new", label: "New" },
    { value: "reviewed", label: "Reviewed" },
    { value: "contacted", label: "Contacted" },
]

const PAYMENTS = [
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Payment pending" },
    { value: "screenshot", label: "Screenshot (manual)" },
]

const dateFormat = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
})

export default function InternshipApplications({ categories = [], onUnauthorized }) {
    const [items, setItems] = useState(null)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("")
    const [background, setBackground] = useState("")
    const [payment, setPayment] = useState("")
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [message, setMessage] = useState("")

    const load = useCallback(
        async (query, filter, group, paid) => {
            setError("")
            try {
                const params = new URLSearchParams()
                if (query) params.set("search", query)
                if (filter) params.set("status", filter)
                if (group) params.set("background", group)
                if (paid) params.set("payment", paid)
                setItems(
                    await request(
                        `/internships${params.size ? `?${params}` : ""}`,
                    ),
                )
            } catch (error) {
                setError(error.message)
                if (error.status === 401) onUnauthorized?.(error)
            }
        },
        [onUnauthorized],
    )

    // Reload when the filter changes, and shortly after typing stops
    useEffect(() => {
        const timer = setTimeout(() => load(search.trim(), status, background, payment), 300)
        return () => clearTimeout(timer)
    }, [search, status, background, payment, load])

    async function changeStatus(item, next) {
        setSaving(item.id)
        setError("")
        try {
            await request(`/internships/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: next }),
            })
            setItems((list) =>
                list
                    .map((row) =>
                        row.id === item.id ? { ...row, status: next } : row,
                    )
                    // drop it from a filtered view it no longer matches
                    .filter((row) => !status || row.status === status),
            )
        } catch (error) {
            setError(error.message)
            if (error.status === 401) onUnauthorized?.(error)
        } finally {
            setSaving(null)
        }
    }

    async function remove(item) {
        setSaving(item.id)
        setError("")
        setMessage("")
        try {
            await request(`/internships/${item.id}`, { method: "DELETE" })
            setItems((list) => list.filter((row) => row.id !== item.id))
            setDeleting(null)
            setMessage(`${item.name}'s application was deleted.`)
        } catch (error) {
            setError(error.message)
            if (error.status === 401) onUnauthorized?.(error)
        } finally {
            setSaving(null)
        }
    }

    return (
        <section className="mb-admin__apps" aria-labelledby="apps-title">
            <div className="mb-admin__apps-head">
                <div>
                    <h2 id="apps-title">Applications</h2>
                    <p>
                        {items
                            ? `${items.length} ${items.length === 1 ? "application" : "applications"}${status || background || payment || search ? " found" : " received"}`
                            : "Loading…"}
                    </p>
                </div>
                <div className="mb-admin__filters">
                    <label>
                        <span className="mb-admin__sr">
                            Search applications
                        </span>
                        <input
                            type="search"
                            placeholder="Search name, email, phone, institute, payment ID…"
                            value={search}
                            maxLength={120}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </label>
                    <label>
                        <span className="mb-admin__sr">Filter by status</span>
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="">All statuses</option>
                            {STATUSES.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span className="mb-admin__sr">Filter by background</span>
                        <select
                            value={background}
                            onChange={(event) => setBackground(event.target.value)}
                        >
                            <option value="">All backgrounds</option>
                            {categories.map(({ id, label }) => (
                                <option key={id} value={id}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span className="mb-admin__sr">Filter by payment</span>
                        <select
                            value={payment}
                            onChange={(event) => setPayment(event.target.value)}
                        >
                            <option value="">All payments</option>
                            {PAYMENTS.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            {message && (
                <p className="mb-admin__success" role="status">
                    {message}
                </p>
            )}
            {error && (
                <p className="mb-admin__error" role="alert">
                    {error}{" "}
                    <button
                        className="mb-admin__secondary"
                        onClick={() => load(search.trim(), status, background, payment)}
                    >
                        Try again
                    </button>
                </p>
            )}

            {items && !items.length && !error ? (
                <div className="mb-admin__empty">
                    <h2>
                        {search || status || background || payment
                            ? "No matching applications."
                            : "No applications yet."}
                    </h2>
                    <p>
                        {search || status || background || payment
                            ? "Try a different search or filter."
                            : "New internship applications will appear here."}
                    </p>
                </div>
            ) : (
                <div className="mb-admin__list">
                    {items?.map((item) => (
                        <article
                            key={item.id}
                            className={`mb-admin__app is-${item.status}`}
                        >
                            {item.screenshot ? (
                                <a
                                    className="mb-admin__app-shot"
                                    href={item.screenshot}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Open payment proof"
                                >
                                    {item.screenshot_type === "pdf" ? (
                                        <span className="mb-admin__app-pdf">
                                            <i
                                                className="bi bi-file-earmark-pdf"
                                                aria-hidden="true"
                                            ></i>
                                            PDF receipt
                                        </span>
                                    ) : (
                                        <img
                                            src={item.screenshot}
                                            alt={`Payment screenshot from ${item.name}`}
                                            loading="lazy"
                                        />
                                    )}
                                </a>
                            ) : (
                                <div
                                    className={`mb-admin__app-shot mb-admin__app-paystate is-${item.payment_status}`}
                                >
                                    <span className="mb-admin__app-pdf">
                                        <i
                                            className={`bi ${item.payment_status === "paid" ? "bi-check-circle" : "bi-hourglass-split"}`}
                                            aria-hidden="true"
                                        ></i>
                                        {item.payment_status === "paid"
                                            ? "Paid online"
                                            : "Payment pending"}
                                    </span>
                                </div>
                            )}
                            <div className="mb-admin__app-body">
                                <div className="mb-admin__app-top">
                                    <h3>{item.name}</h3>
                                    <span
                                        className={`mb-admin__badge is-${item.status}`}
                                    >
                                        {
                                            STATUSES.find(
                                                (s) => s.value === item.status,
                                            )?.label
                                        }
                                    </span>
                                </div>
                                <p className="mb-admin__app-meta">
                                    {item.background_label || item.background}
                                    {item.institution &&
                                        `: ${item.institution}`}{" "}
                                    {item.fee_option_label &&
                                        `· ${item.fee_option_label} `}
                                    · Applied{" "}
                                    {dateFormat.format(
                                        new Date(item.created_at),
                                    )}
                                </p>
                                <dl>
                                    <div>
                                        <dt>Payment</dt>
                                        <dd>
                                            {item.payment_status === "paid"
                                                ? `${rupees(item.amount)} paid${item.paid_at ? ` on ${dateFormat.format(new Date(item.paid_at))}` : ""}`
                                                : item.payment_status === "pending"
                                                  ? `${rupees(item.amount)} not paid yet`
                                                  : "Screenshot uploaded (check manually)"}
                                            {item.razorpay_payment_id && (
                                                <small className="mb-admin__payid">
                                                    {item.razorpay_payment_id}
                                                </small>
                                            )}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Email</dt>
                                        <dd>
                                            <a href={`mailto:${item.email}`}>
                                                {item.email}
                                            </a>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Phone</dt>
                                        <dd>
                                            <a href={`tel:${item.phone}`}>
                                                {item.phone}
                                            </a>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Date of birth</dt>
                                        <dd>{item.date_of_birth}</dd>
                                    </div>
                                    <div>
                                        <dt>Address</dt>
                                        <dd>
                                            {item.address}, {item.city},{" "}
                                            {item.region} {item.zip_code}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="mb-admin__app-side">
                                <label className="mb-admin__app-status">
                                    Status
                                    <select
                                        value={item.status}
                                        disabled={saving === item.id}
                                        onChange={(event) =>
                                            changeStatus(
                                                item,
                                                event.target.value,
                                            )
                                        }
                                    >
                                        {STATUSES.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                    {saving === item.id && (
                                        <small>Saving…</small>
                                    )}
                                </label>
                                <div className="mb-admin__app-delete">
                                    {deleting === item.id ? (
                                        <div
                                            className="mb-admin__confirm"
                                            role="group"
                                            aria-label={`Confirm deletion of ${item.name}'s application`}
                                        >
                                            <p>
                                                Delete this application and its
                                                payment proof?
                                            </p>
                                            <button
                                                disabled={saving === item.id}
                                                className="mb-admin__danger"
                                                onClick={() => remove(item)}
                                            >
                                                Yes, delete
                                            </button>
                                            <button
                                                disabled={saving === item.id}
                                                className="mb-admin__secondary"
                                                onClick={() =>
                                                    setDeleting(null)
                                                }
                                            >
                                                Keep
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="mb-admin__delete"
                                            disabled={saving === item.id}
                                            onClick={() => setDeleting(item.id)}
                                        >
                                            Delete
                                            <span className="mb-admin__sr">
                                                {" "}
                                                {item.name}&apos;s application
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
