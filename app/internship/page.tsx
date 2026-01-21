'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function InternshipPage() {
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zip_code: '',
    institution: '',
  })
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submission functionality is not implemented. Please contact us directly.')
  }

  return (
    <main>
      {/* Internship Content */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row g-5 mb-8 sm:mb-12">
            <div className="col-lg-8">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Internship
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                  Offering Internship Opportunities starting from ₹5,000
                </h1>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-0">
                Mud Beaver Sikkim presents Summer Training cum Internship with comprehensive introduction to modern earth
                buildings, earth materials engineering, and earth construction techniques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container-xxl py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <section className="internship-form-section">
            <div className="text-center mb-8 sm:mb-12">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 inline-block text-left mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Application
                </h6>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-0">
                  Internship Application Form
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mx-auto max-w-4xl">
                Introduction to modern earth buildings, Earth materials engineering and earth construction, Earth building
                technologies and earth construction techniques, Modern earth structural engineering, Application of modern
                earth construction: international case studies. Additional: Techno-economic analysis and environmental
                assessment of stabilised rammed earth (SRE) building construction and stabilized insulated rammed earth
                (SIREWALL) building.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="internship-form bg-white p-6 sm:p-8 rounded-2xl shadow-xl" encType="multipart/form-data">
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-white border border-gray-200"
                      id="name"
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <label htmlFor="name">
                      Name <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control bg-white border border-gray-200"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    />
                    <label htmlFor="date_of_birth">Date of Birth</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control bg-white border border-gray-200"
                      id="email"
                      placeholder="Your email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <label htmlFor="email">
                      Email <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className="form-control bg-white border border-gray-200"
                      id="phone"
                      placeholder="Your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                    <label htmlFor="phone">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-white border border-gray-200"
                      id="address"
                      placeholder="Chisopani sikkim"
                      name="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                    <label htmlFor="address">
                      Address <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-white border border-gray-200"
                      id="city"
                      placeholder="Jorthang"
                      name="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                    <label htmlFor="city">
                      City <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-white border border-gray-200"
                      id="region"
                      placeholder="East"
                      name="region"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      required
                    />
                    <label htmlFor="region">
                      Region <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-white border border-gray-200"
                      id="zip_code"
                      placeholder="737121"
                      name="zip_code"
                      value={formData.zip_code}
                      onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                      required
                    />
                    <label htmlFor="zip_code">
                      Zip Code <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating">
                    <select
                      className="form-select bg-white border border-gray-200"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      required
                    >
                      <option value="">Select Institution</option>
                      <option value="S.I.S.T (Sikkim Institute Of Science and Technology)">
                        S.I.S.T (Sikkim Institute Of Science and Technology)
                      </option>
                      <option value="C.C.C.T (Center For Computers and Communication Technology)">
                        C.C.C.T (Center For Computers and Communication Technology)
                      </option>
                    </select>
                    <label htmlFor="institution">
                      Institution <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="payment-section bg-gradient-to-br from-[#964B00]/5 to-[#b85c00]/5 p-6 sm:p-8 rounded-2xl mb-4 border-2 border-[#964B00]/20">
                <div className="text-center mb-6">
                  <h4 className="font-heading font-bold mb-4 text-2xl sm:text-3xl text-[#964B00]">
                    <i className="fas fa-rupee-sign me-2"></i>Payment Information
                  </h4>
                  <div className="amount-display mb-4">
                    <p className="text-gray-600 mb-2 text-base sm:text-lg">
                      Amount To Pay
                    </p>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[#964B00]">
                      ₹5,000
                    </h2>
                  </div>
                </div>

                <div className="row g-4 align-items-center">
                  <div className="col-md-6 text-center">
                    <Image
                      src="/img/internship_qr.jpg"
                      className="img-fluid rounded-4"
                      alt="QR CODE"
                      width={300}
                      height={300}
                      style={{ maxWidth: '300px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control bg-white border border-gray-200"
                        id="payment_screenshot"
                        name="image"
                        accept=".png, .jpeg, .jpg"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                      />
                      <label htmlFor="payment_screenshot">
                        Upload Payment Screenshot <span className="text-danger">*</span>
                      </label>
                    </div>
                    <p className="small text-muted mt-2">
                      <i className="fas fa-info-circle me-1"></i> Accepted formats: PNG, JPEG, JPG
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  type="submit"
                  style={{
                    backgroundColor: '#964B00',
                    border: 'none',
                    minWidth: '200px',
                  }}
                >
                  <i className="fas fa-paper-plane me-2"></i>Submit Application
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}
