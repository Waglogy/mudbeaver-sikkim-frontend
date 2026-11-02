import { absoluteUrl } from "@/lib/seo"
import { blogPath } from "@/lib/blogUrls"
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000"
export const dynamic = "force-dynamic"
export default async function sitemap() {
    // Fail visibly on an API outage rather than serving an incomplete blog sitemap.
    const response = await fetch(`${BACKEND_URL}/api/blogs`, { cache: "no-store", signal: AbortSignal.timeout(10000) })
    if (!response.ok) throw new Error("Unable to load journal sitemap")
    const posts = await response.json()
    const pages = ["/", "/about", "/why-choose-us", "/services", "/teams", "/techniques", "/internship", "/contact", "/blog"].map(path => ({ url: absoluteUrl(path) }))
    return [...pages, ...posts.map(post => ({ url: absoluteUrl(blogPath(post)), lastModified: post.updated_at || post.created_at, ...(post.image.length ? { images: post.image.map(absoluteUrl) } : {}) }))]
}
