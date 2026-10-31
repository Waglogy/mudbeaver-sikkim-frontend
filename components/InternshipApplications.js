"use client"

import { useCallback, useEffect, useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"

// Admin review list for internship applications (admin-only API)

const STATUSES = [
    { value: "new", label: "New" },
    { value: "reviewed", label: "Reviewed" },
    { value: "contacted", label: "Contacted" },
]

const dateFormat = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
})

export default function InternshipApplications({ onUnauthorized }) {
    const [items, setItems] = useState(null)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("")
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(null)

    const load = useCallback(
        async (query, filter) => {
            setError("")
            try {
                const params = new URLSearchParams()
                if (query) params.set("search", query)
                if (filter) params.set("status", filter)
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
        const timer = setTimeout(() => load(search.trim(), status), 300)
        return () => clearTimeout(timer)
    }, [search, status, load])

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

    return (
        <section className="mb-admin__apps" aria-labelledby="apps-title">
            <div className="mb-admin__apps-head">
                <div>
                    <h2 id="apps-title">Applications</h2>
                    <p>
                        {items
                            ? `${items.length} ${items.length === 1 ? "application" : "applications"}${status || search ? " found" : " received"}`
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
                            placeholder="Search name, email, phone, institution…"
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
                </div>
            </div>

            {error && (
                <p className="mb-admin__error" role="alert">
                    {error}{" "}
                    <button
                        className="mb-admin__secondary"
                        onClick={() => load(search.trim(), status)}
                    >
                        Try again
                    </button>
                </p>
            )}

            {items && !items.length && !error ? (
                <div className="mb-admin__empty">
                    <h2>
                        {search || status
                            ? "No matching applications."
                            : "No applications yet."}
                    </h2>
                    <p>
                        {search || status
                            ? "Try a different search or status."
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
                                    {item.institution} · Applied{" "}
                                    {dateFormat.format(
                                        new Date(item.created_at),
                                    )}
                                </p>
                                <dl>
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
                            <label className="mb-admin__app-status">
                                Status
                                <select
                                    value={item.status}
                                    disabled={saving === item.id}
                                    onChange={(event) =>
                                        changeStatus(item, event.target.value)
                                    }
                                >
                                    {STATUSES.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {saving === item.id && <small>Saving…</small>}
                            </label>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
