import PageIntro from "@/components/PageIntro"
import PageEnd from "@/components/PageEnd"
import ApiForm from "@/components/ApiForm"
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
const FIELDS = [
    ["name", "Full name", "text", "Your full name", "name"],
    ["date_of_birth", "Date of birth", "date", "", "bday"],
    ["email", "Email address", "email", "you@example.com", "email"],
    ["phone", "Phone number", "tel", "Your phone number", "tel"],
    ["address", "Street address", "text", "Your address", "street-address"],
    ["city", "City / town", "text", "Your city", "address-level2"],
    ["region", "Region / state", "text", "Your region", "address-level1"],
    ["zip_code", "Postal code", "text", "737121", "postal-code"],
]
// Shown in place of the application when an admin has closed internships
function InternshipClosed() {
    return <section id="apply" className="mb-page-section mb-page-section--soft"><div className="mb-container"><div className="mb-intern-closed"><img className="mb-intern-closed__beaver" src="/img/beaver/beaver-builder.webp" alt="" width="144" height="240" /><p className="mb-section-eyebrow">TRAINING CUM INTERNSHIP</p><h2>No internship at the moment.</h2><p>Applications for our training cum internship are currently closed. New batches open from time to time, so check back soon or get in touch to hear about the next one.</p><div className="mb-intern-closed__actions"><a className="mb-btn mb-btn--primary" href="/contact">Ask about the next batch <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a><a className="mb-intern-closed__link" href="https://www.instagram.com/mudbeaver.sikkim/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" aria-hidden="true"></i> Follow for updates</a></div></div></div></section>
}

export default async function InternshipPage() {
    // If the status can't be read, show the closed notice rather than a form that may fail
    const { open } = await getFromApi("/settings/internship", { open: false })
    return <><main>
    <PageIntro eyebrow="Internship" title="Get your hands into" accent="a greener future." description="Explore the science, craft, and possibilities of building with earth through our summer training and internship programme." image="/img/3.jpg" imageAlt="Natural construction details and earth-building materials" action="#apply" actionLabel={open ? "Explore the application" : "Check availability"} />
    <section className="mb-page-section"><div className="mb-container"><div className="mb-page-section__head"><div><p className="mb-section-eyebrow">LEARN WITH MUD BEAVERS</p><h2>Build your understanding.<br /><span>Find your direction.</span></h2></div><p>A closer look at natural building and sustainability, connecting materials, methods, and the world around us.</p></div><div className="mb-learning-grid">{LEARNING.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    {open ?     <section id="apply" className="mb-page-section mb-page-section--soft"><div className="mb-container mb-intern-layout"><aside className="mb-intern-aside"><p className="mb-section-eyebrow">TAKE THE NEXT STEP</p><h2>Your next chapter<br />starts here.</h2><p>Complete your details and upload your payment screenshot to submit your application.</p><ol><li><span>01</span>Tell us about yourself</li><li><span>02</span>Add your institution</li><li><span>03</span>Upload payment confirmation</li></ol><a href="/contact">Have a question? Talk to us <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></aside><div className="mb-form-card mb-intern-form"><p className="mb-form-eyebrow">TRAINING CUM INTERNSHIP</p><h3>A little about you.</h3><p>All fields are required.</p><ApiForm action="/internship" encType="multipart/form-data" className="mb-inquiry"><fieldset><legend><span>01</span> Personal details</legend><div className="mb-inquiry__grid">{FIELDS.map(([name, label, type, placeholder, autoComplete]) => <label key={name} htmlFor={`intern-${name}`}>{label}<input id={`intern-${name}`} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required maxLength={type === "date" ? undefined : 254} pattern={name === "phone" ? "[0-9]{7,15}" : name === "zip_code" ? "[0-9]{4,10}" : undefined} title={name === "phone" ? "Enter 7 to 15 digits, without spaces or symbols." : name === "zip_code" ? "Enter a numeric postal code." : undefined} /></label>)}</div></fieldset><fieldset><legend><span>02</span> Your institution</legend><label htmlFor="intern-institution">Institution<select id="intern-institution" name="institution" defaultValue="" required><option value="" disabled>Select your institution</option><option>S.I.S.T (Sikkim Institute Of Science and Technology)</option><option>C.C.C.T (Center For Computers and Communication Technology)</option></select></label></fieldset><fieldset><legend><span>03</span> Payment confirmation</legend><div className="mb-intern-payment"><div><p>Training fee</p><strong>₹5,000</strong><p>Scan the QR code with your payment app, then attach a screenshot of your payment.</p></div><img src="/img/internship_qr.jpg" alt="Payment QR code for the internship training fee" loading="lazy" /></div><label htmlFor="intern-payment">Payment screenshot or receipt<input id="intern-payment" type="file" name="image" accept="image/png,image/jpeg,image/webp,application/pdf" required /><small>Upload a JPG, PNG or WebP screenshot, or a PDF receipt (max 10 MB).</small></label></fieldset><button className="mb-btn mb-btn--primary" type="submit">Submit application <i className="bi bi-arrow-up-right" aria-hidden="true"></i></button><p className="mb-form-note">After submission, our team will get in touch about your batch.</p></ApiForm></div></div></section> : <InternshipClosed />}
</main><PageEnd /></> }
