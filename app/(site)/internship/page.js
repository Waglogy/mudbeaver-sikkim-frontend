import PageIntro from "@/components/PageIntro"
import PageEnd from "@/components/PageEnd"
import InternshipApplication from "@/components/InternshipApplication"
import { getFromApi } from "@/lib/api"
export const metadata = { title: "Training & Internship | Mud Beavers Sikkim" }
// Open/closed is switched from the admin workspace, so render on every request
export const dynamic = "force-dynamic"
const LEARNING = [
    ["Earth as a material", "An introduction to modern earth buildings, earth materials engineering, and construction."],
    ["Methods that matter", "Explore earth-building technologies, construction techniques, and modern earth structural engineering."],
    ["Learning from practice", "Discover international case studies and applications of modern earth construction."],
    ["The bigger picture", "Study the techno-economic and environmental assessment of stabilised rammed earth (SRE) and insulated rammed earth (SIREWALL) buildings."],
]
// Programme posters pinned to the top-right corner of the application form while internships are open
const POSTERS = [
    ["/img/internship/poster-1.jpeg", "Building the Beaver Way flagship training programme, 14 Dec 2026 to 13 Jan 2027. Applications open, deadline 30 November 2026."],
    ["/img/internship/poster-2.jpeg", "Build with the Earth: introduction; materials, tools and techniques; real-setting practices; and a hands-on workshop. You take home training e-books and a completion certificate."],
]
function InternshipPosters() {
    return <div className="mb-intern-posters">{POSTERS.map(([src, alt]) => <a key={src} href={src} target="_blank" rel="noopener noreferrer" title="View full poster"><img src={src} alt={alt} width="1080" height="1350" /></a>)}</div>
}
// Shown in place of the application when an admin has closed internships
function InternshipClosed() {
    return <section id="apply" className="mb-page-section mb-page-section--soft"><div className="mb-container"><div className="mb-intern-closed"><img className="mb-intern-closed__beaver" src="/img/beaver/beaver-builder.webp" alt="" width="144" height="240" /><p className="mb-section-eyebrow">TRAINING CUM INTERNSHIP</p><h2>No internship at the moment.</h2><p>Applications for our training cum internship are currently closed. New batches open from time to time, so check back soon or get in touch to hear about the next one.</p><div className="mb-intern-closed__actions"><a className="mb-btn mb-btn--primary" href="/contact">Ask about the next batch <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a><a className="mb-intern-closed__link" href="https://www.instagram.com/mudbeaver.sikkim/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" aria-hidden="true"></i> Follow for updates</a></div></div></div></section>
}

export default async function InternshipPage() {
    // If the status can't be read, show the closed notice rather than a form that may fail
    const { open, pricing } = await getFromApi("/settings/internship", { open: false })
    return <><main>
    {/* While applications are open the page is just the form; otherwise show the programme overview */}
    {!open && <><PageIntro eyebrow="Internship" title="Get your hands into" accent="a greener future." description="Explore the science, craft, and possibilities of building with earth through our summer training and internship programme." image="/img/3.jpg" imageAlt="Natural construction details and earth-building materials" action="#apply" actionLabel={open ? "Explore the application" : "Check availability"} />
    <section className="mb-page-section"><div className="mb-container"><div className="mb-page-section__head"><div><p className="mb-section-eyebrow">LEARN WITH MUD BEAVERS</p><h2>Build your understanding.<br /><span>Find your direction.</span></h2></div><p>A closer look at natural building and sustainability, connecting materials, methods, and the world around us.</p></div><div className="mb-learning-grid">{LEARNING.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section></>}
    {open ?     <section id="apply" className="mb-page-section mb-page-section--soft"><div className="mb-container mb-intern-layout"><aside className="mb-intern-aside"><p className="mb-section-eyebrow">TAKE THE NEXT STEP</p><h1>Your next chapter<br />starts here.</h1><p>Verify your email, complete your details and pay the training fee securely online.</p><ol><li><span>01</span>Verify your email</li><li><span>02</span>Tell us about yourself</li><li><span>03</span>Pay securely with Razorpay</li></ol><a href="/contact">Have a question? Talk to us <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></aside><div className="mb-form-card mb-intern-form"><div className="mb-intern-form__head"><div><p className="mb-form-eyebrow">TRAINING CUM INTERNSHIP</p><h3>A little about you.</h3><p>All fields marked <span className="mb-required">*</span> are required.</p></div><InternshipPosters /></div><InternshipApplication pricing={pricing} /></div></div></section> : <InternshipClosed />}
</main><PageEnd /></> }
