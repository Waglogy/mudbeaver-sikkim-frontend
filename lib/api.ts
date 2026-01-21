// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json()
  
  if (!response.ok) {
    const error = data.message || data.errors?.[0]?.msg || 'An error occurred'
    throw new Error(error)
  }
  
  return data
}

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token')
  }
  return null
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{
    token: string
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await handleResponse<{
      token: string
      user: {
        id: string
        email: string
        name: string
        role: string
      }
    }>(response)
    if (data.token && typeof window !== 'undefined') {
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user', JSON.stringify(data.user))
    }
    return data
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
  },
  getCurrentUser: async (): Promise<{
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }> => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  isAuthenticated: (): boolean => {
    return getAuthToken() !== null
  },
  getToken: (): string | null => {
    return getAuthToken()
  },
}

// Contact API
export const contactAPI = {
  submit: async (data: { name: string; email: string; subject: string; message: string }) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  },
  getAll: async () => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  getById: async (id: string) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  updateStatus: async (id: string, status: string) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/contact/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
    return handleResponse(response)
  },
}

// Internship API
export const internshipAPI = {
  submit: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/internship`, {
      method: 'POST',
      body: formData,
    })
    return handleResponse(response)
  },
  getAll: async () => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/internship`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  getById: async (id: string) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/internship/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  updateStatus: async (id: string, status: string) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/internship/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
    return handleResponse(response)
  },
}

// Requirements API
export const requirementsAPI = {
  submit: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/requirements`, {
      method: 'POST',
      body: formData,
    })
    return handleResponse(response)
  },
  getAll: async () => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/requirements`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  getById: async (id: string) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/requirements/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  updateStatus: async (id: string, status: string) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/requirements/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
    return handleResponse(response)
  },
}

// Blog API
export const blogAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleResponse<Array<{
      _id: string
      title: string
      content: string
      images: string[]
      createdAt: string
      published: boolean
    }>>(response)
  },
  getAllAdmin: async () => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/blogs/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
  getById: async (id: string): Promise<{
    _id: string
    title: string
    content: string
    images: string[]
    published: boolean
    slug?: string
    createdAt: string
    author?: {
      name?: string
      email?: string
    }
  }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Failed to fetch blog: ${response.statusText}`)
      }
      
      return handleResponse(response)
    } catch (error) {
      console.error('API Error fetching blog:', error)
      throw error
    }
  },
  create: async (formData: FormData) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
    return handleResponse(response)
  },
  update: async (id: string, formData: FormData) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
    return handleResponse(response)
  },
  delete: async (id: string) => {
    const token = getAuthToken()
    if (!token) throw new Error('Not authenticated')
    
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return handleResponse(response)
  },
}