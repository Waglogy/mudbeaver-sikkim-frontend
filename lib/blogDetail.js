import { cache } from "react"
import { notFound } from "next/navigation"
import { blogId } from "@/lib/blogUrls"
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000"
export const getBlog = cache(async slug => {
    const id = blogId(slug)
    if (!id) notFound()
    const response = await fetch(`${BACKEND_URL}/api/blogs/${id}`, { cache: "no-store", signal: AbortSignal.timeout(10000) })
    if (response.status === 404 || response.status === 400) notFound()
    if (!response.ok) throw new Error("The journal is temporarily unavailable.")
    return response.json()
})
