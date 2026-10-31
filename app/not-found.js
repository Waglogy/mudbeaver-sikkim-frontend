import SiteChrome from "@/components/SiteChrome"
import PageEnd from "@/components/PageEnd"

export const metadata = {
    title: "Page not found | Mud Beavers Sikkim",
}

// 404: the chomper beaver has chewed through this page
export default function NotFound() {
    return (
        <SiteChrome>
            <main className="mb-404">
                <div className="mb-container mb-404__inner">
                    <div className="mb-404__art" aria-hidden="true">
                        <span className="mb-404__digits">
                            4<span>0</span>4
                        </span>
                        <img
                            src="/img/beaver/beaver-chomper.webp"
                            alt=""
                            width="220"
                            height="240"
                        />
                        <span className="mb-404__chips">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </div>
                    <div className="mb-404__text">
                        <p className="mb-section-eyebrow">ERROR 404</p>
                        <h1>Oops! Our beaver chewed through this page.</h1>
                        <p>
                            The page you were looking for doesn’t exist, or it
                            has moved. Let’s get you back on solid ground.
                        </p>
                        <div className="mb-404__actions">
                            <a className="mb-btn mb-btn--primary" href="/">
                                Back to home
                                <i
                                    className="bi bi-arrow-right"
                                    aria-hidden="true"
                                ></i>
                            </a>
                            <a className="mb-404__link" href="/contact">
                                Contact us
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <PageEnd />
        </SiteChrome>
    )
}
