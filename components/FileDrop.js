"use client"

import { useEffect, useRef, useState } from "react"

const MAX_BYTES = 10 * 1024 * 1024
const isImage = (file) => file.type.startsWith("image/")

// Styled multi-file picker: shows a thumbnail (or PDF/DWG icon) per chosen file,
// each removable. The real <input type="file"> holds the chosen files, so the
// form's FormData sends them without any extra wiring.
export default function FileDrop({
    id,
    name,
    accept,
    labelledBy,
    max = 1,
    title = "Choose files",
    hint,
}) {
    const inputRef = useRef(null)
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [error, setError] = useState("")

    // Object URLs for image thumbnails, released when the list changes
    useEffect(() => {
        const urls = files.map((file) =>
            isImage(file) ? URL.createObjectURL(file) : null,
        )
        setPreviews(urls)
        return () => urls.forEach((url) => url && URL.revokeObjectURL(url))
    }, [files])

    // Clear the list when the form is reset after a successful submit
    useEffect(() => {
        const form = inputRef.current?.form
        if (!form) return
        const onReset = () => {
            setFiles([])
            setError("")
        }
        form.addEventListener("reset", onReset)
        return () => form.removeEventListener("reset", onReset)
    }, [])

    // Write the list back into the input so it is what the form submits
    const commit = (list) => {
        const transfer = new DataTransfer()
        list.forEach((file) => transfer.items.add(file))
        inputRef.current.files = transfer.files
        setFiles(list)
    }

    const onChange = (event) => {
        const added = Array.from(event.target.files || [])
        // The input only holds the new pick, so add it to the files already chosen
        const kept = files.filter(
            (file) =>
                !added.some(
                    (a) => a.name === file.name && a.size === file.size,
                ),
        )
        const tooBig = added.filter((file) => file.size > MAX_BYTES)
        let list = [...kept, ...added.filter((file) => file.size <= MAX_BYTES)]
        let message = tooBig.length
            ? `Over 10 MB, not added: ${tooBig.map((file) => file.name).join(", ")}`
            : ""
        if (list.length > max) {
            list = list.slice(0, max)
            message = `You can add up to ${max} files here.`
        }
        setError(message)
        commit(list)
    }

    const remove = (index) => {
        setError("")
        commit(files.filter((_, i) => i !== index))
        inputRef.current.focus()
    }

    const full = files.length >= max

    return (
        <div className="mb-upload">
            <label
                className={`mb-drop${files.length ? " has-file" : ""}${full ? " is-full" : ""}`}
                htmlFor={id}
                // A disabled input would drop its files from the submit, so block the picker instead
                onClick={(event) => full && event.preventDefault()}
            >
                <input
                    ref={inputRef}
                    id={id}
                    name={name}
                    type="file"
                    accept={accept}
                    multiple={max > 1}
                    className="mb-drop__input"
                    aria-labelledby={labelledBy}
                    aria-describedby={`${id}-status`}
                    onChange={onChange}
                />
                <span className="mb-drop__icon" aria-hidden="true">
                    <i className="fas fa-cloud-upload-alt"></i>
                </span>
                <span className="mb-drop__text">
                    <strong>
                        {full
                            ? "Maximum reached"
                            : files.length
                              ? "Add more"
                              : title}
                    </strong>
                    <small id={`${id}-status`}>
                        {files.length
                            ? `${files.length} of ${max} added`
                            : hint}
                    </small>
                </span>
            </label>

            {files.length > 0 && (
                <ul className="mb-upload__list">
                    {files.map((file, index) => (
                        <li key={`${file.name}-${file.size}`}>
                            {previews[index] ? (
                                <img src={previews[index]} alt="" />
                            ) : (
                                <span
                                    className="mb-upload__pdf"
                                    aria-hidden="true"
                                >
                                    <i
                                        className={`fas ${/\.dwg$/i.test(file.name) ? "fa-drafting-compass" : "fa-file-pdf"}`}
                                    ></i>
                                </span>
                            )}
                            <span className="mb-upload__name">{file.name}</span>
                            <button
                                type="button"
                                className="mb-upload__remove"
                                aria-label={`Remove ${file.name}`}
                                onClick={() => remove(index)}
                            >
                                <i
                                    className="fas fa-times"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {error && (
                <p className="mb-upload__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
