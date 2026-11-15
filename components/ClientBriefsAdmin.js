"use client"

import { useCallback, useEffect, useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"
import { Attachments, Value, dateFormat } from "@/components/SubmissionsAdmin"

// Admin: project brief links for converted clients. Each client gets a private
// link (/brief/<token>) to the project form; their answers show up here.

const EMPTY = { name: "", email: "", phone: "", note: "" }

const ANSWERS = [
    ["Phone", "phone", "tel"],
    ["Email", "email", "mailto"],
    ["Address", "address"],
    ["Category", "category"],
    ["Site details", "site_details"],
    ["Built-up area", "area", "sqft"],
    ["Budget", "budget", "rupees"],
    ["Services", "services"],
]

const shareText = (brief, url) =>
    `Hi ${brief.name.split(/\s+/)[0]}, please fill in your project brief for Mud Beavers Sikkim here: ${url}`

function Share({ brief, onCopied }) {
    const url = `${window.location.origin}${brief.link}`
    const phone = brief.phone.replace(/\D/g, "")
    async function copy() {
        try {
            await navigator.clipboard.writeText(url)
            onCopied(`Link for ${brief.name} copied.`)
        } catch {
            onCopied("Couldn't copy automatically. Select the link and copy it.")
        }
    }
    return (
        <div className="mb-admin__share">
            <input
                readOnly
                value={url}
                aria-label={`Brief link for ${brief.name}`}
                onFocus={(event) => event.target.select()}
            />
            <button type="button" onClick={copy}>
                Copy link
            </button>
            {phone && (
                <a
                    className="mb-admin__link"
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(shareText(brief, url))}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    WhatsApp
                </a>
            )}
            {brief.email && (
                <a
                    className="mb-admin__link"
                    href={`mailto:${brief.email}?subject=${encodeURIComponent("Your project brief")}&body=${encodeURIComponent(shareText(brief, url))}`}
                >
                    Email
                </a>
            )}
        </div>
    )
}

export default function ClientBriefsAdmin({ onUnauthorized }) {
    const [briefs, setBriefs] = useState(null)
    const [draft, setDraft] = useState(null)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [deleting, setDeleting] = useState(null)

    const fail = useCallback(
        (error) => {
            setError(error.message)
            if (error.status === 401) onUnauthorized?.(error)
        },
        [onUnauthorized],
    )

    const load = useCallback(async () => {
        setError("")
        try {
            setBriefs(await request("/client-briefs"))
        } catch (error) {
            fail(error)
        }
    }, [fail])

    useEffect(() => {
        load()
    }, [load])

    // Runs one admin action; `apply` updates the list with the response
    async function run(action, apply) {
        setBusy(true)
        setError("")
        setMessage("")
        try {
            apply(await action())
        } catch (error) {
            fail(error)
        } finally {
            setBusy(false)
        }
    }

    const create = (event) => {
        event.preventDefault()
        run(
            () =>
                request("/client-briefs", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(draft),
                }),
            (brief) => {
                setBriefs((list) => [brief, ...(list || [])])
                setDraft(null)
                setMessage(
                    `Brief link for ${brief.name} is ready. Copy it below and send it to them.`,
                )
            },
        )
    }

    const reopen = (brief) =>
        run(
            () =>
                request(`/client-briefs/${brief.id}/reopen`, {
                    method: "POST",
                }),
            (updated) => {
                setBriefs((list) =>
                    list.map((row) => (row.id === updated.id ? updated : row)),
                )
                setMessage(
                    `${brief.name} can send the brief again with the same link.`,
                )
            },
        )

    const remove = (brief) =>
        run(
            () =>
                request(`/client-briefs/${brief.id}`, { method: "DELETE" }),
            () => {
                setBriefs((list) => list.filter((row) => row.id !== brief.id))
                setDeleting(null)
                setMessage(
                    `The brief for ${brief.name} was deleted and its link no longer works.`,
                )
            },
        )

    const update = (event) =>
        setDraft((value) => ({
            ...value,
            [event.target.name]: event.target.value,
        }))

    const submitted = briefs?.filter((brief) => brief.status === "submitted")

    return (
        <>
            <div className="mb-admin__intro">
                <div>
                    <p className="mb-admin__eyebrow">CONVERTED CLIENTS</p>
                    <h1>Client briefs.</h1>
                    <p>
                        Create a private project form link for a client, send
                        it to them, and read their answers, drawings and
                        photos here once they submit.
                    </p>
                </div>
                <button
                    disabled={busy}
                    onClick={() => {
                        setMessage("")
                        setDraft(EMPTY)
                    }}
                >
                    + New client brief
                </button>
            </div>

            {draft && (
                <section
                    className="mb-admin__editor"
                    aria-labelledby="brief-editor-title"
                >
                    <h2 id="brief-editor-title">New client brief</h2>
                    <form onSubmit={create}>
                        <fieldset disabled={busy}>
                            <div className="mb-admin__fields">
                                <label>
                                    Client name
                                    <input
                                        name="name"
                                        value={draft.name}
                                        onChange={update}
                                        required
                                        maxLength={120}
                                        autoFocus
                                    />
                                </label>
                                <label>
                                    Email
                                    <input
                                        name="email"
                                        type="email"
                                        value={draft.email}
                                        onChange={update}
                                        maxLength={200}
                                    />
                                </label>
                                <label>
                                    Phone (with country code for WhatsApp)
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={draft.phone}
                                        onChange={update}
                                        maxLength={20}
                                        placeholder="91 98765 43210"
                                    />
                                </label>
                                <label>
                                    Internal note
                                    <input
                                        name="note"
                                        value={draft.note}
                                        onChange={update}
                                        maxLength={500}
                                        placeholder="Only visible to admins"
                                    />
                                </label>
                            </div>
                            <div className="mb-admin__actions">
                                <button type="submit">
                                    {busy ? "Creating…" : "Create link"}
                                </button>
                                <button
                                    className="mb-admin__secondary"
                                    type="button"
                                    onClick={() => setDraft(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </section>
            )}

            <section className="mb-admin__apps" aria-labelledby="briefs-title">
                <div className="mb-admin__apps-head">
                    <div>
                        <h2 id="briefs-title">All briefs</h2>
                        <p>
                            {briefs
                                ? `${briefs.length} ${briefs.length === 1 ? "client" : "clients"} · ${submitted.length} submitted`
                                : "Loading…"}
                        </p>
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
                        <button className="mb-admin__secondary" onClick={load}>
                            Try again
                        </button>
                    </p>
                )}

                {briefs && !briefs.length && !error ? (
                    <div className="mb-admin__empty">
                        <h2>No client briefs yet.</h2>
                        <p>
                            When a client signs on, create a brief link and
                            send it to them.
                        </p>
                    </div>
                ) : (
                    <div className="mb-admin__list">
                        {briefs?.map((brief) => (
                            <article
                                key={brief.id}
                                className="mb-admin__submission"
                            >
                                <div className="mb-admin__app-top">
                                    <h3>{brief.name}</h3>
                                    <span
                                        className={`mb-admin__badge ${brief.status === "submitted" ? "is-contacted" : "is-new"}`}
                                    >
                                        {brief.status === "submitted"
                                            ? "Submitted"
                                            : brief.answers
                                              ? "Reopened"
                                              : "Waiting"}
                                    </span>
                                    <span className="mb-admin__app-meta">
                                        {brief.submitted_at
                                            ? `Submitted ${dateFormat.format(new Date(brief.submitted_at))}`
                                            : `Created ${dateFormat.format(new Date(brief.created_at))}`}
                                    </span>
                                </div>
                                {brief.note && (
                                    <p className="mb-admin__app-meta">
                                        Note: {brief.note}
                                    </p>
                                )}
                                {brief.status === "pending" && (
                                    <Share brief={brief} onCopied={setMessage} />
                                )}
                                {brief.answers && (
                                    <>
                                        <dl>
                                            {ANSWERS.map(
                                                ([label, key, type]) => (
                                                    <div key={key}>
                                                        <dt>{label}</dt>
                                                        <dd>
                                                            <Value
                                                                value={
                                                                    brief
                                                                        .answers[
                                                                        key
                                                                    ]
                                                                }
                                                                type={type}
                                                            />
                                                        </dd>
                                                    </div>
                                                ),
                                            )}
                                        </dl>
                                        <div className="mb-admin__message">
                                            <p className="mb-admin__label">
                                                Project description
                                            </p>
                                            <p>{brief.answers.message}</p>
                                        </div>
                                        <Attachments
                                            items={brief.attachments}
                                        />
                                    </>
                                )}
                                <div className="mb-admin__actions">
                                    {deleting === brief.id ? (
                                        <div
                                            className="mb-admin__confirm"
                                            role="group"
                                            aria-label={`Confirm deletion of the brief for ${brief.name}`}
                                        >
                                            <p>
                                                Delete this brief
                                                {brief.attachments?.length
                                                    ? " and its files"
                                                    : ""}
                                                ? The link will stop working.
                                            </p>
                                            <button
                                                disabled={busy}
                                                className="mb-admin__danger"
                                                onClick={() => remove(brief)}
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
                                        <>
                                            {brief.status === "submitted" && (
                                                <button
                                                    className="mb-admin__secondary"
                                                    disabled={busy}
                                                    onClick={() =>
                                                        reopen(brief)
                                                    }
                                                >
                                                    Allow resubmission
                                                </button>
                                            )}
                                            <button
                                                className="mb-admin__delete"
                                                disabled={busy}
                                                onClick={() => {
                                                    setMessage("")
                                                    setDeleting(brief.id)
                                                }}
                                            >
                                                Delete
                                                <span className="mb-admin__sr">
                                                    {" "}
                                                    brief for {brief.name}
                                                </span>
                                            </button>
                                        </>
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
