"use client"
import { useState } from "react"
export default function BlogGallery({ images = [], title, eager = false }) {
    const [index, setIndex] = useState(0)
    const photos = (Array.isArray(images) ? images : []).filter(image => typeof image === "string" && /^(https?:\/\/|\/(?!\/))/.test(image))
    if (!photos.length) return <div className="mb-journal__placeholder"><i className="fas fa-seedling" aria-hidden="true"></i><span>Stories from the earth.</span></div>
    return <div className="mb-blog-gallery"><img src={photos[index % photos.length]} alt={`${title} — photograph ${index + 1}`} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />{photos.length > 1 && <div className="mb-blog-gallery__controls"><button type="button" aria-label={`Previous photograph for ${title}`} onClick={() => setIndex(value => (value - 1 + photos.length) % photos.length)}><i className="bi bi-arrow-left" aria-hidden="true"></i></button><span aria-live="polite">{index + 1} / {photos.length}</span><button type="button" aria-label={`Next photograph for ${title}`} onClick={() => setIndex(value => (value + 1) % photos.length)}><i className="bi bi-arrow-right" aria-hidden="true"></i></button></div>}</div>
}
