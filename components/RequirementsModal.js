"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import RequirementsForm from "@/components/RequirementsForm"

// Site-wide popup holding the requirements form. Open it from anywhere with
// openRequirements(); it also opens when the page URL ends in #plan-your-project.

const OPEN_EVENT = "mb:open-requirements"
const CLOSE_MS = 220

export function openRequirements(event) {
    event?.preventDefault?.()
    window.dispatchEvent(new Event(OPEN_EVENT))
}

export default function RequirementsModal() {
    const dialogRef = useRef(null)
    const returnFocus = useRef(null)
    const closing = useRef(0)
    const submitted = useRef(false)
    // Bumped after a successful submit so the next open starts with a fresh form
    const [formKey, setFormKey] = useState(0)

    const close = useCallback(() => {
        const dialog = dialogRef.current
        if (!dialog?.open || closing.current) return
        dialog.classList.add("is-closing")
        closing.current = window.setTimeout(() => {
            dialog.classList.remove("is-closing")
            dialog.close()
            closing.current = 0
        }, CLOSE_MS)
    }, [])

    useEffect(() => {
        const dialog = dialogRef.current
        const open = () => {
            if (dialog.open) return
            returnFocus.current = document.activeElement
            dialog.showModal()
            // Start in the first field instead of the scrollable panel
            dialog
                .querySelector("input, textarea")
                ?.focus({ preventScroll: true })
            document.documentElement.classList.add("mb-modal-lock")
        }
        const onClose = () => {
            document.documentElement.classList.remove("mb-modal-lock")
            if (submitted.current) {
                submitted.current = false
                setFormKey((key) => key + 1)
            }
            returnFocus.current?.focus?.()
        }
        // Esc: play the closing animation instead of closing instantly
        const onCancel = (event) => {
            event.preventDefault()
            close()
        }
        window.addEventListener(OPEN_EVENT, open)
        dialog.addEventListener("close", onClose)
        dialog.addEventListener("cancel", onCancel)
        if (window.location.hash === "#plan-your-project") open()
        return () => {
            window.removeEventListener(OPEN_EVENT, open)
            dialog.removeEventListener("close", onClose)
            dialog.removeEventListener("cancel", onCancel)
            window.clearTimeout(closing.current)
        }
    }, [close])

    // A click on the dialog itself (not the panel) is a click on the backdrop
    const onBackdropClick = (event) => {
        if (event.target === event.currentTarget) close()
    }

    return (
        <dialog
            ref={dialogRef}
            className="mb-modal"
            aria-labelledby="mb-modal-title"
            onClick={onBackdropClick}
        >
            <div className="mb-modal__panel">
                <button
                    type="button"
                    className="mb-modal__close"
                    aria-label="Close"
                    onClick={close}
                >
                    <i className="fas fa-times" aria-hidden="true"></i>
                </button>
                <RequirementsForm
                    key={formKey}
                    onDone={() => (submitted.current = true)}
                    onClose={close}
                />
            </div>
        </dialog>
    )
}
