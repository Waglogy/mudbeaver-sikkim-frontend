const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000"

// Server-side GET against the Express API; returns `fallback` if the API is unreachable
export async function getFromApi(path, fallback) {
    try {
        const res = await fetch(`${BACKEND_URL}/api${path}`, {
            cache: "no-store",
        })
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        return await res.json()
    } catch (error) {
        console.error(`GET /api${path} failed:`, error.message)
        return fallback
    }
}
