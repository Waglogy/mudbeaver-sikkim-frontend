export default function Footer() {
    return (
        <footer className="mb-footer">
            <div className="mb-container">
                <div className="mb-footer__top"><p>Thoughtfully built.<br /><span>Naturally yours.</span></p><a className="mb-btn mb-btn--primary" href="/contact">Let’s create together <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>
                <div className="mb-footer__grid">
                    <div className="mb-footer__brand"><a href="/" aria-label="Mud Beavers Sikkim home">MUD BEAVERS<span>SIKKIM</span></a><p>Unique, timeless vernacular dwellings. Preserving tradition while embracing innovation.</p><div className="mb-footer__social"><a href="https://twitter.com/mudbeaversikkim?s=11" aria-label="Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a><a href="https://www.facebook.com/profile.php?id=100094136772334&mibextid=LQQJ4d" aria-label="Facebook"><i className="fab fa-facebook-f" aria-hidden="true"></i></a><a href="https://www.instagram.com/mudbeaver.sikkim/" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a><a href="https://www.linkedin.com/company/mud-beaver-sikkim/" aria-label="LinkedIn"><i className="fab fa-linkedin-in" aria-hidden="true"></i></a><a href="https://wa.link/lolas0/" aria-label="WhatsApp"><i className="fab fa-whatsapp" aria-hidden="true"></i></a></div></div>
                    <div><h2>Visit & connect</h2><address>Jorthang Namchi Road,<br />Sikkim, India 737121</address><a href="tel:+918927273545">+91 89272 73545</a><a href="mailto:mudbeaversikkim@gmail.com">mudbeaversikkim@gmail.com</a></div>
                    <nav aria-label="Footer navigation"><h2>Explore</h2><a href="/about">About us</a><a href="/services">Our services</a><a href="/teams">Our team</a><a href="/blog">Our journal</a><a href="/contact">Contact us</a></nav>
                    <div className="mb-footer__updates"><h2>Stay in the know</h2><p>Ideas, craftsmanship, and stories from Mud Beavers.</p><a className="mb-footer__follow" href="https://www.instagram.com/mudbeaver.sikkim/">Follow our journey <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>
                </div>
                <div className="mb-footer__bottom"><p>© {new Date().getFullYear()} <a href="/">Mudbeaversikkim</a>. All rights reserved.</p><p>Designed by <a href="https://www.waglogy.in">Waglogy</a></p></div>
            </div>
        </footer>
    )
}
