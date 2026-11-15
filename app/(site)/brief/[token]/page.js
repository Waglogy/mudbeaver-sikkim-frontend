import RequirementsForm from "@/components/RequirementsForm"
import PageEnd from "@/components/PageEnd"
import { getFromApi } from "@/lib/api"

// Private project brief for a converted client; the link is shared from the admin workspace
export const metadata = { title: "Your project brief | Mud Beavers Sikkim", robots: { index: false, follow: false } }
export const dynamic = "force-dynamic"

function Notice({ title, children }) {
    return <div className="mb-intern-closed"><img className="mb-intern-closed__beaver" src="/img/beaver/beaver-builder.webp" alt="" width="144" height="240" /><p className="mb-section-eyebrow">PROJECT BRIEF</p><h2>{title}</h2><p>{children}</p><div className="mb-intern-closed__actions"><a className="mb-btn mb-btn--primary" href="/contact">Contact us <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></div></div>
}

export default async function BriefPage({ params }) {
    const { token } = await params
    const brief = /^[A-Za-z0-9_-]{24}$/.test(token) ? await getFromApi(`/client-briefs/${token}`, null) : null
    const firstName = brief?.name.split(/\s+/)[0]
    return <>
        <section className="mb-page-section mb-page-section--soft mb-brief"><div className="mb-container">
            {!brief ? <Notice title="This link isn't working.">The link may be mistyped or no longer active. Please get in touch and we&apos;ll send you a new one.</Notice>
                : brief.status === "submitted" ? <Notice title={`Thank you, ${firstName}!`}>We&apos;ve received your project brief. If you need to change anything, contact us and we&apos;ll reopen it for you.</Notice>
                : <div className="mb-modal__panel mb-brief__panel"><RequirementsForm action={`/client-briefs/${token}`} heading={`Welcome aboard, ${firstName}! Tell us about your project.`} client={{ name: brief.name, email: brief.email, phone: brief.phone.replace(/\D/g, "") }} /></div>}
        </div></section>
        <PageEnd />
    </>
}
