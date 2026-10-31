import Footer from "@/components/Footer"
import ApiForm from "@/components/ApiForm"
import SiteScripts from "@/components/SiteScripts"

export const metadata = {
    title: "Services",
}

export default function ServicesPage() {
    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-4 text-white animated slideInDown mb-4">Our Services</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Pages</a>
                            </li>
                            <li className="breadcrumb-item text-primary active" aria-current="page">Services</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}
            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-end mb-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="border-start border-5 border-primary ps-4">
                                <h6 className="text-body text-uppercase mb-2">Our Services</h6>
                                <h1 className="display-6 mb-0">Construction And Renovation Solutions</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 text-lg-end wow fadeInUp" data-wow-delay="0.3s">
                            <a className="btn btn-primary py-3 px-5" href="" style={{ backgroundColor: "#964B00", borderColor: "#964B00" }}>
                                More Services
                            </a>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/sd.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Sustainable consultant</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        We not only put on a lot of labour on building a den for our client
                                        but foremost we are here to give suggestion’s & advise for individuals
                                        who are interested in diving in to this world of sustainability,
                                        <br />
                                        from advice’s dealing with just building a green home to the selection
                                        of materials/products, technology used, etc and to actually practicing
                                        and living a sustainable lifestyle, we are here to thoroughly help you
                                        on your journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/2.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Traditional/vernacular sustainable designs</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        Providing design which are inspired from rich & aesthetically looking
                                        traditional buildings, preserving the local culture and heritage with
                                        a zest of passive design principles which helps the dwellings designed
                                        to be structural and climate responsive.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/3.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Green design optimisation</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        Apart form building fresh mud structure and systems, we also indulge
                                        our selves on re-designing and renovating existing conventional
                                        structures with various passive & sustainable principle’s & practices
                                        that makes a dwelling more climate responsive, green, resulting it to
                                        be energy efficient, self sufficient & much more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}
            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/22.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Green building certifications:</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        Since the services we provide helps a great deal in attaining
                                        sustainability, which also tick’s off a lot of criteria and norms for
                                        a building to be certified as green, therefore we are also here to get
                                        you certified for building & living the green way to show how
                                        responsible & caring you’re towards our planet earth.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/se.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Solar energy harvesting:</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        We provide services on capturing and storing solar energy emitted by
                                        the sun is known as solar energy harvesting. Subsequently, the thermal
                                        and light energy is transformed into electrical energy by an
                                        appropriate technique.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/rw.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Rain water harvesting :</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        One of many fields our project touches is the application of rain
                                        water harvesting. The practice of gathering rainfall runoff from a
                                        catchment (the region where water falls into bodies) in order to store
                                        it in above-ground ponds or aquifers for later use or to utilise
                                        immediately for irrigation is known as water harvesting. To put it
                                        simply, harvesting water involves directly collecting rainfall.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}
            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/55.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Permaculture:</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        The creation of an ecologically sound way of life in our homes,
                                        gardens, communities, and enterprises is the core of permaculture.
                                        With this project we want to help design and set up small-scale or
                                        large-scale fields for the purpose of self-sustaining irrigation. This
                                        will help provide food for oneself and their families
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/7.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Aquaponics:</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        Aquaponics is the cultivation of plants without soil in a
                                        recirculating environment that combines hydroponics (growing plants
                                        without soil) and aquaculture (raising fish and other aquatic
                                        creatures). In aquaponics, the waste produced by the fish is
                                        transformed into nutrients for the plants by nitrifying bacteria. To
                                        flourish, plant roots take up these nutrients. For the fish to
                                        survive, the plant roots purify and filter the water.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/si.jpg" alt="" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Sustainable landscaping:</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        We also plan and design spaces around with a critical consideration of
                                        preserving soils, land use, topography, etc. that heightens water
                                        management and thoughtful local flora/vegetation choices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/6.1.jpg" height="300px" width="350px" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Net Waste management:</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        One of the many problems being faced as of now might be the issues
                                        with the proper disposal of waste through lack of segregation etc. We
                                        will introduce a well-designed flow chart or a system that will have
                                        segregation of wastes as its core. Self-help groups will be introduced
                                        to act in the field and take the initiative to fulfil the introduced
                                        system’s objectives.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item bg-light overflow-hidden h-100">
                                <img className="" src="/img/st.jpg" height="300px" width="400px" alt="" />
                                <div className="service-text position-relative text-center h-100 p-4">
                                    <h5 className="mb-3">Sustainable interior designing:</h5>
                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        The structure that we build are of course a work of an art due a lot
                                        of enriching factors but what really matters at the end of the day is
                                        how ambient and cool it is from the inside, therefore we use locally
                                        produced product (sometimes recycled) that we design to fill in those
                                        spaces inside that will narrate the story of their own.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Appointment Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="border-start border-5 border-primary ps-4 mb-5">
                                <h6 className="text-body text-uppercase mb-2">Appointment</h6>
                                <h1 className="display-6 mb-0">
                                    Reserve Your Journey to Sustainable Living: Book Your Appointment with Mud
                                    Beavers Today!
                                </h1>
                            </div>
                            <p className="mb-0">
                                Imagine a home that seamlessly blends with nature, a dwelling that responds to
                                the climate while exuding timeless charm. When you book an appointment with
                                Mud Beavers, you're taking the first step towards turning this vision into
                                reality.
                            </p>
                        </div>
                        <div className="col-lg-7 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <ApiForm action="/services" method="post">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control bg-light border-0" id="gname" placeholder="Gurdian Name" name="name" />
                                            {" "}
                                            <label htmlFor="gname">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control bg-light border-0" id="gmail" placeholder="Gurdian Email" name="email" />
                                            {" "}
                                            <label htmlFor="gmail">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control bg-light border-0" id="cname" placeholder="Child Name" name="mobile" />
                                            {" "}
                                            <label htmlFor="cname">Your Mobile</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control bg-light border-0" id="cage" placeholder="Child Age" name="service_type" />
                                            {" "}
                                            <label htmlFor="cage">Service Type</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control bg-light border-0" placeholder="Leave a message here" id="message" name="message" style={{ height: "100px" }}></textarea>
                                            {" "}
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit" style={{ backgroundColor: "#964B00" }}>
                                            Get Appointment
                                        </button>
                                    </div>
                                </div>
                            </ApiForm>
                        </div>
                    </div>
                </div>
            </div>
            {/* Appointment End */}
            {/* Footer Start */}
            <Footer />
            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top" style={{ backgroundColor: "#964B00", borderColor: "#964B00" }}>
                <i className="bi bi-arrow-up"></i>
            </a>
            <SiteScripts />
        </>
    )
}
