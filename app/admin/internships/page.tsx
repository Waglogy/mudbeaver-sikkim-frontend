'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { internshipAPI } from '@/lib/api'

interface Internship {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  zip_code: string
  institution: string
  payment_screenshot: string
  status: string
  createdAt: string
  date_of_birth?: string
}

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null)

  useEffect(() => {
    fetchInternships()
  }, [])

  const fetchInternships = async () => {
    try {
      const data = await internshipAPI.getAll()
      setInternships(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching internships:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await internshipAPI.updateStatus(id, status)
      fetchInternships()
      if (selectedInternship?._id === id) {
        setSelectedInternship({ ...selectedInternship, status })
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update status')
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.toUpperCase()}
      </span>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Internship Applications</h1>
        <p className="mt-2 text-gray-600">Manage all internship applications</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner-border text-[#964B00]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Institution
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {internships.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No applications found
                        </td>
                      </tr>
                    ) : (
                      internships.map((internship) => (
                        <tr
                          key={internship._id}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedInternship?._id === internship._id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedInternship(internship)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {internship.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {internship.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {internship.institution}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(internship.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(internship.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-1">
            {selectedInternship ? (
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Application Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{selectedInternship.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedInternship.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedInternship.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{selectedInternship.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">City</label>
                    <p className="text-gray-900">{selectedInternship.city}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Region</label>
                    <p className="text-gray-900">{selectedInternship.region}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Zip Code</label>
                    <p className="text-gray-900">{selectedInternship.zip_code}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Institution</label>
                    <p className="text-gray-900">{selectedInternship.institution}</p>
                  </div>
                  {selectedInternship.payment_screenshot && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-2 block">Payment Screenshot</label>
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={selectedInternship.payment_screenshot}
                          alt="Payment screenshot"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-2">{getStatusBadge(selectedInternship.status)}</div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Update Status</label>
                    <select
                      value={selectedInternship.status}
                      onChange={(e) => updateStatus(selectedInternship._id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#964B00] focus:border-[#964B00]"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                Select an application to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}