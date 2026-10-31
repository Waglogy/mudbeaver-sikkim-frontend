import ApiForm from "@/components/ApiForm"
import { SERVICES } from "@/lib/services"
export default function InquiryForm({ service = false }) {
    const prefix = service ? "service" : "contact"
    return <ApiForm action={service ? "/services" : "/contact"} className="mb-inquiry">
        <div className="mb-inquiry__grid">
            <label htmlFor={`${prefix}-name`}>Your name<input id={`${prefix}-name`} name="name" type="text" autoComplete="name" placeholder="Full name" required maxLength={120} /></label>
            <label htmlFor={`${prefix}-email`}>Email address<input id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
            {service ? <><label htmlFor="service-phone">Mobile number<input id="service-phone" name="mobile" type="tel" autoComplete="tel" placeholder="Your phone number" pattern="[0-9]{7,15}" title="Enter 7 to 15 digits, without spaces or symbols." required /></label><label htmlFor="service-type">Service<select id="service-type" name="service_type" defaultValue="" required><option value="" disabled>Choose a service</option>{SERVICES.map(item => <option key={item.title}>{item.title}</option>)}<option>Other enquiry</option></select></label></> : <label className="mb-inquiry__wide" htmlFor="contact-subject">Subject<input id="contact-subject" name="subject" placeholder="What would you like to talk about?" required maxLength={200} /></label>}
            <label className="mb-inquiry__wide" htmlFor={`${prefix}-message`}>Your message<textarea id={`${prefix}-message`} name="message" placeholder="Tell us about your ideas, location, or questions…" rows={5} required maxLength={5000} /></label>
        </div><button className="mb-btn mb-btn--primary" type="submit">{service ? "Send project enquiry" : "Send message"}<i className="bi bi-arrow-up-right" aria-hidden="true"></i></button>
    </ApiForm>
}
