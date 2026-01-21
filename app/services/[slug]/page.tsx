'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Service data - should match the services page
const allServices = [
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

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const service = allServices.find((s) => s.slug === slug)

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

  if (!service) {
    return (
      <main>
        <div className="container-xxl py-20">
          <div className="container text-center">
            <h1 className="display-4 mb-4">Service Not Found</h1>
            <p className="mb-4">The service you are looking for does not exist.</p>
            <Link href="/services" className="btn btn-primary" style={{ backgroundColor: '#964B00' }}>
              Back to Services
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Page Header */}
      <div className="container-fluid page-header py-5 mb-5" style={{ backgroundColor: '#964B00' }}>
        <div className="container text-center py-5">
          <h1 className="display-4 text-white mb-4">{service.title}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link className="text-white hover:text-white/80 transition-colors" href="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-white hover:text-white/80 transition-colors" href="/services">
                  Services
                </Link>
              </li>
              <li className="breadcrumb-item text-white/80 active" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Service Detail Content */}
      <div className="container-xxl py-10">
        <div className="container">
          <div className="row g-5">
            {/* Service Image and Main Content */}
            <div className="col-lg-8">
              <div className="service-detail-card bg-white rounded-2xl shadow-xl overflow-hidden mb-5">
                <div className="relative w-100" style={{ height: '500px' }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="display-5 font-heading text-gray-900 mb-4">{service.title}</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="mt-8">
                <h3 className="text-2xl font-heading text-gray-900 mb-5">Other Services</h3>
                <div className="row g-4">
                  {allServices
                    .filter((s) => s.slug !== slug)
                    .slice(0, 3)
                    .map((relatedService) => (
                      <div key={relatedService.slug} className="col-md-4">
                        <Link href={`/services/${relatedService.slug}`} className="block h-100">
                          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-100">
                            <div className="relative w-100" style={{ height: '200px' }}>
                              <Image
                                src={relatedService.image}
                                alt={relatedService.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                            <div className="p-4">
                              <h5 className="font-heading text-gray-900 mb-2">{relatedService.title}</h5>
                              <p className="text-gray-600 text-sm mb-0">
                                {relatedService.description.substring(0, 80)}...
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Appointment Form */}
            <div className="col-lg-4">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-[#964B00] via-[#7a3d00] to-[#5a2d00] rounded-2xl shadow-2xl p-6 md:p-8 text-white">
                  <div className="border-l-4 border-white pl-4 mb-6">
                    <h6 className="text-sm font-semibold uppercase tracking-wider mb-2">Book Appointment</h6>
                    <h3 className="text-2xl font-heading font-bold mb-0">
                      Get Started Today
                    </h3>
                  </div>
                  <p className="text-white/90 mb-6">
                    Interested in {service.title.toLowerCase()}? Book an appointment with us to discuss your project.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-white/10 border-white/20 text-white placeholder-white/60"
                          id="name"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                        <label htmlFor="name" className="text-white/80">Your Name</label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-white/10 border-white/20 text-white placeholder-white/60"
                          id="email"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                        <label htmlFor="email" className="text-white/80">Your Email</label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-white/10 border-white/20 text-white placeholder-white/60"
                          id="mobile"
                          placeholder="Your Mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          required
                        />
                        <label htmlFor="mobile" className="text-white/80">Your Mobile</label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-white/10 border-white/20 text-white placeholder-white/60"
                          id="service_type"
                          placeholder="Service Type"
                          name="service_type"
                          value={formData.service_type}
                          onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                          required
                        />
                        <label htmlFor="service_type" className="text-white/80">Service Type</label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-white/10 border-white/20 text-white placeholder-white/60"
                          placeholder="Message"
                          id="message"
                          name="message"
                          style={{ height: '100px' }}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        ></textarea>
                        <label htmlFor="message" className="text-white/80">Message</label>
                      </div>
                    </div>
                    <button
                      className="btn btn-light w-100 py-3 font-semibold hover:bg-white/90 transition-colors"
                      type="submit"
                    >
                      Get Appointment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
