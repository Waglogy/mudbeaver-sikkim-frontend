export async function adminRequest(path, options = {}) {
    const response = await fetch(`/api/admin${path}`, { ...options, credentials: "same-origin", cache: "no-store", headers: { "X-Admin-Request": "1", ...options.headers } })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw Object.assign(new Error(data.message || "The request failed. Please try again."), { status: response.status })
    return data
}
