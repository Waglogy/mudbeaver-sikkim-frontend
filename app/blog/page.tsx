'use client'

import { useState, useEffect } from 'react'
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
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll()
        console.log('Fetched blogs:', data)
        // Log slug and ID for debugging
        data.forEach((blog: Blog) => {
          console.log(`Blog: ${blog.title}, ID: ${blog._id}, Slug: ${blog.slug || 'NO SLUG'}, Published: ${blog.published}`)
        })
        setBlogs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <main>
      {/* Blog Posts */}
      <div className="container-xxl py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="row g-5 align-items-end mb-8 sm:mb-12">
            <div className="col-lg-6">
              <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h6 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                  Blogs/News
                </h6>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight mb-0">
                  Our Latest Updates
                </h1>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 sm:py-16">
              <div className="spinner-border text-[#964B00]" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <i className="fas fa-exclamation-triangle text-red-500 text-6xl sm:text-7xl"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4">Error Loading Blogs</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{error}</p>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <i className="fas fa-newspaper text-[#964B00] text-6xl sm:text-7xl opacity-20"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4">No Blog Posts Yet</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  We&apos;re working on bringing you the latest updates and insights. Check back soon!
                </p>
              </div>
            </div>
          ) : (
            <div className="row g-6 sm:g-8">
              {blogs.map((blog, index) => {
                // Ensure we use string ID if slug doesn't exist
                const blogSlug = blog.slug || String(blog._id)
                const contentPreview = blog.content.length > 200 
                  ? blog.content.substring(0, 200) + '...' 
                  : blog.content

                console.log(`Blog link: ${blog.title} -> /blog/${blogSlug} (slug: ${blog.slug || 'none'}, id: ${blog._id})`)

                return (
                  <div key={blog._id} className="col-12 mb-8 sm:mb-12">
                    <Link href={`/blog/${blogSlug}`} className="block h-100 no-underline">
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer">
                        <div className="row g-0">
                          <div className="col-md-6">
                            <div className="relative h-full min-h-[300px] sm:min-h-[400px]">
                              {blog.images && blog.images.length > 0 ? (
                                <div id={`carousel-${index}`} className="carousel slide h-100" data-bs-ride="carousel">
                                  <ol className="carousel-indicators">
                                    {blog.images.map((_, imgIndex) => (
                                      <li
                                        key={imgIndex}
                                        data-bs-target={`#carousel-${index}`}
                                        data-bs-slide-to={imgIndex}
                                        className={imgIndex === 0 ? 'active' : ''}
                                      ></li>
                                    ))}
                                  </ol>
                                  <div className="carousel-inner h-100">
                                    {blog.images.map((image, imgIndex) => (
                                      <div key={imgIndex} className={`carousel-item h-100 ${imgIndex === 0 ? 'active' : ''}`}>
                                        <Image
                                          className="d-block w-100 h-100"
                                          src={image}
                                          alt={`Slide ${imgIndex + 1}`}
                                          fill
                                          style={{ objectFit: 'cover' }}
                                          sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target={`#carousel-${index}`}
                                    data-bs-slide="prev"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                  </button>
                                  <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target={`#carousel-${index}`}
                                    data-bs-slide="next"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="bg-gradient-to-br from-gray-100 to-gray-50 d-flex align-items-center justify-content-center h-100">
                                  <p className="text-gray-400 text-lg">No image available</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="p-5 sm:p-6 md:p-8 h-100 flex flex-col justify-between">
                              <div>
                                <span className="inline-block bg-gradient-to-r from-[#964B00] to-[#b85c00] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
                                  News of the day
                                </span>
                                <h4 className="font-heading font-bold text-gray-900 mb-4 text-2xl sm:text-3xl hover:text-[#964B00] transition-colors">
                                  {blog.title}
                                </h4>
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                                  {contentPreview}
                                </p>
                                {blog.content.length > 200 && (
                                  <span className="inline-flex items-center text-[#964B00] font-semibold text-sm hover:text-[#7a3d00] transition-colors">
                                    Read more <i className="fas fa-arrow-right ml-2"></i>
                                  </span>
                                )}
                              </div>
                              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <small className="text-gray-500 text-sm">
                                  <i className="far fa-calendar-alt me-2"></i>
                                  Published: {new Date(blog.createdAt).toLocaleDateString()}
                                </small>
                                <span className="text-[#964B00] text-sm font-semibold">
                                  Read More <i className="fas fa-arrow-right ml-1"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
