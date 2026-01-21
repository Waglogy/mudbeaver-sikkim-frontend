'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { authAPI } from '@/lib/api'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') {
      setIsLoading(false)
      return
    }

    // Check authentication
    if (!authAPI.isAuthenticated()) {
      router.push('/admin/login')
      return
    }

    // Verify token is valid
    authAPI.getCurrentUser()
      .then((userData) => {
        setUser(userData.user)
        setIsAuthenticated(true)
      })
      .catch(() => {
        authAPI.logout()
        router.push('/admin/login')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [pathname, router])

  const handleLogout = () => {
    authAPI.logout()
    router.push('/admin/login')
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-[#964B00]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show admin layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-gradient-to-r from-[#964B00] to-[#b85c00]">
            <h1 className="text-white text-xl font-bold">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/admin/dashboard"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/dashboard'
                  ? 'bg-[#964B00] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-tachometer-alt w-5 mr-3"></i>
              Dashboard
            </Link>
            <Link
              href="/admin/contacts"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/contacts'
                  ? 'bg-[#964B00] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-envelope w-5 mr-3"></i>
              Contacts
            </Link>
            <Link
              href="/admin/internships"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/internships'
                  ? 'bg-[#964B00] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-user-graduate w-5 mr-3"></i>
              Internships
            </Link>
            <Link
              href="/admin/requirements"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/requirements'
                  ? 'bg-[#964B00] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-clipboard-list w-5 mr-3"></i>
              Requirements
            </Link>
            <Link
              href="/admin/blogs"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/blogs'
                  ? 'bg-[#964B00] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-blog w-5 mr-3"></i>
              Blog Posts
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-[#964B00] rounded-full flex items-center justify-center text-white font-semibold">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{user?.email || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}