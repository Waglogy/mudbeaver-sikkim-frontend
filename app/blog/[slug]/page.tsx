'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogAPI } from '@/lib/api'

interface Blog {
  _id: string
  title: string
  content: string
  images: string[]
  createdAt: string
  published: boolean
  slug?: string
  author?: {
    name?: string
    email?: string
  }
}

export default function BlogDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) {
        setError('Invalid blog post identifier')
        setLoading(false)
        return
      }

      console.log('Fetching blog with slug/ID:', slug)

      try {
        const data = await blogAPI.getById(slug)
        console.log('Fetched blog data:', data)
        if (data) {
          setBlog(data)
          setError(null)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        console.error('Error fetching blog:', err)
        let errorMessage = 'Failed to load blog post'
        
        if (err instanceof Error) {
          errorMessage = err.message
          // Check for network/connection errors
          if (err.message.includes('fetch') || err.message.includes('network')) {
            errorMessage = 'Unable to connect to server. Please check if the backend server is running.'
          }
        }
        
        setError(errorMessage)
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  const openImageModal = (image: string) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeImageModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  if (loading) {
    return (
      <main>
        <div className="container-xxl py-12 sm:py-16 md:py-20">
          <div className="container">
            <div className="text-center py-12 sm:py-16">
              <div className="spinner-border text-[#964B00]" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-4 text-gray-600">Loading blog post...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || (!loading && !blog)) {
    return (
      <main>
        <div className="container-xxl py-12 sm:py-16 md:py-20">
          <div className="container">
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <i className="fas fa-exclamation-triangle text-red-500 text-6xl sm:text-7xl"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4">
                  {error && error.includes('connect') ? 'Connection Error' : 'Blog Post Not Found'}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  {error || 'The blog post you are looking for does not exist.'}
                </p>
                {(process.env.NODE_ENV === 'development' || error?.includes('connect')) && slug && (
                  <div className="text-sm text-gray-500 mb-4 space-y-1">
                    <p>Slug/ID: {slug}</p>
                    {error?.includes('connect') && (
                      <p className="text-xs mt-2">
                        Make sure the backend server is running at {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}
                      </p>
                    )}
                  </div>
                )}
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-[#964B00] text-white rounded-lg hover:bg-[#7a3d00] transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // At this point, we know blog is not null
  if (!blog) {
    return null
  }

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-xxl py-4">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#964B00] transition-colors">
                Home
              </Link>
              <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
              <Link href="/blog" className="text-gray-500 hover:text-[#964B00] transition-colors">
                Blog
              </Link>
              <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
              <span className="text-gray-900 font-medium line-clamp-1">{blog.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Back Button */}
              <Link
                href="/blog"
                className="inline-flex items-center text-[#964B00] hover:text-[#7a3d00] mb-6 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Blog
              </Link>

              {/* Blog Header */}
              <div className="mb-8">
                <span className="inline-block bg-gradient-to-r from-[#964B00] to-[#b85c00] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  News of the day
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-4">
                  {blog.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <i className="far fa-calendar-alt mr-2"></i>
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  {blog.author && (
                    <div className="flex items-center">
                      <i className="fas fa-user mr-2"></i>
                      <span>{blog.author.name || blog.author.email || 'Admin'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Blog Images */}
              {blog.images && blog.images.length > 0 && (
                <div className="mb-8">
                  {blog.images.length === 1 ? (
                    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden cursor-pointer group" onClick={() => openImageModal(blog.images[0])}>
                      <Image
                        src={blog.images[0]}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <i className="fas fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl"></i>
                      </div>
                    </div>
                  ) : (
                    <div id="blogCarousel" className="carousel slide" data-bs-ride="carousel">
                      <ol className="carousel-indicators">
                        {blog.images.map((_, index) => (
                          <li
                            key={index}
                            data-bs-target="#blogCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                          ></li>
                        ))}
                      </ol>
                      <div className="carousel-inner rounded-2xl overflow-hidden">
                        {blog.images.map((image, index) => (
                          <div
                            key={index}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                          >
                            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] cursor-pointer group" onClick={() => openImageModal(image)}>
                              <Image
                                src={image}
                                alt={`${blog.title} - Image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="100vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <i className="fas fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl"></i>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#blogCarousel"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#blogCarousel"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 md:p-10">
                  <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                    {blog.content}
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this post</h3>
                    <div className="flex space-x-3">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blog.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(blog.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      {typeof window !== 'undefined' && (
                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(window.location.href)
                              alert('Link copied to clipboard!')
                            }
                          }}
                          className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                          aria-label="Copy link"
                        >
                          <i className="fas fa-link"></i>
                        </button>
                      )}
                    </div>
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-[#964B00] text-white rounded-lg hover:bg-[#7a3d00] transition-colors"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            aria-label="Close"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={selectedImage}
                alt="Blog image"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}