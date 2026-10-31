import { blogPath } from "@/lib/blogUrls"
import { absoluteUrl } from "@/lib/seo"
import PageIntro from "@/components/PageIntro"
import PageEnd from "@/components/PageEnd"
import BlogGallery from "@/components/BlogGallery"
import { getFromApi } from "@/lib/api"
export const metadata = {
    title: "Sustainable Building Journal | Mud Beavers Sikkim",
    description: "Explore stories and ideas about earth construction, climate-responsive homes, and sustainable living from Mud Beavers Sikkim.",
    alternates: { canonical: absoluteUrl("/blog") },
    openGraph: { type: "website", title: "Our Journal | Mud Beavers Sikkim", description: "Ideas and stories about sustainable building and living in Sikkim.", url: absoluteUrl("/blog") },
}
export const dynamic = "force-dynamic"
export default async function BlogPage() {
    const response = await getFromApi("/blogs", null)
    const posts = Array.isArray(response) ? response : null
    return <><main>
        <PageIntro eyebrow="Our Journal" title="Stories from" accent="the ground up." description="Notes from our projects, ideas for a greener way of life, and moments from the Mud Beavers community." />
        <section className="mb-page-section mb-journal-section"><div className="mb-container"><div className="mb-journal-heading"><p className="mb-section-eyebrow">BLOGS & NEWS</p><span>{posts ? `${posts.length} ${posts.length === 1 ? "story" : "stories"} to explore` : "OUR LATEST UPDATES"}</span></div>
            {posts?.length ? <div className="mb-journal-list">{posts.map((post, index) => {
                const date = post.created_at ? new Date(post.created_at) : null
                const validDate = date && !Number.isNaN(date.getTime())
                return <article className="mb-journal-card" key={post.id}><BlogGallery images={post.image} title={post.title} /><div className="mb-journal-card__body"><div className="mb-journal-card__meta"><span>FROM THE JOURNAL / {String(index + 1).padStart(2, "0")}</span>{validDate && <time dateTime={date.toISOString()}>{date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })}</time>}</div><h2><a href={blogPath(post)}>{post.title}</a></h2><p className="mb-journal-card__excerpt">{post.content.replace(/\s+/g, " ").slice(0, 260)}{post.content.length > 260 ? "…" : ""}</p><a className="mb-journal-card__read" href={blogPath(post)}>Read the story <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a></div></article>
            })}</div> : <div className="mb-journal-empty"><i className="fas fa-seedling" aria-hidden="true"></i><h2>{posts ? "Good stories take time to grow." : "Our journal is taking a little pause."}</h2><p>{posts ? "Our latest project stories and updates will appear here. In the meantime, follow along with our community." : "We couldn’t load our stories right now. Please try again shortly."}</p>{posts ? <a className="mb-btn mb-btn--primary" href="https://www.instagram.com/mudbeaver.sikkim/">Follow our journey <i className="bi bi-arrow-up-right" aria-hidden="true"></i></a> : <a className="mb-btn mb-btn--primary" href="/blog">Try again <i className="bi bi-arrow-clockwise" aria-hidden="true"></i></a>}</div>}
        </div></section>
    </main><PageEnd /></>
}
