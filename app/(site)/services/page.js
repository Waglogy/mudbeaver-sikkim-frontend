import PageIntro from "@/components/PageIntro"
import PageEnd from "@/components/PageEnd"
import InquiryForm from "@/components/InquiryForm"
import { SERVICES } from "@/lib/services"
export const metadata = { title: "Sustainable Services | Mud Beavers Sikkim" }
export default function ServicesPage() { return <>
    <main>
        <PageIntro eyebrow="Our Services" title="Thoughtful spaces." accent="A lighter footprint." description="From the first conversation to the finishing touches, we bring traditional knowledge and sustainable thinking to your home, landscape, and everyday life." image="/img/2.jpg" imageAlt="Traditional architecture with natural building materials" action="#services" actionLabel="Explore our services" />
        <section id="services" className="mb-page-section"><div className="mb-container"><div className="mb-page-section__head"><div><p className="mb-section-eyebrow">WHAT WE DO</p><h2>Better ways to build.<br />Better ways to live.</h2></div><p>Explore our approach to construction, renovation, and the systems that make a place more sustainable.</p></div><div className="mb-service-grid">{SERVICES.map((service, index) => <article className="mb-service-card" key={service.title}><div className="mb-service-card__photo"><img src={service.image} alt={service.title} loading="lazy" /><span>{String(index + 1).padStart(2, "0")}</span></div><div className="mb-service-card__body"><h3>{service.title}</h3><p>{service.text}</p><a href="#service-enquiry">Discuss your project <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></div></article>)}</div></div></section>
        <section id="service-enquiry" className="mb-page-section mb-page-section--dark"><div className="mb-container mb-page-split"><div><p className="mb-section-eyebrow">LET’S BEGIN</p><h2>A little about your vision.<br /><span>A world of possibilities.</span></h2><p>Planning a new home, rethinking an existing space, or exploring a greener way of living? Tell us what you have in mind.</p><a className="mb-page-phone" href="tel:+918927273545">+91 89272 73545 ↗</a></div><div className="mb-form-card"><h3>Let’s talk about your project.</h3><InquiryForm service /></div></div></section>
    </main><PageEnd />
</> }
