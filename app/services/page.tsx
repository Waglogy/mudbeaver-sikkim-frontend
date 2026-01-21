'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service_type: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submission functionality is not implemented. Please contact us directly.')
  }

  const services = [
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
    {
      title: 'Solar energy harvesting:',
      image: '/img/se.jpg',
      description:
        'We provide services on capturing and storing solar energy emitted by the sun is known as solar energy harvesting. Subsequently, the thermal and light energy is transformed into electrical energy by an appropriate technique.',
      slug: 'solar-energy-harvesting',
    },
    {
      title: 'Rain water harvesting :',
      image: '/img/rw.jpg',
      description:
        'One of many fields our project touches is the application of rain water harvesting. The practice of gathering rainfall runoff from a catchment (the region where water falls into bodies) in order to store it in above-ground ponds or aquifers for later use or to utilise immediately for irrigation is known as water harvesting. To put it simply, harvesting water involves directly collecting rainfall.',
      slug: 'rain-water-harvesting',
    },
    {
      title: 'Permaculture: ',
      image: '/img/55.jpg',
      description:
        'The creation of an ecologically sound way of life in our homes, gardens, communities, and enterprises is the core of permaculture. With this project we want to help design and set up small-scale or large-scale fields for the purpose of self-sustaining irrigation. This will help provide food for oneself and their families',
      slug: 'permaculture',
    },
    {
      title: 'Aquaponics:',
      image: '/img/7.jpg',
      description:
        'Aquaponics is the cultivation of plants without soil in a recirculating environment that combines hydroponics (growing plants without soil) and aquaculture (raising fish and other aquatic creatures). In aquaponics, the waste produced by the fish is transformed into nutrients for the plants by nitrifying bacteria. To flourish, plant roots take up these nutrients. For the fish to survive, the plant roots purify and filter the water.',
      slug: 'aquaponics',
    },
    {
      title: 'Sustainable landscaping:',
      image: '/img/si.jpg',
      description:
        'We also plan and design spaces around with a critical consideration of preserving soils, land use, topography, etc. that heightens water management and thoughtful local flora/vegetation choices.',
      slug: 'sustainable-landscaping',
    },
    {
      title: 'Net Waste management: ',
      image: '/img/6.1.jpg',
      description:
        'One of the many problems being faced as of now might be the issues with the proper disposal of waste through lack of segregation etc. We will introduce a well-designed flow chart or a system that will have segregation of wastes as its core. Self-help groups will be introduced to act in the field and take the initiative to fulfil the introduced system\'s objectives.',
      slug: 'net-waste-management',
    },
    {
      title: 'Sustainable interior designing:',
      image: '/img/st.jpg',
      description:
        'The structure that we build are of course a work of an art due a lot of enriching factors but what really matters at the end of the day is how ambient and cool it is from the inside, therefore we use locally produced product (sometimes recycled) that we design to fill in those spaces inside that will narrate the story of their own.',
      slug: 'sustainable-interior-designing',
    },
  ]

  return (
    <main>
      {/* Services */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row g-5 align-items-end mb-8 sm:mb-12">
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
          </div>
          <div className="row g-4 sm:g-6 justify-content-center">
            {services.map((service, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <Link href={`/services/${service.slug}`} className="block h-100 no-underline group" style={{ textDecoration: 'none' }}>
                  <div className="service-item bg-light overflow-hidden h-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" style={{ textDecoration: 'none' }}>
                    <div className="relative w-100 overflow-hidden" style={{ height: '300px' }}>
                      <Image
                        className="w-100 transition-transform duration-500 group-hover:scale-110"
                        src={service.image}
                        alt={service.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="service-text position-relative text-center h-100 p-5 sm:p-6" style={{ textDecoration: 'none' }} spellCheck="false">
                      <h5 className="mb-3 font-heading text-gray-900 no-underline text-lg sm:text-xl group-hover:text-[#964B00] transition-colors duration-300" style={{ textDecoration: 'none', borderBottom: 'none' }} spellCheck="false">{service.title}</h5>
                      <p className="text-gray-600 text-sm sm:text-base" style={{ textAlign: 'justify', textJustify: 'inter-word', textDecoration: 'none', borderBottom: 'none' }} spellCheck="false">
                        {service.description}
                      </p>
                      <div className="mt-4 text-[#964B00] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300" style={{ textDecoration: 'none', borderBottom: 'none' }}>
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

      {/* Appointment */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5 col-md-6">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Appointment
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-0">
                  Reserve Your Journey to Sustainable Living: Book Your Appointment with Mud Beavers Today!
                </h1>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-0">
                Imagine a home that seamlessly blends with nature, a dwelling that responds to the climate while
                exuding timeless charm. When you book an appointment with Mud Beavers, you&apos;re taking the first
                step towards turning this vision into reality.
              </p>
            </div>
            <div className="col-lg-7 col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="gname"
                        placeholder="Gurdian Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        placeholder="Gurdian Email"
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
                        placeholder="Child Name"
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
                        placeholder="Child Age"
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
                        placeholder="Leave a message here"
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
                    <button
                      className="btn btn-primary w-100 py-3 group relative overflow-hidden"
                      type="submit"
                      style={{ backgroundColor: '#964B00' }}
                    >
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
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
