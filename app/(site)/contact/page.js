import Footer from "@/components/Footer"
import ApiForm from "@/components/ApiForm"
import SiteScripts from "@/components/SiteScripts"

export const metadata = {
    title: "Contact",
}

export default function ContactPage() {
    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-4 text-white animated slideInDown mb-4">Contact Us</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Pages</a>
                            </li>
                            <li className="breadcrumb-item text-primary active" aria-current="page">Contact Us</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}
            {/* Contact Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="row g-4 align-items-center">
                                <div className="col-sm-6">
                                    <img className="img-fluid" src="/img/teams/PRAJWAL_TAMANG.png" alt="" />
                                </div>
                                <div className="col-sm-6">
                                    <h3 className="mb-0">Prajwal Tamang</h3>
                                    <p>Founder & CEO</p>
                                    <h6>Contact Details</h6>
                                    {/* <p>Lorem ipsum dolor sit amet conse elit sed eiu smod lab ore.</p> */}
                                    <p className="mb-0">Call: +91 89272 73545</p>
                                    <p className="mb-0">Email: mudbeaversikkim@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="row g-4 align-items-center">
                                <div className="col-sm-6">
                                    <img className="img-fluid" src="/img/teams/SALINA_RAI.png" alt="" />
                                </div>
                                <div className="col-sm-6">
                                    <h3 className="mb-0">Salina Rai</h3>
                                    <p>Creative Head / Product Designer / HR</p>
                                    <h6>Contact Details</h6>
                                    <p className="mb-0">Call: +91 81456 61267</p>
                                    <p className="mb-0">Email: info@mudbeaversikkim.in</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: "450px" }}>
                            <div className="position-relative h-100">
                                <iframe className="position-relative w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28401.4322003636!2d88.31847499527588!3d27.150656946551813!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4296e595ac3df%3A0xd188a8bd3d36ba28!2sMud%20Beaver%20Sikkim!5e0!3m2!1sen!2sin!4v1691827977981!5m2!1sen!2sin" width="600" height="450" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="border-start border-5 border-primary ps-4 mb-5">
                                <h6 className="text-body text-uppercase mb-2">Contact Us</h6>
                                <h1 className="display-6 mb-0">If You Have Any Query, Please Contact Us</h1>
                            </div>
                            <p className="mb-4">
                                <a href=""></a>
                                Questions? We're here to help! For any inquiries, reach out to us. Our team at
                                Mud Beavers is ready to assist you with all your queries, ensuring your
                                journey towards sustainable living is seamless and rewarding.
                            </p>
                            <ApiForm action="/contact" method="post">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control border-0 bg-light" id="name" placeholder="Your Name" name="name" />
                                            {" "}
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control border-0 bg-light" id="email" placeholder="Your Email" name="email" />
                                            {" "}
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control border-0 bg-light" id="subject" placeholder="Subject" name="subject" />
                                            {" "}
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control border-0 bg-light" placeholder="Leave a message here" name="message" id="message" style={{ height: "150px" }}></textarea>
                                            {" "}
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary py-3 px-5" type="submit" style={{ backgroundColor: "#964B00", borderColor: "#964B00" }}>
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </ApiForm>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
            {/* Footer Start */}
            <Footer />
            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top" style={{ backgroundColor: "#964B00" }}>
                <i className="bi bi-arrow-up"></i>
            </a>
            <SiteScripts />
        </>
    )
}
