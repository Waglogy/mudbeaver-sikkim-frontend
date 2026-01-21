'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { contactAPI, internshipAPI, requirementsAPI, blogAPI } from '@/lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    internships: 0,
    requirements: 0,
    blogs: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contacts, internships, requirements, blogs] = await Promise.all([
          contactAPI.getAll().catch(() => []),
          internshipAPI.getAll().catch(() => []),
          requirementsAPI.getAll().catch(() => []),
          blogAPI.getAllAdmin().catch(() => []),
        ])

        setStats({
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          internships: Array.isArray(internships) ? internships.length : 0,
          requirements: Array.isArray(requirements) ? requirements.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Contacts',
      count: stats.contacts,
      icon: 'fas fa-envelope',
      color: 'bg-blue-500',
      link: '/admin/contacts',
    },
    {
      title: 'Internships',
      count: stats.internships,
      icon: 'fas fa-user-graduate',
      color: 'bg-green-500',
      link: '/admin/internships',
    },
    {
      title: 'Requirements',
      count: stats.requirements,
      icon: 'fas fa-clipboard-list',
      color: 'bg-yellow-500',
      link: '/admin/requirements',
    },
    {
      title: 'Blog Posts',
      count: stats.blogs,
      icon: 'fas fa-blog',
      color: 'bg-purple-500',
      link: '/admin/blogs',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to the admin panel</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner-border text-[#964B00]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center">
                <div className={`${card.color} rounded-lg p-3 text-white`}>
                  <i className={`${card.icon} text-2xl`}></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/blogs/new"
            className="flex items-center justify-center px-6 py-3 bg-[#964B00] text-white rounded-lg hover:bg-[#7a3d00] transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Create New Blog Post
          </Link>
          <Link
            href="/admin/contacts"
            className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-envelope mr-2"></i>
            View All Contacts
          </Link>
        </div>
      </div>
    </div>
  )
}