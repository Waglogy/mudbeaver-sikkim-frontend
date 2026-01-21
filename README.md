# Mud Beavers Sikkim - Next.js Frontend

This project has been migrated from Express.js/EJS to Next.js with Tailwind CSS. This is a frontend-only application.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## Notes

- This is a frontend-only application - no backend/API routes
- Forms are present but show alerts when submitted (no actual submission)
- Static assets in `public` directory are automatically served by Next.js
- Bootstrap JavaScript is loaded via CDN for carousel and other interactive features
- The old Express.js server files are preserved but not used
