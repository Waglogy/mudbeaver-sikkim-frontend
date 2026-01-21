# Mud Beavers Sikkim - Next.js Frontend

This project has been migrated from Express.js/EJS to Next.js with Tailwind CSS. The frontend is now connected to a Node.js/Express backend API.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- MongoDB database (for backend)
- Cloudinary account (for image/file uploads)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update `NEXT_PUBLIC_API_URL` to point to your backend API (default: `http://localhost:5000/api`)

3. Start the backend server:
```bash
cd mudbeaver-backend
npm install
# Create .env file with MongoDB URI, Cloudinary credentials, etc.
npm run create-admin  # Create admin user
npm run dev  # Start backend server
```

4. Run the frontend development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── contact/            # Contact page
│   ├── internship/         # Internship page
│   ├── services/          # Services page
│   ├── teams/              # Teams page
│   ├── techniques/         # Techniques page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Footer component
└── public/                 # Static assets
```

## Features

- **Server-Side Rendering (SSR)**: Pages are rendered on the server for better SEO
- **Static Site Generation**: Optimized for performance
- **Responsive Design**: Bootstrap 5 + Tailwind CSS for styling
- **TypeScript**: Type-safe code throughout the application

## Pages

- `/` - Home page
- `/about` - About Us page
- `/services` - Services page
- `/contact` - Contact page
- `/blog` - Blog page
- `/internship` - Internship application page
- `/teams` - Team members page
- `/techniques` - Building techniques page

## Styling

- Bootstrap 5 is included via CDN for compatibility with existing styles
- Tailwind CSS is configured and ready to use
- Custom styles in `app/globals.css`

## Building for Production

```bash
npm run build
npm start
```

## Backend Integration

The frontend is connected to a backend API located in the `mudbeaver-backend` directory. The backend handles:

- **Contact Form**: Submit contact inquiries
- **Internship Applications**: Submit internship applications with payment screenshot uploads
- **Requirements Form**: Submit project requirements with optional PDF drawings
- **Blog Posts**: Fetch and display blog posts (up to 4 images per post)
- **Admin Authentication**: JWT-based admin authentication for managing content

### API Configuration

The frontend communicates with the backend via the API utility in `lib/api.ts`. Make sure to:

1. Set `NEXT_PUBLIC_API_URL` in your `.env.local` file
2. Ensure CORS is properly configured on the backend
3. Backend should be running on the configured port (default: 5000)

### Forms

All forms are now functional and connected to the backend:
- Contact form (`/contact`)
- Internship application form (`/internship`) - includes file upload
- Requirements form (homepage) - includes optional PDF upload
- Appointment form (homepage)

### Blog Posts

Blog posts are fetched from the backend API. The blog page displays published posts with support for up to 4 images per post.

## Notes

- Static assets in `public` directory are automatically served by Next.js
- Bootstrap JavaScript is loaded via CDN for carousel and other interactive features
- Backend API documentation is available in `mudbeaver-backend/README.md`
