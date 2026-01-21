'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/internship', label: 'Internships' },
    { href: '/teams', label: 'Team' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline" onClick={closeMenu}>
            <Image
              src="/img/logo.png"
              alt="Mud Beavers Sikkim Logo"
              width={150}
              height={60}
              className="h-12 md:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 no-underline relative group ${
                    isActive
                      ? 'text-[#964B00]'
                      : 'text-gray-700 hover:text-[#964B00]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#964B00] to-[#b85c00] transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-full nav-underline'
                        : 'w-0 group-hover:w-full'
                    }`}
                    style={{
                      boxShadow: isActive ? '0 2px 8px rgba(150, 75, 0, 0.4)' : 'none',
                    }}
                  ></span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#964B00] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#964B00] transition-colors"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 no-underline relative group ${
                    isActive
                      ? 'text-[#964B00]'
                      : 'text-gray-700 hover:text-[#964B00]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#964B00] to-[#b85c00] transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-full nav-underline'
                        : 'w-0 group-hover:w-full'
                    }`}
                    style={{
                      boxShadow: isActive ? '0 2px 8px rgba(150, 75, 0, 0.4)' : 'none',
                    }}
                  ></span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
