'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="spinner-border text-[#964B00]" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}