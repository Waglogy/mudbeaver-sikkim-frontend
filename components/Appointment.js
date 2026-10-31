import ApiForm from "@/components/ApiForm"

export default function Appointment() {
    return (
        <section id="appointment" className="mb-appointment" aria-labelledby="appointment-title">
            <div className="mb-container">
                <div className="mb-appointment__layout">
                    <div className="mb-appointment__intro">
                        <p className="mb-section-eyebrow">Appointment</p>
                        <h2 id="appointment-title">Your journey to sustainable living <span>starts here.</span></h2>
                        <p>Imagine a home that seamlessly blends with nature, responds to the climate, and exudes timeless charm. Book an appointment with Mud Beavers and take the first step towards bringing your vision to life.</p>
                        <a className="mb-appointment__contact" href="tel:+918927273545"><span className="mb-appointment__icon" aria-hidden="true"><i className="fas fa-phone-alt"></i></span><span><small>Let’s talk about your vision</small>+91 89272 73545</span></a>
                        <div className="mb-appointment__note"><i className="fas fa-leaf" aria-hidden="true"></i> Rooted in nature. Built around you.</div>
                    </div>
                    <div className="mb-appointment__card">
                        <p className="mb-appointment__kicker">LET’S BUILD SOMETHING MEANINGFUL</p>
                        <h3>Tell us what you have in mind.</h3>
                        <ApiForm action="/appointment" method="post" className="mb-appointment__form">
                            <div className="mb-appointment__fields">
                                <label htmlFor="appointment-name">Your name<input id="appointment-name" name="username" type="text" placeholder="Full name" autoComplete="name" required maxLength={120} /></label>
                                <label htmlFor="appointment-email">Your email<input id="appointment-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={254} /></label>
                                <label htmlFor="appointment-mobile">Your mobile<input id="appointment-mobile" name="mobile" type="tel" placeholder="Phone number" autoComplete="tel" required maxLength={30} /></label>
                                <label htmlFor="appointment-service">Service type<select id="appointment-service" name="service_type" defaultValue="" required><option value="" disabled>Select a service</option><option>Sustainable Consultant</option><option>Traditional / Vernacular Sustainable Design</option><option>Permaculture</option><option>Sustainable Interior</option><option>Other enquiry</option></select></label>
                                <label className="mb-appointment__message" htmlFor="appointment-message">Message<textarea id="appointment-message" name="message" placeholder="Share a little about your project, location, or ideas…" rows={4} required maxLength={5000}></textarea></label>
                            </div>
                            <button className="mb-btn mb-btn--primary mb-appointment__submit" type="submit">Request an appointment <i className="bi bi-arrow-up-right" aria-hidden="true"></i></button>
                            <p className="mb-appointment__hint">Our team will get in touch to plan the next step with you.</p>
                        </ApiForm>
                    </div>
                </div>
            </div>
        </section>
    )
}
