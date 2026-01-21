'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  return (
    <main>
      {/* About Section */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row g-5 align-items-center mb-8 sm:mb-12">
            <div className="col-lg-6">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group" style={{ height: '500px' }}>
                <Image
                  className="w-100 h-100 rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  src="/img/about.png"
                  alt="Mud Beaver Sikkim"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-6 left-6 bg-white rounded-xl shadow-xl p-4 sm:p-5 transform hover:scale-110 transition-transform duration-300 z-10">
                  <div className="flex flex-col justify-center items-center h-full p-3 sm:p-4 rounded-lg bg-gradient-to-br from-[#964B00] to-[#b85c00]">
                    <h1 className="text-white mb-1 text-xl sm:text-2xl font-heading font-bold">Mud</h1>
                    <h2 className="text-white mb-1 text-xl sm:text-2xl font-heading font-bold">Beavers</h2>
                    <h5 className="text-white mb-0 text-sm sm:text-base font-heading">Sikkim</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  About Us
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                  From Soil to Sanctuary: Building Sustainable Beauty at Mud Beaver Sikkim!
                </h1>
              </div>
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-4 group cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-building text-lg"></i>
                  </div>
                  <h5 className="font-heading font-bold text-[#964B00] mb-0 text-lg sm:text-xl group-hover:text-[#b85c00] transition-colors duration-300">
                    THE ENTERPRISE
                  </h5>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Mud Beaver Sikkim is a socio-sustainable construction enterprise focussing on specialisation in
                  research, development, promotion and transfer of earth based building technologies.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-0">
                  We construct timeless, unique traditional, vernacular, cost effective, low carbon embodied, climate
                  responsive, energy efficient dwellings alongside designing and implementing green products & practices
                  to sustainably contribute as a part of the project but development as a whole.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="row g-4 sm:g-6 mb-8 sm:mb-12">
            {[
              { number: '4+', label: 'Years of Experience', icon: 'fa-calendar-alt' },
              { number: '50+', label: 'Projects Completed', icon: 'fa-project-diagram' },
              { number: '100%', label: 'Sustainable Focus', icon: 'fa-leaf' },
            ].map((stat, index) => (
              <div key={index} className="col-md-4">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 hover:border-[#964B00]/30">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-full mb-4 shadow-md">
                    <i className={`fas ${stat.icon} text-xl sm:text-2xl`}></i>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#964B00] mb-2">{stat.number}</h3>
                  <p className="text-base sm:text-lg text-gray-700 font-semibold mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section Divider */}
          <div className="relative py-8 sm:py-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-500 text-sm">
                <i className="fas fa-bullseye text-[#964B00] mr-2"></i>
                Mission & Vision
              </span>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="row g-4 sm:g-6 mb-8 sm:mb-12">
            <div className="col-lg-6">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-xl h-100 border-l-4 border-[#964B00] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-full flex items-center justify-center shadow-md mr-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-bullseye text-lg sm:text-xl"></i>
                  </div>
                  <h4 className="mb-0 font-heading font-bold text-gray-900 text-xl sm:text-2xl group-hover:text-[#964B00] transition-colors duration-300">Mission</h4>
                </div>
                <p className="mb-0 text-base sm:text-lg text-gray-700 leading-relaxed">
                  To build earthen dwellings of timeless, natural beauty, contributing to quality sustainable homes that
                  will continue to be a pleasure to live for generations to come with an absolute positive future impact.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-xl h-100 border-l-4 border-[#964B00] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-full flex items-center justify-center shadow-md mr-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-eye text-lg sm:text-xl"></i>
                  </div>
                  <h4 className="mb-0 font-heading font-bold text-gray-900 text-xl sm:text-2xl group-hover:text-[#964B00] transition-colors duration-300">Vision</h4>
                </div>
                <p className="mb-0 text-base sm:text-lg text-gray-700 leading-relaxed">
                  We believe in &quot;building future&quot;, a &quot;green future&quot; of natural beauty, resilient and green
                  regenerative structure designed & built to live, endure and honour many generation to come. We believe
                  in bringing positive and proper changes within the building industry and creating physical expression of
                  our love for the planet and our future.
                </p>
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
                <i className="fas fa-gem text-[#964B00] mr-2"></i>
                Our Foundation
              </span>
            </div>
          </div>

          {/* Values Section */}
          <div className="row mb-8 sm:mb-12">
            <div className="col-12 text-center mb-8 sm:mb-12">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 inline-block text-left">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Our Foundation
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-0">
                  Our Values
                </h1>
              </div>
            </div>
          </div>

          <div className="row g-6 sm:g-8">
            {[
              {
                icon: 'fa-lightbulb',
                title: 'Innovation',
                quote: 'Genuine curiosity to learn and improve.',
                description:
                  '4 years of research and development has taught us one thing, that the pursuit of excellence never ends, but greatness can happen along the way.',
              },
              {
                icon: 'fa-shield-alt',
                title: 'Durability',
                quote: 'We build things that last.',
                description:
                  'We build to withstand extreme weather, fire and earthquakes, uniquely capable of enduring the test of time, with very least maintenance.',
              },
              {
                icon: 'fa-leaf',
                title: 'Sustainable to the Core',
                quote: 'We strive to achieve green-building in the truest sense of the term.',
                description:
                  'We believe that currently, most greenbuilding is just not that. All the sustainable approaches only comes handy when we use the resources that are mostly locally found around us, doing that we can help ourselves economically, socially & can sustain our lives for more future to come but with responsibility.',
              },
              {
                icon: 'fa-hands-helping',
                title: 'Local/Student Empowerment',
                quote: 'An opportunity will go a long way.',
                description:
                  'We don\'t believe in hiring but making someone a part of what we do, where in we share-camaraderie to learn, improve and grow together by providing opportunities specially to the student\'s and the local\'s.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="col-lg-6"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <div className={`p-5 sm:p-6 rounded-xl transition-all duration-300 ${
                  hoveredValue === index 
                    ? 'bg-white shadow-xl border-2 border-[#964B00]/30 -translate-y-1' 
                    : 'bg-gray-50/50 hover:bg-white hover:shadow-lg'
                }`}>
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#964B00] to-[#b85c00] text-white rounded-lg flex items-center justify-center mr-4 transition-transform duration-300 ${
                      hoveredValue === index ? 'scale-110 rotate-3' : ''
                    }`}>
                      <i className={`fas ${value.icon} text-base sm:text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-heading font-bold mb-2 text-lg sm:text-xl transition-colors duration-300 ${
                        hoveredValue === index ? 'text-[#964B00]' : 'text-gray-900'
                      }`}>
                        {value.title}
                      </h5>
                      <blockquote className={`border-l-4 pl-3 mb-3 italic text-sm sm:text-base font-serif transition-all duration-300 ${
                        hoveredValue === index 
                          ? 'border-[#964B00] text-[#964B00]' 
                          : 'border-[#964B00]/50 text-[#964B00]/80'
                      }`}>
                        &quot;{value.quote}&quot;
                      </blockquote>
                      <p className="mb-0 text-base sm:text-lg text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
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
