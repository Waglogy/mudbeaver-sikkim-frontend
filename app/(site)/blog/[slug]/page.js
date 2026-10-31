import { permanentRedirect } from "next/navigation"
import PageEnd from "@/components/PageEnd"
import BlogGallery from "@/components/BlogGallery"
import { getBlog } from "@/lib/blogDetail"
import { blogPath, articleDescription } from "@/lib/blogUrls"
import { absoluteUrl, BRAND, jsonLd } from "@/lib/seo"
import { getFromApi } from "@/lib/api"
export const dynamic = "force-dynamic"
export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = await getBlog(slug)
    const title = post.seo_title || `${post.title} | ${BRAND}`
    const description = articleDescription(post)
    const url = absoluteUrl(blogPath(post))
    const images = post.image.map(absoluteUrl)
    return { title, description, alternates: { canonical: url }, openGraph: { type: "article", title, description, url, siteName: BRAND, publishedTime: post.created_at, modifiedTime: post.updated_at, authors: [BRAND], ...(images.length ? { images } : {}) }, twitter: { card: images.length ? "summary_large_image" : "summary", title, description, ...(images.length ? { images } : {}) } }
}
export default async function BlogDetailPage({ params }) {
    const { slug } = await params
    const post = await getBlog(slug)
    const path = blogPath(post)
    if (`/blog/${slug}` !== path) permanentRedirect(path)
    const allPosts = await getFromApi("/blogs", [])
    const related = (Array.isArray(allPosts) ? allPosts : []).filter(item => item.id !== post.id).slice(0, 2)
    const minutes = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))
    const date = new Date(post.created_at)
    const schema = [
        { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: articleDescription(post), mainEntityOfPage: absoluteUrl(path), url: absoluteUrl(path), datePublished: post.created_at, dateModified: post.updated_at, author: { "@type": "Organization", name: BRAND, url: absoluteUrl("/about") }, publisher: { "@type": "Organization", name: BRAND, url: absoluteUrl("/") }, ...(post.image.length ? { image: post.image.map(absoluteUrl) } : {}), inLanguage: "en", articleBody: post.content },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Our Journal", item: absoluteUrl("/blog") }, { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(path) }] },
    ]
    return <><main className="mb-article"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} /><article>
        <header className="mb-article__header mb-container"><nav className="mb-page-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog">Our Journal</a><span aria-hidden="true">/</span><span aria-current="page">Article</span></nav><p className="mb-section-eyebrow">FROM THE JOURNAL</p><h1>{post.title}</h1><div className="mb-article__meta"><span>By <a href="/about">{BRAND}</a></span><time dateTime={date.toISOString()}>{date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}</time><span>{minutes} min read</span></div></header>
        {post.image.length > 0 && <div className="mb-container mb-article__gallery"><BlogGallery images={post.image} title={post.title} eager /></div>}
        <div className="mb-article__reading">{post.content.trim().split(/\n\s*\n/).map((paragraph, index) => paragraph.startsWith("## ") ? <h2 key={index}>{paragraph.slice(3)}</h2> : <p key={index}>{paragraph}</p>)}<div className="mb-article__end"><a href="/blog"><i className="bi bi-arrow-left" aria-hidden="true"></i> Back to the journal</a><a href="/services">Explore our services <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></div></div>
    </article>{related.length > 0 && <section className="mb-article__related mb-container" aria-labelledby="more-stories"><p className="mb-section-eyebrow">KEEP EXPLORING</p><h2 id="more-stories">More from the journal.</h2><div>{related.map(item => <a href={blogPath(item)} key={item.id}><span>FROM THE JOURNAL</span><h3>{item.title}</h3><p>{articleDescription(item)}</p><span>Read the story <i className="bi bi-arrow-up-right" aria-hidden="true"></i></span></a>)}</div></section>}
    <aside className="mb-article__invite mb-container"><div><h2>Have a project in mind?</h2><p>Let’s explore a thoughtful way to bring it to life.</p></div><a className="mb-btn mb-btn--primary" href="/contact">Talk to our team <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></aside></main><PageEnd /></>
}
