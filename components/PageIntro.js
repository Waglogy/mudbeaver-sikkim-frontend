export default function PageIntro({ eyebrow, title, accent, description, image, imageAlt, action, actionLabel }) {
    return <header className={`mb-page-intro${image ? " mb-page-intro--photo" : ""}`}>
        <div className="mb-container mb-page-intro__layout">
            <div><nav className="mb-page-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{eyebrow}</span></nav><p className="mb-section-eyebrow">{eyebrow}</p><h1>{title} <span>{accent}</span></h1><p className="mb-page-intro__lead">{description}</p>{action && <a className="mb-btn mb-btn--primary" href={action}>{actionLabel}<i className="bi bi-arrow-down-right" aria-hidden="true"></i></a>}</div>
            {image && <figure className="mb-page-intro__photo"><img src={image} alt={imageAlt} fetchPriority="high" /><figcaption>ROOTED IN SIKKIM. INSPIRED BY NATURE.</figcaption></figure>}
        </div>
    </header>
}
