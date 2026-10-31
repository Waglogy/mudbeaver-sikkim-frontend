"use client"

import { useState } from "react"

// <form> that submits to the Express API via fetch instead of a full page post.
// Optional onResult(ok, message) is called after each submit attempt.
export default function ApiForm({
    action,
    method = "post",
    encType,
    onResult,
    children,
    ...props
}) {
    const [message, setMessage] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        if (submitting) return
        const form = event.currentTarget
        const data = new FormData(form)
        setSubmitting(true)
        try {
            const res = await fetch(`/api${action}`, {
                method: method.toUpperCase(),
                body:
                    encType === "multipart/form-data"
                        ? data
                        : new URLSearchParams(data),
            })
            const json = await res.json().catch(() => ({}))
            const text =
                json.message || (res.ok ? "Successful" : "Something broke!")
            setMessage(text)
            if (res.ok) form.reset()
            onResult?.(res.ok, text)
        } catch {
            const text = "Unable to reach the server. Please try again later."
            setMessage(text)
            onResult?.(false, text)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form
            action={`/api${action}`}
            method={method}
            encType={encType}
            onSubmit={handleSubmit}
            aria-busy={submitting}
            {...props}
        >
            <fieldset className="mb-api-fields" disabled={submitting}>{children}</fieldset>
            {submitting && <p className="mt-3 mb-0" role="status">Sending your details…</p>}
            {message && (
                <p className="mt-3 mb-0" role="status">
                    {message}
                </p>
            )}
        </form>
    )
}
