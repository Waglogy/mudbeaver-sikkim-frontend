'use client'

import Image from 'next/image'

const teamMembers = {
  leadership: [
    {
      name: 'Prajwal Tamang',
      role: 'Founder & CEO',
      image: '/img/teams/PRAJWAL_TAMANG.png',
      description: 'Diploma, B.Tech in Civil Engineering. Earth & Bamboo tech specialised, trained from Earth Institute & Bamboo Centre Auroville, Tamil Nadu.',
    },
    {
      name: 'Aasha Tamang',
      role: 'President',
      image: '/img/teams/AASHA_TAMANG.png',
      description: 'Former Community facilitator under North East Rural Livelihood Project. Block resource person under Sikkim Rural Livelihood Mission.',
    },
    {
      name: 'Prakash Tamang',
      role: 'Finance Manager / Permaculture Guru',
      image: '/img/teams/PRAKASH_TAMANG.png',
      description: "Bachelor's in Commerce. 20 years of administrative experience at finance section.",
    },
    {
      name: 'Salina Rai',
      role: 'Creative Head / Product Designer / HR',
      image: '/img/teams/SALINA_RAI.png',
      description: "B.Tech in Civil Engineering. Certification on Graphic designing.",
    },
    {
      name: 'Lhakden Lepcha',
      role: 'MD / Landscape Designer',
      image: '/img/teams/LHAKDEN_LEPCHA.png',
      description: 'Diploma, B.Tech in Civil Engineering.',
    },
    {
      name: 'Bhoomika Chaudhari',
      role: 'Architect',
      image: '/img/teams/BHOOMIKA_CHAUDHARI.png',
      description: "Bachelor's in Architecture (A.O.A, Mumbai). Specialises in Sustainable Architecture. Worked as intern at Dus Studio, Auroville.",
    },
  ],
  projectManagement: [
    {
      name: 'Pratap Tamang',
      role: 'Project Manager - Sikkim Region',
      image: '/img/teams/PRATAP_TAMANG.png',
      description: '15 years of experience in civil works. Specialised in Traditional/Vernacular civil construction.',
    },
    {
      name: 'Indra Kumar Tamang',
      role: 'Project Manager - West Bengal Region',
      image: '/img/teams/INDRA_KUMAR_TAMANG.png',
      description: '15 years of experience in civil works. Specialised in traditional/vernacular carpentry, bamboo works.',
    },
    {
      name: 'Kazi Man Tamang',
      role: 'Project Manager - Nepal',
      image: '/img/teams/KAZI_MAN_LAMA.png',
      description: '15 years of experience in civil works. Specialised in conventional civil works.',
    },
    {
      name: 'Nedup Zangpo Lepcha',
      role: 'Structural Engineer (Bamboo)',
      image: '/img/teams/NEDUP_ZANGPO_LEPCHA.png',
      description: 'Diploma, B.Tech in Civil Engineering. M.Tech in Structural Engineering (S.M.I.T, Majhitar).',
    },
  ],
  specialists: [
    {
      name: 'Aashutosh Tiwari',
      role: 'Aquaponics Guru',
      image: '/img/teams/AASHUTOSH_TIWARI.png',
      description: "Bachelor's in Fisheries. Specialised with ornamental (aquarium) fishes & aquaculture.",
    },
    {
      name: 'Achong Lepcha',
      role: 'Solar Energy Guru',
      image: '/img/teams/ACHONG_LEPCHA.png',
      description: 'Diploma, B.Tech in Civil Engineering.',
    },
    {
      name: 'Pravesh Pradhan',
      role: 'Rain Water Harvesting Guru',
      image: '/img/teams/PRAVESH_PRADHAN.png',
      description: 'Diploma, B.Tech in Civil Engineering. Worked as technician for RWH projects.',
    },
    {
      name: 'Amit Rai',
      role: 'Zero Waste Management Guru',
      image: '/img/teams/AMIT_RAI.png',
      description: 'Diploma, B.Tech in Civil Engineering. Certification on Waste management.',
    },
    {
      name: 'Nandeshwar Rabha',
      role: 'Head Technician',
      image: '/img/teams/headtech.png',
      description: 'Trained and experienced in Earthen Construction.',
    },
    {
      name: 'Namrakh Subba',
      role: 'Influencer Partner',
      image: '/img/gaonn.jpg',
      description: (
        <a href="https://www.instagram.com/goankobhai/" target="_blank" rel="noopener noreferrer" style={{ color: '#964b00', textDecoration: 'none' }}>
          <i className="fab fa-instagram me-2"></i>Instagram: @goankobhai
        </a>
      ),
    },
  ],
}

export default function TeamsPage() {
  return (
    <main>
      {/* Team Section */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row g-5 mb-8 sm:mb-12">
            <div className="col-lg-8">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Our Team
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                  Our Expert Team
                </h1>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                At Mud Beavers, our team is the heartbeat of our innovative projects. Our expert workers blend years of
                experience with a passion for sustainable construction.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-0">
                With each artisan&apos;s skillful touch, we transform earth into architectural marvels that stand as a
                testament to their dedication. From crafting resilient structures to nurturing a greener future, our expert
                workers are the driving force behind Mud Beavers&apos; commitment to excellence.
              </p>
            </div>
          </div>

          {/* Section Divider */}
          <div className="relative py-8 sm:py-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-500 text-sm">
                <i className="fas fa-crown text-[#964B00] mr-2"></i>
                Leadership Team
              </span>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#964B00] mb-0">
                Leadership Team
              </h3>
            </div>
            <div className="row g-4 sm:g-6">
              {teamMembers.leadership.map((member, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-100">
                    <div className="relative w-100" style={{ height: '350px' }}>
                      <Image
                        className="w-100 h-100"
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <h5 className="font-heading font-bold text-gray-900 mb-2 text-lg sm:text-xl">{member.name}</h5>
                      <p className="text-[#964B00] font-semibold mb-3 text-sm sm:text-base">{member.role}</p>
                      <p className="mb-0 text-sm sm:text-base text-gray-700 leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
            <i className="fas fa-users text-[#964B00] mr-2"></i>
            Project Management Team
          </span>
        </div>
      </div>

      {/* Project Management Team */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#964B00] mb-0">
              Project Management Team
            </h3>
          </div>
          <div className="row g-4 sm:g-6">
            {teamMembers.projectManagement.map((member, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-100 group hover:-translate-y-1">
                  <div className="relative w-100 overflow-hidden" style={{ height: '350px' }}>
                    <Image
                      className="w-100 h-100 transition-transform duration-500 group-hover:scale-110"
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h5 className="font-heading font-bold text-gray-900 mb-2 text-lg sm:text-xl group-hover:text-[#964B00] transition-colors duration-300">{member.name}</h5>
                    <p className="text-[#964B00] font-semibold mb-3 text-sm sm:text-base">{member.role}</p>
                    <p className="mb-0 text-sm sm:text-base text-gray-700 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
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
            <i className="fas fa-user-graduate text-[#964B00] mr-2"></i>
            Specialists & Experts
          </span>
        </div>
      </div>

      {/* Specialists Team */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#964B00] mb-0">
              Specialists & Experts
            </h3>
          </div>
          <div className="row g-4 sm:g-6">
            {teamMembers.specialists.map((member, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-100 group hover:-translate-y-1">
                  <div className="relative w-100 overflow-hidden" style={{ height: '350px' }}>
                    <Image
                      className="w-100 h-100 transition-transform duration-500 group-hover:scale-110"
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h5 className="font-heading font-bold text-gray-900 mb-2 text-lg sm:text-xl group-hover:text-[#964B00] transition-colors duration-300">{member.name}</h5>
                    <p className="text-[#964B00] font-semibold mb-3 text-sm sm:text-base">{member.role}</p>
                    {typeof member.description === 'string' ? (
                      <p className="mb-0 text-sm sm:text-base text-gray-700 leading-relaxed">
                        {member.description}
                      </p>
                    ) : (
                      <div className="text-sm sm:text-base">{member.description}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
