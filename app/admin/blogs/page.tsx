'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { blogAPI } from '@/lib/api'

interface Blog {
  _id: string
  title: string
  content: string
  images: string[]
  published: boolean
  createdAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const data = await blogAPI.getAllAdmin()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    try {
      await blogAPI.delete(id)
      fetchBlogs()
      setDeleteConfirm(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete blog post')
    }
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-2 text-gray-600">Manage all blog posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="px-6 py-3 bg-[#964B00] text-white rounded-lg hover:bg-[#7a3d00] transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Create New Post
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner-border text-[#964B00]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <i className="fas fa-blog text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blog Posts</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first blog post</p>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center px-6 py-3 bg-[#964B00] text-white rounded-lg hover:bg-[#7a3d00] transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Create New Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {blog.images && blog.images.length > 0 && (
                <div className="relative w-full h-48">
                  <Image
                    src={blog.images[0]}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      blog.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/blogs/${blog._id}/edit`}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}