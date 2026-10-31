export function blogPath(post) {
    const slug = String(post.title || "article").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90).replace(/-$/, "") || "article"
    return `/blog/${slug}-${post.id}`
}
export function blogId(slug) {
    if (typeof slug !== "string" || slug.length > 110 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null
    const match = /(?:^|-)([1-9]\d{0,9})$/.exec(slug)
    return match && Number(match[1]) <= 2147483647 ? match[1] : null
}
export function articleDescription(post) {
    if (post.seo_description?.trim()) return post.seo_description.trim()
    const text = post.content.replace(/\s+/g, " ").trim()
    if (text.length <= 160) return text
    return text.slice(0, 157).replace(/\s+\S*$/, "") + "…"
}
