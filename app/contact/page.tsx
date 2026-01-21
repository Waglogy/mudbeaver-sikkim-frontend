'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submission functionality is not implemented. Please contact us directly.')
  }

  return (
    <main>
      {/* Contact Form */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row g-5 sm:g-8">
            <div className="col-lg-6">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Contact Us
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-0">
                  Get In Touch
                </h1>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center shadow-md mr-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fa fa-map-marker-alt text-base sm:text-lg"></i>
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-gray-900 mb-1 text-lg sm:text-xl group-hover:text-[#964B00] transition-colors duration-300">Address</h5>
                    <p className="text-base sm:text-lg text-gray-700 mb-0">Jorthang Namchi Road, Sikkim, India 737121</p>
                  </div>
                </div>
                <div className="flex items-start group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center shadow-md mr-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fa fa-phone-alt text-base sm:text-lg"></i>
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-gray-900 mb-1 text-lg sm:text-xl group-hover:text-[#964B00] transition-colors duration-300">Phone</h5>
                    <p className="text-base sm:text-lg text-gray-700 mb-0">
                      <a href="tel:+918927273545" className="text-[#964B00] hover:text-[#7a3d00] transition-colors">
                        +91 89272 73545
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center shadow-md mr-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fa fa-envelope text-base sm:text-lg"></i>
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-gray-900 mb-1 text-lg sm:text-xl group-hover:text-[#964B00] transition-colors duration-300">Email</h5>
                    <p className="text-base sm:text-lg text-gray-700 mb-0">
                      <a href="mailto:info@mudbeaversikkim.in" className="text-[#964B00] hover:text-[#7a3d00] transition-colors">
                        info@mudbeaversikkim.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-white border border-gray-200"
                          id="name"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-white border border-gray-200"
                          id="email"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-white border border-gray-200"
                          id="subject"
                          placeholder="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-white border border-gray-200"
                          placeholder="Leave a message here"
                          id="message"
                          name="message"
                          style={{ height: '150px' }}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3 font-semibold text-lg group relative overflow-hidden"
                        type="submit"
                        style={{ backgroundColor: '#964B00' }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Send Message
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#7a3d00] to-[#964B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
