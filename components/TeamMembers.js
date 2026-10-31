"use client"

import { useEffect, useState } from "react"

export default function TeamMembers({ featured = false }) {
    const [members, setMembers] = useState(null)
    const [error, setError] = useState("")
    const [attempt, setAttempt] = useState(0)
    useEffect(() => {
        const controller = new AbortController()
        setError("")
        fetch(`/api/teams${featured ? "?featured=true" : ""}`, { signal: controller.signal, cache: "no-store" })
            .then(async response => {
                if (!response.ok) throw new Error("Unable to load our team right now.")
                const data = await response.json()
                if (!Array.isArray(data)) throw new Error("Unable to load our team right now.")
                setMembers(data)
            })
            .catch(error => { if (error.name !== "AbortError") setError("Unable to load our team right now.") })
        return () => controller.abort()
    }, [featured, attempt])
    if (error) return <div role="status" className="mb-team-status"><p>{error}</p><button className="mb-btn mb-btn--outline" onClick={() => setAttempt(value => value + 1)}>Try again</button></div>
    if (!members) return <p className="mb-team-status" role="status">Getting to know the people behind Mud Beavers…</p>
    if (!members.length) return <p className="mb-team-status">{featured ? "Meet the people behind our work on our team page." : "Our team profiles will be here soon."}</p>
    return <div className="mb-home-team__grid">{members.map((person, index) => (
        <article className="mb-person" key={person.id}>
            <div className="mb-person__portrait"><img src={person.image_url} alt={person.name} loading="lazy" /></div>
            <div className="mb-person__info"><h3>{person.name}</h3><p>{person.role}</p></div>
            {!featured && person.bio && <p className="mb-person__bio">{person.bio.replace(/\n[\t \r]*\n+/g, "\n").trim()}</p>}
        </article>
    ))}</div>
}
