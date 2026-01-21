import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="text-center">
        <h1 className="display-1 fw-bold" style={{ color: '#964B00' }}>
          404
        </h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead mb-4">The page you are looking for does not exist.</p>
        <Link href="/" className="btn btn-primary btn-lg" style={{ backgroundColor: '#964B00', borderColor: '#964B00' }}>
          Go Back Home
        </Link>
      </div>
    </main>
  )
}
