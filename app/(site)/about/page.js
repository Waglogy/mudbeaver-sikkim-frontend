import Footer from "@/components/Footer"
import SiteScripts from "@/components/SiteScripts"

export const metadata = {
    title: "About-mudbeaversikkim",
}

export default function AboutPage() {
    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-4 text-white animated slideInDown mb-4">About Us</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Pages</a>
                            </li>
                            <li className="breadcrumb-item text-primary active" aria-current="page">About</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}
            {/* About Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="position-relative overflow-hidden ps-5 pt-5 h-100" style={{ minHeight: "400px" }}>
                                <img className="position-absolute w-100 h-100" src="/img/about.png" alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-0 start-0 bg-white pe-3 pb-3" style={{ width: "200px", height: "200px" }}>
                                    <div className="d-flex flex-column justify-content-center text-center h-100 p-3" style={{ backgroundColor: "#964b00" }}>
                                        <h1 className="text-white">Mud</h1>
                                        <h2 className="text-white">Beavers</h2>
                                        <h5 className="text-white mb-0">Sikkim</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="h-100">
                                <div className="border-start border-5 border-primary ps-4 mb-5">
                                    <h6 className="text-body text-uppercase mb-2">About Us</h6>
                                    <h1 className="display-6 mb-0">
                                        From Soil to Sanctuary: Building Sustainable Beauty at Mud Beaver
                                        Sikkim!
                                    </h1>
                                </div>
                                <h5>THE ENTERPRISE.</h5>
                                <br />
                                <p>
                                    Mud Beaver Sikkim is a socio-sustainable construction enterprise focussing
                                    on specialisation in research, development, promotion and transfer of
                                    earth based building technologies.
                                    <br />
                                    <br />
                                    We construct timeless, unique traditional, vernacular, cost effective, low
                                    carbon embodied, climate responsive, energy efficient dwellings alongside
                                    designing and implementing green products & practices to sustainably
                                    contribute as a part of the project but development as a whole.
                                </p>
                                <h5>MISSION</h5>
                                <p>
                                    To build earthen dwellings of timeless, natural beauty, contributing to
                                    quality sustainable homes that will continue to be a pleasure to live for
                                    generations to come with an absolute positive future impact.
                                </p>
                                <br />
                                <br />
                                <h5>VISION</h5>
                                <p>
                                    We believe in “building future”, a “green future” of natural beauty,
                                    resilient and green regenerative structure designed & built to live,
                                    endure and honour many generation to come.
                                    <br />
                                    <br />
                                    <br />
                                    We believe in bringing positive and proper changes within the building
                                    industry in context of constructional practises being carried.
                                    <br />
                                    <br />
                                    We look forward in creating physical expression of our love for the planet
                                    and our future along with green practices to accept/embrace.
                                </p>
                                <br />
                                <br />
                                <h4>OUR VALUES</h4>
                                <br />
                                <br />
                                <h5>Innovation:</h5>
                                <quote>
                                    <i>
                                        <b>“Genuine curiosity to learn and improve.”</b>
                                    </i>
                                </quote>
                                <br />
                                <p>
                                    4 years of research and development has taught us one thing, that the
                                    pursuit of excellence never ends, but greatness can happen along the way.
                                </p>
                                <h5>Durability:</h5>
                                <quote>
                                    <i>
                                        <b>“We build things that last.”</b>
                                    </i>
                                </quote>
                                <p>
                                    We build to withstand extreme weather,fire and earthquakes,uniquely
                                    capable of enduring the test oftime, with very least maintenance.
                                </p>
                                <h5>Beauty:</h5>
                                <quote>
                                    <i>
                                        <b>“A big chunk of layers of pretty surface.”</b>
                                    </i>
                                </quote>
                                <p>
                                    We believe in building things that are strong from the inside and has that
                                    quirky eye appealing surface from the outside.
                                </p>
                                <br />
                                <h5>Sustainable to the core:</h5>
                                <quote>
                                    <i>
                                        <b>
                                            “We strive to achieve green-building in the truest sense of the
                                            term.”
                                        </b>
                                    </i>
                                </quote>
                                <p>
                                    We believe that currently, most greenbuilding is just not that. In the
                                    current dominant building model, one or two environmental benefits are
                                    typically advertised with a lot of greenwashing, all the sustainable
                                    approaches only comes handy when we use the resources that are mostly
                                    locally found around us, doing that we can help ourselves economically,
                                    socially & can sustain our lives for more future to come but with
                                    responsibility.
                                </p>
                                <h5>Proper methodology:</h5>
                                <quote>
                                    <i>
                                        <b>“Getting things done the right way.”</b>
                                    </i>
                                </quote>
                                <p>
                                    At every stage of execution we don’t compromise on the code of practise
                                    that is to be followed, from the moment we think of doing a certain
                                    project everything will be done how it should be done, period!.
                                </p>
                                <br />
                                <h5>Local/Student empowerment.</h5>
                                <quote>
                                    <i>
                                        <b>“An opportunity will go a long way.”</b>
                                    </i>
                                </quote>
                                <p>
                                    We don’t believe in hiring but making someone a part of what we do, where
                                    in we share-camaraderie to learn, improve and grow together by providing
                                    opportunities specially to the student’s and the local’s.
                                </p>
                                {/* <p></p> <p class="mb-4"></p> */}
                                <div className="border-top mt-4 pt-4">
                                    <div className="row g-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Footer Start */}
            <Footer />
            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up"></i>
            </a>
            <SiteScripts />
        </>
    )
}
