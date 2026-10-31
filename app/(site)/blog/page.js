import Footer from "@/components/Footer"
import SiteScripts from "@/components/SiteScripts"
import { getFromApi } from "@/lib/api"

// The blog sliders use Bootstrap 4 data attributes (data-ride / data-slide)
const BLOG_SCRIPTS = ["https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"]

export const metadata = {
    title: "Blog-MudBeaverSikkim",
}

export const dynamic = "force-dynamic"

export default async function BlogPage() {
    const data = await getFromApi("/blogs", [])

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-4 text-white animated slideInDown mb-4">Blog</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Pages</a>
                            </li>
                            <li className="breadcrumb-item text-primary active" aria-current="page">blog</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}
            {/* Team Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-end mb-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="border-start border-5 border-primary ps-4">
                                <h6 className="text-body text-uppercase mb-2">Blogs/News</h6>
                                <h1 className="display-6 mb-0">Our Latest Updates</h1>
                            </div>
                        </div>
                    </div>
                    {data.map((post) => (
                    <div className="news" key={post.id}>
                        {/* posts begin */}
                        <div className="row gx-5">
                            <div className="col-md-6 mb-4">
                                <div
                                    className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* slider start */}
                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img className="d-block w-100" src={post.image[0]} alt="first slide image" />
                                            </div>
                                            {post.image.map((image, index) => (
                                                <div className="carousel-item" key={index}>
                                                    <img className="d-block w-100" src={image} alt="slide" />
                                                </div>
                                            ))}
                                        </div>
                                        <a
                                            className="carousel-control-prev"
                                            href="#carouselExampleIndicators"
                                            role="button"
                                            data-slide="prev"
                                        >
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a
                                            className="carousel-control-next"
                                            href="#carouselExampleIndicators"
                                            role="button"
                                            data-slide="next"
                                        >
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                    {/* Slider End */}
                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">News of the day</span>
                                <h4>
                                    <strong>{post.title}</strong>
                                </h4>
                                <p className="text-muted" id="myText">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                        {/*Section: News of the day*/}
                    </div>
                ))}
                    {/* posts end */}
                </div>
            </div>
            {/* Team End */}
            {/* Team End */}
            {/* Team Start */}
            {/* Team End */}
            <Footer />
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up"></i>
            </a>
            <SiteScripts extra={BLOG_SCRIPTS} />
        </>
    )
}
