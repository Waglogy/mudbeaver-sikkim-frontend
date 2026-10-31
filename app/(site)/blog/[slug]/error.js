"use client"
export default function ArticleError({ reset }) { return <main className="mb-page-section"><div className="mb-container mb-journal-empty"><h1>Our journal is taking a little pause.</h1><p>We couldn’t load this article. Please try again shortly.</p><button className="mb-btn mb-btn--primary" onClick={reset}>Try again</button><p><a href="/blog">Back to the journal</a></p></div></main> }
