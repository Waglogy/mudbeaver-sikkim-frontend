'use client'

import { useState, useEffect } from 'react'
import { requirementsAPI } from '@/lib/api'

interface Requirement {
  _id: string
  username: string
  email: string
  phone: string
  address?: string
  site_details?: string
  area?: string
  budget?: string
  category?: string
  services?: string
  drawings?: string
  message?: string
  status: string
  createdAt: string
}

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null)

  useEffect(() => {
    fetchRequirements()
  }, [])

  const fetchRequirements = async () => {
    try {
      const data = await requirementsAPI.getAll()
      setRequirements(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching requirements:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await requirementsAPI.updateStatus(id, status)
      fetchRequirements()
      if (selectedRequirement?._id === id) {
        setSelectedRequirement({ ...selectedRequirement, status })
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update status')
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      quoted: 'bg-purple-100 text-purple-800',
      closed: 'bg-green-100 text-green-800',
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
        <h1 className="text-3xl font-bold text-gray-900">Requirements & Appointments</h1>
        <p className="mt-2 text-gray-600">Manage all project requirements and appointment requests</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner-border text-[#964B00]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requirements List */}
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
                        Phone
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
                    {requirements.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No requirements found
                        </td>
                      </tr>
                    ) : (
                      requirements.map((requirement) => (
                        <tr
                          key={requirement._id}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedRequirement?._id === requirement._id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedRequirement(requirement)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {requirement.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {requirement.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {requirement.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(requirement.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(requirement.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Requirement Details */}
          <div className="lg:col-span-1">
            {selectedRequirement ? (
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Requirement Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{selectedRequirement.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedRequirement.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedRequirement.phone}</p>
                  </div>
                  {selectedRequirement.address && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Address</label>
                      <p className="text-gray-900">{selectedRequirement.address}</p>
                    </div>
                  )}
                  {selectedRequirement.site_details && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Site Details</label>
                      <p className="text-gray-900">{selectedRequirement.site_details}</p>
                    </div>
                  )}
                  {selectedRequirement.area && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Area</label>
                      <p className="text-gray-900">{selectedRequirement.area}</p>
                    </div>
                  )}
                  {selectedRequirement.budget && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Budget</label>
                      <p className="text-gray-900">{selectedRequirement.budget}</p>
                    </div>
                  )}
                  {selectedRequirement.category && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Category</label>
                      <p className="text-gray-900">{selectedRequirement.category}</p>
                    </div>
                  )}
                  {selectedRequirement.services && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Services</label>
                      <p className="text-gray-900">{selectedRequirement.services}</p>
                    </div>
                  )}
                  {selectedRequirement.drawings && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-2 block">Drawings</label>
                      <a
                        href={selectedRequirement.drawings}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#964B00] hover:underline"
                      >
                        <i className="fas fa-file-pdf mr-2"></i>View PDF
                      </a>
                    </div>
                  )}
                  {selectedRequirement.message && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Message</label>
                      <p className="text-gray-900">{selectedRequirement.message}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-2">{getStatusBadge(selectedRequirement.status)}</div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Update Status</label>
                    <select
                      value={selectedRequirement.status}
                      onChange={(e) => updateStatus(selectedRequirement._id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#964B00] focus:border-[#964B00]"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                Select a requirement to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}