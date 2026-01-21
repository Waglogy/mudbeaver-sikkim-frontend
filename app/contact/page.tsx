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
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center shadow-md mr-4">
                    <i className="fa fa-map-marker-alt text-base sm:text-lg"></i>
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-gray-900 mb-1 text-lg sm:text-xl">Address</h5>
                    <p className="text-base sm:text-lg text-gray-700 mb-0">Jorthang Namchi Road, Sikkim, India 737121</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center shadow-md mr-4">
                    <i className="fa fa-phone-alt text-base sm:text-lg"></i>
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-gray-900 mb-1 text-lg sm:text-xl">Phone</h5>
                    <p className="text-base sm:text-lg text-gray-700 mb-0">
                      <a href="tel:+918927273545" className="text-[#964B00] hover:text-[#7a3d00] transition-colors">
                        +91 89272 73545
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center shadow-md mr-4">
                    <i className="fa fa-envelope text-base sm:text-lg"></i>
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-gray-900 mb-1 text-lg sm:text-xl">Email</h5>
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
                        className="btn btn-primary w-100 py-3 font-semibold text-lg"
                        type="submit"
                        style={{ backgroundColor: '#964B00' }}
                      >
                        Send Message
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
