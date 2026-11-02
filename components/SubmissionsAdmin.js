"use client"

import { useCallback, useEffect, useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"

// Admin: everything visitors send through the website forms
// (internship applications have their own tab)

const FORMS = [
    {
        key: "requirements",
        label: "Project requirements",
        source: "Plan your project form",
        fields: [
            ["Phone", "phone", "tel"],
            ["Email", "email", "mailto"],
            ["Address", "address"],
            ["Category", "category"],
            ["Site details", "site_details"],
            ["Built-up area", "area", "sqft"],
            ["Budget", "budget", "rupees"],
            ["Services", "services"],
        ],
    },
    {
        key: "appointments",
        label: "Appointments",
        source: "Home page appointment form",
        fields: [
            ["Phone", "mobile", "tel"],
            ["Email", "email", "mailto"],
            ["Service", "service_type"],
        ],
    },
    {
        key: "services",
        label: "Service requests",
        source: "Services page form",
        fields: [
            ["Phone", "mobile", "tel"],
            ["Email", "email", "mailto"],
            ["Service", "service_type"],
        ],
    },
    {
        key: "contacts",
        label: "Contact messages",
        source: "Contact page form",
        fields: [
            ["Email", "email", "mailto"],
            ["Subject", "subject"],
        ],
    },
]

const KIND_LABELS = {
    drawings: "Drawings",
    site_photos: "Site photos",
    references: "Reference images",
}

const dateFormat = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
})
const numberFormat = new Intl.NumberFormat("en-IN")

function Value({ value, type }) {
    if (!value) return "—"
    if (type === "tel") return <a href={`tel:${value}`}>{value}</a>
    if (type === "mailto") return <a href={`mailto:${value}`}>{value}</a>
    if (type === "rupees") return `₹${numberFormat.format(Number(value))}`
    if (type === "sqft") return `${numberFormat.format(Number(value))} Sq.Ft`
    return value
}

function Attachments({ items }) {
    if (!items?.length) return null
    return Object.keys(KIND_LABELS)
        .filter((kind) => items.some((item) => item.kind === kind))
        .map((kind) => (
            <div key={kind} className="mb-admin__files">
                <p>{KIND_LABELS[kind]}</p>
                <ul>
                    {items
                        .filter((item) => item.kind === kind)
                        .map((item) => (
                            <li key={item.file}>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={`Open ${item.name || "file"}`}
                                >
                                    {item.type === "pdf" ? (
                                        <span className="mb-admin__app-pdf">
                                            <i
                                                className="bi bi-file-earmark-pdf"
                                                aria-hidden="true"
                                            ></i>
                                            PDF
                                        </span>
                                    ) : (
                                        <img
                                            src={item.url}
                                            alt={item.name || KIND_LABELS[kind]}
                                            loading="lazy"
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
        ))
}

export default function SubmissionsAdmin({ onUnauthorized }) {
    const [form, setForm] = useState(FORMS[0].key)
    const [counts, setCounts] = useState({})
    const [items, setItems] = useState(null)
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [deleting, setDeleting] = useState(null)
    const [busy, setBusy] = useState(false)
    const current = FORMS.find(({ key }) => key === form)

    const fail = useCallback(
        (error) => {
            setError(error.message)
            if (error.status === 401) onUnauthorized?.(error)
        },
        [onUnauthorized],
    )

    const loadCounts = useCallback(async () => {
        try {
            setCounts(await request("/submissions"))
        } catch (error) {
            fail(error)
        }
    }, [fail])

    const load = useCallback(
        async (key, query) => {
            setError("")
            try {
                const params = query
                    ? `?${new URLSearchParams({ search: query })}`
                    : ""
                setItems(await request(`/submissions/${key}${params}`))
            } catch (error) {
                fail(error)
            }
        },
        [fail],
    )

    useEffect(() => {
        loadCounts()
    }, [loadCounts])

    // Reload when the form changes, and shortly after typing stops
    useEffect(() => {
        const timer = setTimeout(() => load(form, search.trim()), 300)
        return () => clearTimeout(timer)
    }, [form, search, load])

    function choose(key) {
        if (key === form) return
        setItems(null)
        setSearch("")
        setDeleting(null)
        setMessage("")
        setForm(key)
    }

    async function remove(item) {
        setBusy(true)
        setError("")
        setMessage("")
        try {
            await request(`/submissions/${form}/${item.id}`, {
                method: "DELETE",
            })
            setItems((list) => list.filter((row) => row.id !== item.id))
            setCounts((value) => ({
                ...value,
                [form]: Math.max(0, (value[form] || 1) - 1),
            }))
            setDeleting(null)
            setMessage(`The submission from ${item.name} was deleted.`)
        } catch (error) {
            fail(error)
        } finally {
            setBusy(false)
        }
    }

    return (
        <>
            <div className="mb-admin__intro">
                <div>
                    <p className="mb-admin__eyebrow">WEBSITE FORMS</p>
                    <h1>Enquiries.</h1>
                    <p>
                        Everything visitors send through the website forms,
                        newest first. Internship applications are under the
                        Internship tab.
                    </p>
                </div>
            </div>

            <nav className="mb-admin__forms" aria-label="Forms">
                {FORMS.map(({ key, label }) => (
                    <button
                        key={key}
                        disabled={busy}
                        aria-current={form === key ? "page" : undefined}
                        onClick={() => choose(key)}
                    >
                        {label}
                        <span className="mb-admin__count">
                            {counts[key] ?? "…"}
                        </span>
                    </button>
                ))}
            </nav>

            <section className="mb-admin__apps" aria-labelledby="subs-title">
                <div className="mb-admin__apps-head">
                    <div>
                        <h2 id="subs-title">{current.label}</h2>
                        <p>
                            {items
                                ? `${items.length} ${items.length === 1 ? "submission" : "submissions"}${search ? " found" : ""} · ${current.source}`
                                : "Loading…"}
                        </p>
                    </div>
                    <div className="mb-admin__filters">
                        <label>
                            <span className="mb-admin__sr">
                                Search {current.label.toLowerCase()}
                            </span>
                            <input
                                type="search"
                                placeholder="Search name, email, phone…"
                                value={search}
                                maxLength={120}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
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
                            onClick={() => {
                                loadCounts()
                                load(form, search.trim())
                            }}
                        >
                            Try again
                        </button>
                    </p>
                )}

                {items && !items.length && !error ? (
                    <div className="mb-admin__empty">
                        <h2>
                            {search
                                ? "No matching submissions."
                                : "Nothing here yet."}
                        </h2>
                        <p>
                            {search
                                ? "Try a different search."
                                : `New ${current.label.toLowerCase()} will appear here.`}
                        </p>
                    </div>
                ) : (
                    <div className="mb-admin__list">
                        {items?.map((item) => (
                            <article
                                key={item.id}
                                className="mb-admin__submission"
                            >
                                <div className="mb-admin__app-top">
                                    <h3>{item.name}</h3>
                                    <span className="mb-admin__app-meta">
                                        {dateFormat.format(
                                            new Date(item.created_at),
                                        )}
                                    </span>
                                </div>
                                <dl>
                                    {current.fields.map(
                                        ([label, key, type]) => (
                                            <div key={key}>
                                                <dt>{label}</dt>
                                                <dd>
                                                    <Value
                                                        value={item[key]}
                                                        type={type}
                                                    />
                                                </dd>
                                            </div>
                                        ),
                                    )}
                                </dl>
                                <div className="mb-admin__message">
                                    <p className="mb-admin__label">Message</p>
                                    <p>{item.message}</p>
                                </div>
                                <Attachments items={item.attachments} />
                                <div className="mb-admin__actions">
                                    {deleting === item.id ? (
                                        <div
                                            className="mb-admin__confirm"
                                            role="group"
                                            aria-label={`Confirm deletion of the submission from ${item.name}`}
                                        >
                                            <p>
                                                Delete this submission
                                                {item.attachments?.length
                                                    ? " and its files"
                                                    : ""}
                                                ? This cannot be undone.
                                            </p>
                                            <button
                                                disabled={busy}
                                                className="mb-admin__danger"
                                                onClick={() => remove(item)}
                                            >
                                                Yes, delete
                                            </button>
                                            <button
                                                disabled={busy}
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
                                            disabled={busy}
                                            onClick={() => {
                                                setMessage("")
                                                setDeleting(item.id)
                                            }}
                                        >
                                            Delete
                                            <span className="mb-admin__sr">
                                                {" "}
                                                submission from {item.name}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}
