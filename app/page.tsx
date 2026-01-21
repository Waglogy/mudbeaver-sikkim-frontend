'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    site_details: '',
    area: '',
    budget: '',
    category: '',
    services: '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('No file chosen')
  const [showMoreFields, setShowMoreFields] = useState(false)
  const [showFounderMessage, setShowFounderMessage] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // All images for lightbox
  const allImages = ['/img/w1.jpg', '/img/w2.jpg', '/img/w3.jpg', '/img/w4.jpg', '/img/w5.jpg', '/img/w6.jpg', '/img/w7.jpg']

  const openImage = (imagePath: string) => {
    const index = allImages.indexOf(imagePath)
    setSelectedImageIndex(index >= 0 ? index : 0)
    setSelectedImage(imagePath)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const closeImage = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % allImages.length
    setSelectedImageIndex(nextIndex)
    setSelectedImage(allImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length
    setSelectedImageIndex(prevIndex)
    setSelectedImage(allImages[prevIndex])
  }

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
        document.body.style.overflow = 'unset'
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (selectedImageIndex + 1) % allImages.length
        setSelectedImageIndex(nextIndex)
        setSelectedImage(allImages[nextIndex])
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length
        setSelectedImageIndex(prevIndex)
        setSelectedImage(allImages[prevIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, selectedImageIndex])

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Automatically show more fields when all 4 initial fields are filled
  useEffect(() => {
    if (formData.username.trim() && formData.email.trim() && formData.phone.trim() && formData.address.trim()) {
      setShowMoreFields(true)
    }
  }, [formData.username, formData.email, formData.phone, formData.address])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
        alert('Please upload PDF files only.')
        e.target.value = ''
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB. Please choose a smaller file.')
        e.target.value = ''
        return
      }
      setFile(selectedFile)
      const fileSize = (selectedFile.size / 1024 / 1024).toFixed(2)
      setFileName(`${selectedFile.name} (${fileSize} MB)`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submission functionality is not implemented. Please contact us directly.')
  }

  return (
    <main>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#964B00] via-[#b85c00] to-[#964B00] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-full shadow-2xl hover:shadow-[#964B00]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Modern Hero Section - Mobile Optimized */}
      <div className="relative w-full h-[85vh] xs:h-[88vh] sm:h-[90vh] min-h-[450px] xs:min-h-[500px] sm:min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/img/23.png"
            alt="Mud Beaver Sikkim - Sustainable Construction"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay - Responsive opacity */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#964B00]/50 via-[#7a3d00]/45 to-[#5a2d00]/50"></div>
          {/* Additional gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl mx-auto text-center hero-content">
              {/* Welcome Badge - Mobile Optimized */}
              <div className="hero-badge inline-block mb-3 sm:mb-4 md:mb-6 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <p className="text-white/90 text-[10px] xs:text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
                  Welcome To Mud Beaver Sikkim
                </p>
              </div>

              {/* Main Heading - Responsive Typography */}
              <h1 className="hero-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-[1.1] sm:leading-tight px-2 sm:px-0">
                Building a Greener Tomorrow
                <span className="block mt-1 sm:mt-2 md:mt-3 bg-gradient-to-r from-white via-amber-50 to-white bg-clip-text text-transparent">
                  Earth-Centric Approach
                </span>
              </h1>

              {/* Subtitle - Mobile Optimized */}
              <p className="hero-subtitle text-sm xs:text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto font-light leading-relaxed px-2 sm:px-4 md:px-0">
                Crafting sustainable, timeless structures that harmonize with nature while preserving traditional wisdom
              </p>

              {/* Tags - Mobile Responsive */}
              <div className="hero-tags flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-0">
                {['SUSTAINABLE CONSULTANT', 'SUSTAINABLE DESIGN', 'SUSTAINABLE PRACTISES'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg border border-white/20 text-white text-[10px] xs:text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors duration-300 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                <div className="flex flex-col items-center text-white/70">
                  <span className="text-xs mb-2 uppercase tracking-wider">Scroll</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              {/* CTA Button - Mobile Optimized */}
              <div className="hero-cta mt-4 sm:mt-6 md:mt-10 px-2 sm:px-4 md:px-0">
                <a
                  href="/mudbeaversikkim_brochure.pdf"
                  download="mudbeaversikkim_brochure"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-[#964B00] to-[#b85c00] text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg sm:rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(150,75,0,0.4)] transform hover:scale-105 active:scale-95 transition-all duration-300 hover:from-[#b85c00] hover:to-[#964B00] no-underline overflow-hidden w-full max-w-xs sm:max-w-none sm:w-auto min-h-[44px] sm:min-h-[48px]"
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <i className="fas fa-download text-sm sm:text-base md:text-lg relative z-10"></i>
                  <span className="relative z-10 whitespace-nowrap">Download Brochure</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on very small screens */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
          <div className="animate-bounce">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white/70"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Requirements Form */}
      <div className="container-xxl py-8 sm:py-12 md:py-16">
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* Form Content - Full Width */}
            <div className="col-lg-12">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Get Started</h6>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
                  Let&apos;s Be Specific About Your Requirements
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Fill out this quick form to get started with your project planning. After you submit your specific
                  requirements, a dedicated member of our team will get in touch with you to brief and help you prepare
                  an actual estimation of your project.
                </p>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-4 shadow-lg p-4 sm:p-5 md:p-6 lg:p-8 relative pb-16 sm:pb-20">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control rounded-md"
                          id="Name"
                          placeholder="Your Name"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                          style={{ borderColor: '#d1d5db' }}
                        />
                        <label htmlFor="Name" className="text-sm">
                          <i className="fas fa-user me-2"></i>Your Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control rounded-md"
                          id="Email1"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          style={{ borderColor: '#d1d5db' }}
                        />
                        <label htmlFor="Email1" className="text-sm">
                          <i className="fas fa-envelope me-2"></i>Your Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="tel"
                          className="form-control rounded-md"
                          id="Phone"
                          placeholder="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          style={{ borderColor: '#d1d5db' }}
                        />
                        <label htmlFor="Phone" className="text-sm">
                          <i className="fas fa-phone me-2"></i>Phone Number
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control rounded-md"
                          id="Address"
                          placeholder="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          style={{ borderColor: '#d1d5db' }}
                        />
                        <label htmlFor="Address" className="text-sm">
                          <i className="fas fa-map-marker-alt me-2"></i>Address
                        </label>
                      </div>
                    </div>

                    {/* Additional Fields - Automatically shown when all 4 fields are filled */}
                    {showMoreFields && (
                      <>
                        <div className="col-12">
                          <hr className="my-4" />
                          <h5 className="mb-3">
                            <i className="fas fa-map-marked-alt text-primary me-2"></i>Site Details
                          </h5>
                        </div>

                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-md"
                              id="SiteDetails"
                              placeholder="Site Details"
                              name="site_details"
                              value={formData.site_details}
                              onChange={handleInputChange}
                              style={{ borderColor: '#d1d5db' }}
                            />
                            <label htmlFor="SiteDetails" className="text-xs">e.g. FLAT LAND, SLOPED LAND, SOFT SURFACE, HARD SURFACE</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-md"
                              id="BuiltArea"
                              placeholder="Built-up Area"
                              name="area"
                              value={formData.area}
                              onChange={handleInputChange}
                              style={{ borderColor: '#d1d5db' }}
                            />
                            <label htmlFor="BuiltArea" className="text-xs">e.g. 500-1000 Sq.Ft, 1000-2000 Sq.Ft, 5000+ Sq.Ft</label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-md"
                              id="Budget"
                              placeholder="Project Budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              style={{ borderColor: '#d1d5db' }}
                            />
                            <label htmlFor="Budget" className="text-xs">e.g. 15-20 LAKH, 20-50 LAKH, 50-90 LAKH, 1 CR+</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-md"
                              id="Category"
                              placeholder="Category"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              style={{ borderColor: '#d1d5db' }}
                            />
                            <label htmlFor="Category" className="text-xs">e.g. COTTAGE, HOMESTAY, FARMHOUSE, RESORTS, OTHERS</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-md"
                              id="Services"
                              placeholder="Services Required"
                              name="services"
                              value={formData.services}
                              onChange={handleInputChange}
                              style={{ borderColor: '#d1d5db' }}
                            />
                            <label htmlFor="Services" className="text-xs">e.g. DESIGN, CONSULTANCY, CONSTRUCTION, TURNKEY</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <hr className="my-4" />
                          <h5 className="mb-3">
                            <i className="fas fa-file-pdf text-primary me-2"></i>Attach Architectural Drawings (PDF)
                          </h5>
                          <div className="form-group">
                            <div className="file-upload-wrapper">
                              <label htmlFor="drawings" className="file-upload-label">
                                <span className="file-upload-text">
                                  <i className="fas fa-cloud-upload-alt me-2"></i>
                                  Choose PDF File
                                </span>
                                <span className="file-upload-name" id="file-name">{fileName}</span>
                              </label>
                              <input
                                type="file"
                                className="form-control d-none"
                                accept=".pdf"
                                name="drawings"
                                id="drawings"
                                onChange={handleFileChange}
                              />
                              <small className="form-text text-muted mt-2 d-block">
                                <i className="fas fa-info-circle me-1"></i>
                                Please upload PDF files only (Max size: 10MB)
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <textarea
                              className="form-control rounded-md"
                              id="textAreaExample"
                              placeholder="Project Description"
                              name="message"
                              style={{ height: '120px', borderColor: '#d1d5db' }}
                              value={formData.message}
                              onChange={handleInputChange}
                            ></textarea>
                            <label htmlFor="textAreaExample" className="text-sm">
                              <i className="fas fa-comment-alt me-2"></i>Detailed Description of Your Project
                            </label>
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                </form>
                {/* Submit Button - Bottom Right */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary px-4 py-2"
                    style={{ backgroundColor: '#964B00', borderColor: '#964B00', fontSize: '0.875rem' }}
                  >
                    <i className="fas fa-paper-plane me-2"></i>Submit Requirements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container-xxl py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="row g-6 lg:g-8 align-items-center">
            {/* Image Section */}
            <div className="col-lg-6">
              <div className="position-relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl h-full min-h-[450px] sm:min-h-[500px] md:min-h-[600px]">
                <Image
                  className="object-cover"
                  src="/img/10.jpg"
                  alt="About Mud Beavers"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#964B00]/20 via-transparent to-transparent"></div>
                
                {/* Brand Badge */}
                <div className="absolute top-6 left-6 bg-white rounded-xl shadow-xl p-4 sm:p-5 transform hover:scale-105 transition-transform duration-300">
                  <div
                    className="flex flex-col justify-center items-center h-full p-3 sm:p-4 rounded-lg"
                    style={{ backgroundColor: '#964B00' }}
                  >
                    <h1 className="text-white text-xl sm:text-2xl font-heading font-bold mb-0">Mud</h1>
                    <h2 className="text-white text-xl sm:text-2xl font-heading font-bold mb-0">Beavers</h2>
                    <h5 className="text-white text-sm sm:text-base font-sans font-medium mt-1">Sikkim</h5>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="col-lg-6">
              <div className="h-100 flex flex-col justify-center">
                {/* Header */}
                <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                  <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                    About Us
                  </h6>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                    THE ENTERPRISE
                  </h1>
                </div>

                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    Mud Beaver Sikkim is a socio-sustainable construction enterprise focussing on specialisation in
                    research, development, promotion and transfer of earth based building technologies.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    We construct timeless, unique traditional, vernacular, cost effective, low carbon embodied, climate
                    responsive, energy efficient dwellings alongside designing and implementing green products & practices
                    to sustainably contribute as a part of the project but development as a whole.
                  </p>
                </div>

                {/* Features */}
                <div className="border-t border-gray-200 pt-6 sm:pt-8">
                  <div className="row g-4 sm:g-5">
                    <div className="col-sm-4 flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#964B00] to-[#b85c00] rounded-lg flex items-center justify-center shadow-md mr-3 sm:mr-4">
                        <i className="fa fa-check text-white text-base sm:text-lg"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 text-sm sm:text-base font-semibold text-gray-900">Ontime at services</h6>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-0">Reliable delivery</p>
                      </div>
                    </div>
                    <div className="col-sm-4 flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#964B00] to-[#b85c00] rounded-lg flex items-center justify-center shadow-md mr-3 sm:mr-4">
                        <i className="fa fa-check text-white text-base sm:text-lg"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 text-sm sm:text-base font-semibold text-gray-900">24/7 Online Presence</h6>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-0">Always available</p>
                      </div>
                    </div>
                    <div className="col-sm-4 flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#964B00] to-[#b85c00] rounded-lg flex items-center justify-center shadow-md mr-3 sm:mr-4">
                        <i className="fa fa-check text-white text-base sm:text-lg"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 text-sm sm:text-base font-semibold text-gray-900">Verified professionals</h6>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-0">Expert team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative py-8 sm:py-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-gray-500 text-sm">
            <i className="fas fa-tools text-[#964B00] mr-2"></i>
            Our Services
          </span>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="container-xxl py-16 sm:py-20 my-12">
        <div className="container">
          <div className="row g-5 align-items-end mb-8">
            <div className="col-lg-6">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Our Services
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-0">
                  Construction And Renovation Solutions
                </h1>
              </div>
            </div>
            <div className="col-lg-6 text-end">
              <Link
                href="/services"
                className="inline-flex items-center text-[#964B00] hover:text-[#7a3d00] font-semibold transition-colors duration-300"
              >
                View All Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              {
                title: 'Sustainable consultant',
                image: '/img/sd.jpg',
                description:
                  'We not only put on a lot of labour on building a den for our client but foremost we are here to give suggestion\'s & advise for individuals who are interested in diving in to this world of sustainability, from advice\'s dealing with just building a green home to the selection of materials/products, technology used, etc and to actually practicing and living a sustainable lifestyle, we are here to thoroughly help you on your journey.',
                slug: 'sustainable-consultant',
              },
              {
                title: 'Traditional/vernacular sustainable designs',
                image: '/img/2.jpg',
                description:
                  'Providing design which are inspired from rich & aesthetically looking traditional buildings, preserving the local culture and heritage with a zest of passive design principles which helps the dwellings designed to be structural and climate responsive.',
                slug: 'traditional-vernacular-sustainable-designs',
              },
              {
                title: 'Green design optimisation',
                image: '/img/3.jpg',
                description:
                  'Apart form building fresh mud structure and systems, we also indulge our selves on re-designing and renovating existing conventional structures with various passive & sustainable principle\'s & practices that makes a dwelling more climate responsive, green, resulting it to be energy efficient, self sufficient & much more.',
                slug: 'green-design-optimisation',
              },
              {
                title: 'Green building certifications:',
                image: '/img/22.jpg',
                description:
                  'Since the services we provide helps a great deal in attaining sustainability, which also tick\'s off a lot of criteria and norms for a building to be certified as green, therefore we are also here to get you certified for building & living the green way to show how responsible & caring you\'re towards our planet earth.',
                slug: 'green-building-certifications',
              },
            ].map((service, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <Link href={`/services/${service.slug}`} className="block h-100 no-underline group" style={{ textDecoration: 'none' }}>
                  <div className="service-item bg-light overflow-hidden h-100 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative" style={{ textDecoration: 'none' }}>
                    <div className="relative w-100 overflow-hidden" style={{ height: '250px' }}>
                      <Image
                        className="w-100 transition-transform duration-500 group-hover:scale-110"
                        src={service.image}
                        alt={service.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="service-text position-relative text-center h-100 p-4" style={{ textDecoration: 'none' }} spellCheck="false">
                      <h5 className="mb-3 font-heading text-gray-900 no-underline group-hover:text-[#964B00] transition-colors duration-300" style={{ textDecoration: 'none', borderBottom: 'none' }} spellCheck="false">{service.title}</h5>
                      <p className="text-gray-600 text-sm" style={{ textAlign: 'justify', textJustify: 'inter-word', textDecoration: 'none', borderBottom: 'none' }} spellCheck="false">
                        {service.description.substring(0, 120)}...
                      </p>
                      <div className="mt-3 text-[#964B00] font-semibold text-sm flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                        Learn More
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Mud Beaver Sikkim Section - Newspaper Style */}
      <div className="container-xxl py-12 sm:py-16 md:py-20 bg-[#faf9f6]">
        <div className="container">
          {/* Newspaper Header */}
          <div className="bg-white border-4 border-[#964B00] p-6 sm:p-8 mb-8 sm:mb-12 shadow-2xl">
            {/* Newspaper Masthead */}
            <div className="border-b-4 border-[#964B00] pb-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-widest mb-2 sm:mb-0">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 border-2 border-[#964B00] px-4 py-2">
                  MUD BEAVER TIMES
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-0">
                  Vol. 1, No. 1
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-4 border-b-2 border-[#964B00] pb-4">
              Why do we call ourselves &quot;Mud Beaver Sikkim&quot;?
            </h1>
            <p className="text-sm sm:text-base text-gray-600 italic mb-6">
              A story of tradition, craftsmanship, and our deep connection to the land we call home
            </p>
          </div>

          {/* Newspaper Content - Multi-column Layout */}
          <div className="bg-white border-4 border-[#964B00] p-6 sm:p-8 md:p-12 shadow-2xl">
            <div className="row g-4 sm:g-6">
              {/* Left Column - MUD Section */}
              <div className="col-lg-4">
                <div className="border-b-2 border-[#964B00] pb-4 mb-6">
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-2">MUD</h2>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Part One</div>
                </div>
                
                {/* Floating Image */}
                <div className="float-left mr-4 mb-4 w-32 sm:w-40 cursor-pointer" onClick={() => openImage('/img/w1.jpg')}>
                  <div className="border-2 border-[#964B00] p-1 bg-white hover:border-[#b85c00] transition-colors duration-300">
                    <div className="relative aspect-square">
                      <Image
                        src="/img/w1.jpg"
                        alt="Mud construction"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 200px"
                      />
                    </div>
                    <p className="text-xs text-gray-600 italic mt-1 text-center">Traditional earth building</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-serif mb-4">
                  The &quot;Mud&quot; represents our commitment to traditional earth-based construction techniques that have stood the test of time. We work with natural materials - mud, clay, and earth - transforming them into beautiful, durable, and environmentally friendly structures.
                </p>

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-2 my-6">
                  {[2, 3].map((num) => (
                    <div key={num} className="border-2 border-[#964B00] p-1 bg-white cursor-pointer hover:border-[#b85c00] transition-colors duration-300" onClick={() => openImage(`/img/w${num}.jpg`)}>
                      <div className="relative aspect-square">
                        <Image
                          src={`/img/w${num}.jpg`}
                          alt={`Mud construction ${num}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-serif">
                  These ancient techniques, passed down through generations, form the foundation of everything we build. Each structure tells a story of the earth itself.
                </p>
              </div>

              {/* Middle Column - BEAVER Section */}
              <div className="col-lg-4">
                <div className="border-b-2 border-[#964B00] pb-4 mb-6">
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-2">BEAVER</h2>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Part Two</div>
                </div>

                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-serif mb-6">
                  &quot;Beaver&quot; symbolizes our industrious nature, attention to detail, and ability to create something extraordinary from the simplest of materials. Like beavers, we are builders who work harmoniously with nature, not against it.
                </p>

                {/* Image Grid */}
                <div className="grid grid-cols-3 gap-2 my-6">
                  {[4, 5, 6].map((num) => (
                    <div key={num} className="border-2 border-[#964B00] p-1 bg-white cursor-pointer hover:border-[#b85c00] transition-colors duration-300" onClick={() => openImage(`/img/w${num}.jpg`)}>
                      <div className="relative aspect-square">
                        <Image
                          src={`/img/w${num}.jpg`}
                          alt={`Beaver craftsmanship ${num}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 11vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-serif">
                  Our team approaches each project with the same dedication and precision that beavers demonstrate in their natural habitat. Every detail matters, every structure is built to last.
                </p>
              </div>

              {/* Right Column - SIKKIM Section */}
              <div className="col-lg-4">
                <div className="border-b-2 border-[#964B00] pb-4 mb-6">
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-2">SIKKIM</h2>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Part Three</div>
                </div>

                {/* Large Image */}
                <div className="border-2 border-[#964B00] p-1 bg-white mb-6 cursor-pointer hover:border-[#b85c00] transition-colors duration-300" onClick={() => openImage('/img/w7.jpg')}>
                  <div className="relative" style={{ height: '300px' }}>
                    <Image
                      src="/img/w7.jpg"
                      alt="Sikkim landscape"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-xs text-gray-600 italic mt-1 text-center">The beautiful Himalayan state of Sikkim</p>
                </div>

                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-serif">
                  &quot;Sikkim&quot; anchors us to our roots - this beautiful Himalayan state where we operate, bringing sustainable construction practices to communities while preserving the rich architectural heritage of the region. Together, &quot;Mud Beaver Sikkim&quot; represents our commitment to building sustainable, earth-friendly structures that honor both nature and tradition.
                </p>
              </div>
            </div>

            {/* Bottom Quote - Newspaper Style */}
            <div className="border-t-4 border-[#964B00] mt-8 sm:mt-12 pt-6 sm:pt-8">
              <div className="bg-gray-100 border-2 border-[#964B00] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="text-6xl sm:text-7xl font-serif text-gray-400 leading-none">&quot;</div>
                  <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-gray-900 leading-relaxed flex-1">
                    Building with earth, building for the future - that&apos;s what Mud Beaver Sikkim stands for.
                  </blockquote>
                  <div className="text-6xl sm:text-7xl font-serif text-gray-400 leading-none">&quot;</div>
                </div>
                <div className="text-right mt-4 text-sm text-gray-600 font-serif">
                  — Mud Beaver Sikkim
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative py-8 sm:py-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-gray-500 text-sm">
            <i className="fas fa-calendar-check text-[#964B00] mr-2"></i>
            Book Your Appointment
          </span>
        </div>
      </div>

      {/* Appointment Section */}
      <div className="relative w-full py-20 my-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">Appointment</h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-0">
                  Reserve Your Journey to Sustainable Living: Book Your Appointment with Mud Beavers Today!
                </h1>
              </div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-0">
                Imagine a home that seamlessly blends with nature, a dwelling that responds to the climate while
                exuding timeless charm. When you book an appointment with Mud Beavers, you&apos;re taking the first step
                towards turning this vision into reality.
              </p>
            </div>
            <div>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeImage}
        >
          {/* Close Button */}
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={`Image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-white text-sm sm:text-base">
                {selectedImageIndex + 1} / {allImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Message from Founder */}
      {showFounderMessage && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-2rem)] sm:max-w-sm md:max-w-md animate-slide-up">
          <div className="flex flex-col items-end gap-3">
            {/* Profile Image Circle */}
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-4 border-[#964B00] shadow-lg">
                <Image
                  src="/img/teams/PRAJWAL_TAMANG.png"
                  alt="Prajwal Tamang"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Message Box */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 border border-gray-200 relative transform hover:scale-105 transition-all duration-300">
              {/* Message tail/pointer */}
              <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
              
              <div className="relative">
                <div className="mb-2">
                  <h5 className="font-heading font-bold text-gray-900 text-sm sm:text-base mb-0">Prajwal Tamang</h5>
                  <p className="text-[#964B00] font-semibold text-xs sm:text-sm mb-0">Founder & CEO</p>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-0 italic">
                  &quot;Building sustainable futures, one earth structure at a time. Together, we create homes that honor nature and nurture communities.&quot;
                </p>
                <button
                  className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowFounderMessage(false)}
                  aria-label="Close message"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function AppointmentForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    service_type: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submission functionality is not implemented. Please contact us directly.')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-sm-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control bg-light border-0"
              id="gname"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <label htmlFor="gname">Your Name</label>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-floating">
            <input
              type="email"
              className="form-control bg-light border-0"
              id="gmail"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <label htmlFor="gmail">Your Email</label>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control bg-light border-0"
              id="cname"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              required
            />
            <label htmlFor="cname">Your Mobile</label>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control bg-light border-0"
              id="cage"
              name="service_type"
              value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
              required
            />
            <label htmlFor="cage">Service Type</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <textarea
              className="form-control bg-light border-0"
              id="message"
              name="message"
              style={{ height: '100px' }}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
            <label htmlFor="message">Message</label>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary w-100 py-3 group relative overflow-hidden" type="submit">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Appointment
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#7a3d00] to-[#964B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </form>
  )
}
