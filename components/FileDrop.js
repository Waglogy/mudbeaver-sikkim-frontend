"use client"

import { useEffect, useRef, useState } from "react"

// Styled file picker that shows the chosen file name
export default function FileDrop({ id, accept, labelledBy }) {
    const inputRef = useRef(null)
    const [fileName, setFileName] = useState("")

    // Clear the shown name when the form is reset after a successful submit
    useEffect(() => {
        const form = inputRef.current?.form
        if (!form) return
        const onReset = () => setFileName("")
        form.addEventListener("reset", onReset)
        return () => form.removeEventListener("reset", onReset)
    }, [])

    return (
        <label className={`mb-drop${fileName ? " has-file" : ""}`} htmlFor={id}>
            <input
                ref={inputRef}
                id={id}
                type="file"
                accept={accept}
                className="mb-drop__input"
                aria-labelledby={labelledBy}
                onChange={(event) =>
                    setFileName(event.target.files?.[0]?.name || "")
                }
            />
            <span className="mb-drop__icon" aria-hidden="true">
                <i
                    className={`fas ${fileName ? "fa-file-pdf" : "fa-cloud-upload-alt"}`}
                ></i>
            </span>
            <span className="mb-drop__text">
                <strong>{fileName || "Choose a PDF file"}</strong>
                <small>{fileName ? "Click to change" : "PDF only"}</small>
            </span>
        </label>
    )
}
