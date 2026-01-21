import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-800 via-gray-750 to-gray-800 text-gray-100 mt-12 sm:mt-16 md:mt-20" style={{ background: 'linear-gradient(135deg, rgba(150, 75, 0, 0.12) 0%, rgba(120, 60, 0, 0.15) 50%, rgba(150, 75, 0, 0.12) 100%), linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)' }}>
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-[#964B00] via-[#b85c00] to-[#964B00]"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="row g-6 lg:g-8">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-6">
              <h1 className="text-white text-xl sm:text-2xl font-heading font-bold mb-4 flex items-center">
                <i className="fa fa-building text-[#964B00] me-3 text-2xl"></i>
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  MUD BEAVERS SIKKIM
                </span>
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-gray-200 mb-6">
                We take pride in crafting unique and timeless vernacular dwellings that stand as a testament to
                our commitment to preserving tradition while embracing innovation.
              </p>
              
              {/* Social Media Links */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white hover:border-white hover:text-[#964B00] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  href="https://twitter.com/mudbeaversikkim?s=11"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-sm sm:text-base"></i>
                </a>
                <a
                  className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white hover:border-white hover:text-[#964B00] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  href="https://www.facebook.com/profile.php?id=100094136772334&mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-sm sm:text-base"></i>
                </a>
                <a
                  className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white hover:border-white hover:text-[#964B00] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  href="https://www.instagram.com/mudbeaver.sikkim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-sm sm:text-base"></i>
                </a>
                <a
                  className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white hover:border-white hover:text-[#964B00] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  href="https://www.linkedin.com/company/mud-beaver-sikkim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-sm sm:text-base"></i>
                </a>
                <a
                  className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white hover:border-white hover:text-[#964B00] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  href="https://wa.link/lolas0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp text-sm sm:text-base"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white text-lg sm:text-xl font-heading font-semibold mb-4 sm:mb-6 pb-2 border-b-2 border-[#964B00]/30 inline-block">
              Address
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <p className="flex items-start text-sm sm:text-base text-gray-200 hover:text-white transition-colors">
                <i className="fa fa-map-marker-alt text-white/80 me-3 mt-1 flex-shrink-0"></i>
                <span>
                  Jorthang Namchi Road,<br />
                  Sikkim, India 737121
                </span>
              </p>
              <p className="flex items-center text-sm sm:text-base text-gray-200 hover:text-white transition-colors">
                <i className="fa fa-phone-alt text-white/80 me-3 flex-shrink-0"></i>
                <a href="tel:+918927273545" className="hover:text-white transition-colors">
                  +91 89272 73545
                </a>
              </p>
              <p className="flex items-center text-sm sm:text-base text-gray-200 hover:text-white transition-colors">
                <i className="fa fa-envelope text-white/80 me-3 flex-shrink-0"></i>
                <a href="mailto:info@mudbeaversikkim.in" className="hover:text-white transition-colors break-all">
                  info@mudbeaversikkim.in
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white text-lg sm:text-xl font-heading font-semibold mb-4 sm:mb-6 pb-2 border-b-2 border-[#964B00]/30 inline-block">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              <Link 
                className="group flex items-center text-sm sm:text-base text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-1"
                href="/about"
              >
                <i className="fa fa-chevron-right text-white/60 text-xs me-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                <span>About Us</span>
              </Link>
              <Link 
                className="group flex items-center text-sm sm:text-base text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-1"
                href="/contact"
              >
                <i className="fa fa-chevron-right text-white/60 text-xs me-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                <span>Contact Us</span>
              </Link>
              <Link 
                className="group flex items-center text-sm sm:text-base text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-1"
                href="/services"
              >
                <i className="fa fa-chevron-right text-white/60 text-xs me-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                <span>Our Services</span>
              </Link>
              <Link 
                className="group flex items-center text-sm sm:text-base text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-1"
                href="/blog"
              >
                <i className="fa fa-chevron-right text-white/60 text-xs me-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                <span>Blog</span>
              </Link>
              <Link 
                className="group flex items-center text-sm sm:text-base text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-1"
                href="/internship"
              >
                <i className="fa fa-chevron-right text-white/60 text-xs me-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                <span>Internships</span>
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white text-lg sm:text-xl font-heading font-semibold mb-4 sm:mb-6 pb-2 border-b-2 border-[#964B00]/30 inline-block">
              Newsletter
            </h4>
            <p className="text-sm sm:text-base text-gray-200 mb-4">
              Stay in the know with Mud Beavers!
            </p>
            <div className="relative">
              <input
                className="w-full py-3 px-4 pr-20 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-all duration-300 text-sm sm:text-base"
                type="email"
                placeholder="Your email"
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full px-4 sm:px-6 bg-white text-[#964B00] font-semibold rounded-r-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 text-xs sm:text-sm"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="row items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="text-sm sm:text-base text-gray-400">
                &copy; {new Date().getFullYear()}{' '}
                <Link href="/" className="text-[#b85c00] hover:text-[#964B00] transition-colors font-semibold">
                  Mudbeaversikkim
                </Link>
                , All Right Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="text-sm sm:text-base text-gray-400">
                Designed By{' '}
                <a 
                  href="https://www.waglogy.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#b85c00] hover:text-[#964B00] transition-colors font-semibold"
                >
                  Waglogy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
