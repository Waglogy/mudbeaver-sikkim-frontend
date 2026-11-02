"use client"

import { useEffect, useRef, useState } from "react"
import BlogAdmin from "@/components/BlogAdmin"
import InternshipAdmin from "@/components/InternshipAdmin"
import SubmissionsAdmin from "@/components/SubmissionsAdmin"
import { adminRequest as request } from "@/lib/adminApi"

const EMPTY = { name: "", role: "", bio: "", sort_order: "0", featured: false }
export default function TeamAdmin() {
    const [section, setSection] = useState("teams")
    const [blogBusy, setBlogBusy] = useState(false)
    const [session, setSession] = useState(undefined)
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const [draft, setDraft] = useState(null)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState("")
    const [busy, setBusy] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [deleting, setDeleting] = useState(null)
    const editor = useRef(null)
    const loginName = useRef(null)
    useEffect(() => {
        let active = true
        request("/session").then(data => { if (active) setSession(data) }).catch(error => {
            if (active) { setSession(null); if (error.status !== 401) setError(error.message) }
        })
        return () => { active = false }
    }, [])
    useEffect(() => { if (session) loadMembers() }, [session])
    useEffect(() => {
        if (!image) { setPreview(""); return }
        const url = URL.createObjectURL(image)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [image])
    useEffect(() => { if (draft) editor.current?.focus() }, [draft?.id, draft !== null])
    function fail(error) {
        setError(error.message)
        if (error.status === 401) { setSession(null); setDraft(null); setImage(null); setMembers([]) }
    }
    async function loadMembers() {
        setLoading(true)
        try { setMembers(await request("/teams")) } catch (error) { fail(error) } finally { setLoading(false) }
    }
    async function signIn(event) {
        event.preventDefault()
        setBusy(true); setError(""); setMessage("")
        const data = new FormData(event.currentTarget)
        try {
            const session = await request("/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) })
            setSession(session)
        } catch (error) { fail(error) } finally { setBusy(false) }
    }
    async function signOut() {
        setBusy(true); setError("")
        try { await request("/logout", { method: "POST" }); setSession(null); setMembers([]); setDraft(null); setImage(null); setMessage("") }
        catch (error) { fail(error) } finally { setBusy(false) }
    }
    function edit(member) {
        setDraft(member ? { ...member, sort_order: String(member.sort_order) } : { ...EMPTY })
        setImage(null); setError(""); setMessage(""); setDeleting(null)
    }
    function chooseImage(event) {
        const file = event.target.files?.[0]
        setError("")
        if (file && (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024)) {
            setError("Choose a JPG, PNG, or WebP image up to 8 MB."); event.target.value = ""; setImage(null); return
        }
        setImage(file || null)
    }
    async function save(event) {
        event.preventDefault()
        if (!draft.id && !image) { setError("Choose a team photo."); return }
        setBusy(true); setError(""); setMessage("")
        const data = new FormData()
        for (const key of Object.keys(EMPTY)) data.set(key, String(draft[key]))
        if (image) data.set("image", image)
        try {
            await request(draft.id ? `/teams/${draft.id}` : "/teams", { method: draft.id ? "PUT" : "POST", body: data })
            setDraft(null); setImage(null); setMessage("Team member saved. Both website sections now use this update.")
            await loadMembers()
        } catch (error) { fail(error) } finally { setBusy(false) }
    }
    async function remove(member) {
        setBusy(true); setError(""); setMessage("")
        try {
            await request(`/teams/${member.id}`, { method: "DELETE" })
            setDeleting(null)
            if (draft?.id === member.id) { setDraft(null); setImage(null) }
            setMessage(`${member.name} was removed from the website.`)
            await loadMembers()
        } catch (error) { fail(error) } finally { setBusy(false) }
    }
    const update = event => setDraft(value => ({ ...value, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value }))
    if (session === undefined) return <main className="mb-admin"><p role="status">Opening your workspace…</p></main>
    if (!session) return <main className="mb-admin mb-admin--login"><div className="mb-admin__login"><a className="mb-admin__brand" href="/">MUD BEAVERS <span>SIKKIM</span></a><p className="mb-admin__eyebrow">ADMIN WORKSPACE</p><h1>Welcome back.</h1><p>Sign in to manage your team, journal, internship and enquiries.</p><form onSubmit={signIn}><label>Username<input ref={loginName} name="username" autoComplete="username" required maxLength={120} /></label><label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={256} /></label>{error && <p className="mb-admin__error" role="alert">{error}</p>}<button disabled={busy} type="submit">{busy ? "Signing in…" : "Sign in"}</button></form><a href="/">← Back to website</a></div></main>
    return <main className="mb-admin">
        <header className="mb-admin__header"><a className="mb-admin__brand" href="/">MUD BEAVERS <span>ADMIN WORKSPACE</span></a><div><a href={section === "blogs" ? "/blog" : section === "internship" ? "/internship" : section === "enquiries" ? "/" : "/teams"} target="_blank" rel="noreferrer">View website ↗</a><button className="mb-admin__secondary" disabled={busy || blogBusy} onClick={signOut}>Sign out</button></div></header>
        <nav className="mb-admin__tabs" aria-label="Admin sections"><button disabled={busy || blogBusy} aria-current={section === "teams" ? "page" : undefined} onClick={() => setSection("teams")}>Team members</button><button disabled={busy || blogBusy} aria-current={section === "blogs" ? "page" : undefined} onClick={() => setSection("blogs")}>Blog articles</button><button disabled={busy || blogBusy} aria-current={section === "internship" ? "page" : undefined} onClick={() => setSection("internship")}>Internship</button><button disabled={busy || blogBusy} aria-current={section === "enquiries" ? "page" : undefined} onClick={() => setSection("enquiries")}>Enquiries</button></nav>
        <div hidden={section !== "blogs"}><BlogAdmin onUnauthorized={fail} onBusyChange={setBlogBusy} /></div>
        {section === "internship" && <InternshipAdmin onUnauthorized={fail} />}
        {section === "enquiries" && <SubmissionsAdmin onUnauthorized={fail} />}
        <div hidden={section !== "teams"}>
        <div className="mb-admin__intro"><div><p className="mb-admin__eyebrow">THE PEOPLE BEHIND THE CRAFT</p><h1>Your team.</h1><p>Manage profiles for the team page and choose who appears on the homepage.</p></div><button disabled={busy} onClick={() => edit(null)}>+ Add team member</button></div>
        {message && <p className="mb-admin__success" role="status">{message}</p>}{error && <p className="mb-admin__error" role="alert">{error} <button disabled={busy || loading} className="mb-admin__secondary" onClick={loadMembers}>Refresh list</button></p>}
        {draft && <section className="mb-admin__editor" aria-labelledby="editor-title"><h2 id="editor-title" tabIndex={-1} ref={editor}>{draft.id ? "Edit team member" : "A new face, a shared vision."}</h2><form onSubmit={save}>
            <fieldset disabled={busy}><div className="mb-admin__fields"><label>Name<input name="name" value={draft.name} onChange={update} required maxLength={120} /></label><label>Role<input name="role" value={draft.role} onChange={update} required maxLength={160} /></label><label className="mb-admin__wide">Biography<textarea name="bio" value={draft.bio} onChange={update} rows={4} maxLength={5000} /></label><label>Display order<input name="sort_order" type="number" min="0" max="99999" step="1" required value={draft.sort_order} onChange={update} /><small>Lower numbers appear first.</small></label><label className="mb-admin__check"><input type="checkbox" name="featured" checked={draft.featured} onChange={update} />Show on homepage</label><label className="mb-admin__wide">Team photo<input key={draft.id || "new"} type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} required={!draft.id} /><small>JPG, PNG, or WebP, up to 8 MB. Saved automatically as WebP.</small></label>{(preview || draft.image_url) && <img className="mb-admin__preview" src={preview || draft.image_url} alt="Selected team portrait" />}</div><div className="mb-admin__actions"><button type="submit">{busy ? "Saving…" : "Save member"}</button><button className="mb-admin__secondary" type="button" onClick={() => { setDraft(null); setImage(null); setError("") }}>Cancel</button></div></fieldset>
        </form></section>}
        <section aria-label="Team members" className="mb-admin__list">{loading ? <p role="status">Loading team members…</p> : !members.length ? <div className="mb-admin__empty"><h2>Your next chapter starts with your team.</h2><p>Add your first member to get started.</p></div> : members.map(member => <article className="mb-admin__member" key={member.id}><img src={member.image_url} alt={member.name} /><div className="mb-admin__member-info"><h2>{member.name}</h2><p>{member.role}</p><small>Order {member.sort_order} · {member.featured ? "Homepage & team page" : "Team page"}</small></div><div className="mb-admin__actions">{deleting === member.id ? <div className="mb-admin__confirm" role="group" aria-label={`Confirm deletion of ${member.name}`}><p>Remove {member.name} and their photo?</p><button disabled={busy} className="mb-admin__danger" onClick={() => remove(member)}>Yes, delete</button><button disabled={busy} className="mb-admin__secondary" onClick={() => setDeleting(null)}>Keep member</button></div> : <><button className="mb-admin__secondary" disabled={busy} onClick={() => edit(member)}>Edit<span className="mb-admin__sr"> {member.name}</span></button><button className="mb-admin__delete" disabled={busy} onClick={() => setDeleting(member.id)}>Delete<span className="mb-admin__sr"> {member.name}</span></button></>}</div></article>)}</section>
        </div>
    </main>
}
