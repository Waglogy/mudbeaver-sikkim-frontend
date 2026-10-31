"use client"
import { blogPath } from "@/lib/blogUrls"
import { useEffect, useRef, useState } from "react"
import { adminRequest as request } from "@/lib/adminApi"

function NewPhoto({ file, onRemove, disabled }) {
    const [url, setUrl] = useState("")
    useEffect(() => { const value = URL.createObjectURL(file); setUrl(value); return () => URL.revokeObjectURL(value) }, [file])
    return <div className="mb-admin__photo"><img src={url} alt={file.name} /><span>{file.name}</span><button type="button" className="mb-admin__secondary" onClick={onRemove} disabled={disabled}>Remove<span className="mb-admin__sr"> {file.name}</span></button></div>
}
export default function BlogAdmin({ onUnauthorized, onBusyChange }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [draft, setDraft] = useState(null)
    const [photos, setPhotos] = useState([])
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [deleting, setDeleting] = useState(null)
    const editor = useRef(null)
    useEffect(() => { load() }, [])
    useEffect(() => { onBusyChange(busy); return () => onBusyChange(false) }, [busy, onBusyChange])
    useEffect(() => { if (draft) editor.current?.focus() }, [draft?.id, draft !== null])
    function fail(error) { setError(error.message); if (error.status === 401) onUnauthorized(error) }
    async function load() {
        setLoading(true)
        try { setPosts(await request("/blogs")) } catch (error) { fail(error) } finally { setLoading(false) }
    }
    function edit(post) {
        setDraft(post ? { ...post, image: [...post.image] } : { title: "", content: "", seo_title: "", seo_description: "", image: [] })
        setPhotos([]); setError(""); setMessage(""); setDeleting(null)
    }
    function addPhotos(event) {
        const selected = [...(event.target.files || [])]
        event.target.value = ""
        if (draft.image.length + photos.length + selected.length > 5) { setError("Each article can have up to five photos. Remove a photo to add another."); return }
        if (selected.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 8 * 1024 * 1024)) { setError("Choose JPG, PNG, or WebP photos up to 8 MB each."); return }
        setPhotos(value => [...value, ...selected]); setError("")
    }
    async function save(event) {
        event.preventDefault(); setBusy(true); setError(""); setMessage("")
        const body = new FormData()
        body.set("seo_title", draft.seo_title || ""); body.set("seo_description", draft.seo_description || ""); body.set("title", draft.title); body.set("content", draft.content); body.set("retained_images", JSON.stringify(draft.image))
        photos.forEach(file => body.append("images", file))
        try {
            await request(draft.id ? `/blogs/${draft.id}` : "/blogs", { method: draft.id ? "PUT" : "POST", body })
            setDraft(null); setPhotos([]); setMessage("Article saved. It’s now available in the website journal."); await load()
        } catch (error) { fail(error) } finally { setBusy(false) }
    }
    async function remove(post) {
        setBusy(true); setError(""); setMessage("")
        try {
            await request(`/blogs/${post.id}`, { method: "DELETE" })
            if (draft?.id === post.id) { setDraft(null); setPhotos([]) }
            setDeleting(null); setMessage("Article and its uploaded photos deleted."); await load()
        } catch (error) { fail(error) } finally { setBusy(false) }
    }
    return <>
        <div className="mb-admin__intro"><div><p className="mb-admin__eyebrow">STORIES FROM THE GROUND UP</p><h1>Your journal.</h1><p>Share ideas, updates, and stories with up to five optional photos.</p></div><button disabled={busy} onClick={() => edit(null)}>+ Add blog article</button></div>
        {message && <p className="mb-admin__success" role="status">{message}</p>}{error && <p className="mb-admin__error" role="alert">{error} <button className="mb-admin__secondary" disabled={busy || loading} onClick={load}>Refresh list</button></p>}
        {draft && <section className="mb-admin__editor" aria-labelledby="blog-editor-title"><h2 id="blog-editor-title" ref={editor} tabIndex={-1}>{draft.id ? "Edit your article" : "A story worth sharing."}</h2><form onSubmit={save}><fieldset disabled={busy}><div className="mb-admin__fields"><label className="mb-admin__wide">Article title<input name="title" value={draft.title} required maxLength={200} onChange={event => setDraft(value => ({ ...value, title: event.target.value }))} placeholder="Give your story a title" /></label><label className="mb-admin__wide">Article content<textarea name="content" value={draft.content} required maxLength={30000} rows={12} onChange={event => setDraft(value => ({ ...value, content: event.target.value }))} placeholder="Write your article. Separate paragraphs with blank lines. For a section heading, write ## followed by a space and the heading on its own paragraph." /><small>{draft.content.length.toLocaleString()} / 30,000 characters</small></label><details className="mb-admin__wide mb-admin__seo"><summary>Search appearance (optional)</summary><p>Use a clear title and summary that accurately describe this article. Leave blank to use the article title and opening text.</p><label>Search title<input name="seo_title" value={draft.seo_title || ""} maxLength={120} onChange={event => setDraft(value => ({ ...value, seo_title: event.target.value }))} placeholder={draft.title} /><small>Aim for a concise title, usually around 50–60 characters.</small></label><label>Search description<textarea name="seo_description" value={draft.seo_description || ""} rows={3} maxLength={200} onChange={event => setDraft(value => ({ ...value, seo_description: event.target.value }))} placeholder="A useful summary of what readers will learn" /><small>Aim for around 140–160 characters. Search engines may show different text.</small></label><small>Strengthen the article with firsthand insights, real project photographs, and helpful sections. Avoid repeating keywords unnaturally.</small></details><div className="mb-admin__wide"><label>Photos · {draft.image.length + photos.length} / 5<input type="file" name="images" accept="image/jpeg,image/png,image/webp" multiple onChange={addPhotos} disabled={draft.image.length + photos.length >= 5} /><small>Optional. JPG, PNG, or WebP, up to 8 MB each. The first photo is your cover. Photos are saved as WebP.</small></label><div className="mb-admin__photos">{draft.image.map((url, index) => <div className="mb-admin__photo" key={url}><img src={url} alt={`Article photo ${index + 1}`} /><span>{index === 0 ? "Cover photo" : `Photo ${index + 1}`}</span><div>{index > 0 && <button type="button" className="mb-admin__secondary" onClick={() => setDraft(value => ({ ...value, image: [url, ...value.image.filter(image => image !== url)] }))}>Make cover</button>}<button type="button" className="mb-admin__secondary" onClick={() => setDraft(value => ({ ...value, image: value.image.filter(image => image !== url) }))}>Remove<span className="mb-admin__sr"> photo {index + 1}</span></button></div></div>)}{photos.map((file, index) => <NewPhoto key={`${file.name}-${file.lastModified}-${index}`} file={file} disabled={busy} onRemove={() => setPhotos(value => value.filter((_, position) => position !== index))} />)}</div></div></div><p className="mb-admin__publish-note">Saving makes this article visible on the public Blog page.</p><div className="mb-admin__actions"><button type="submit">{busy ? "Saving article…" : "Save & publish"}</button><button type="button" className="mb-admin__secondary" onClick={() => { setDraft(null); setPhotos([]); setError("") }}>Cancel</button></div></fieldset></form></section>}
        <section className="mb-admin__list" aria-label="Blog articles">{loading ? <p role="status">Loading your journal…</p> : !posts.length ? <div className="mb-admin__empty"><h2>Every story begins somewhere.</h2><p>Add your first article, with or without photos.</p></div> : posts.map(post => <article className="mb-admin__member mb-admin__blog" key={post.id}>{post.image[0] ? <img src={post.image[0]} alt="" /> : <div className="mb-admin__blog-placeholder" aria-hidden="true">✦</div>}<div className="mb-admin__member-info"><h2><a href={blogPath(post)} target="_blank" rel="noreferrer">{post.title} ↗</a></h2><p className="mb-admin__excerpt">{post.content}</p><small>{post.image.length} / 5 photos · Published {new Date(post.created_at).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</small></div><div className="mb-admin__actions">{deleting === post.id ? <div className="mb-admin__confirm" role="group" aria-label={`Confirm deletion of ${post.title}`}><p>Delete this article and its photos?</p><button disabled={busy} className="mb-admin__danger" onClick={() => remove(post)}>Yes, delete</button><button disabled={busy} className="mb-admin__secondary" onClick={() => setDeleting(null)}>Keep article</button></div> : <><button disabled={busy} className="mb-admin__secondary" onClick={() => edit(post)}>Edit<span className="mb-admin__sr"> {post.title}</span></button><button disabled={busy} className="mb-admin__delete" onClick={() => setDeleting(post.id)}>Delete<span className="mb-admin__sr"> {post.title}</span></button></>}</div></article>)}</section>
    </>
}
