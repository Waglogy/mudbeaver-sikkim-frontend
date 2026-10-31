import Footer from "@/components/Footer"
import SiteScripts from "@/components/SiteScripts"

export const metadata = {
    title: "Team",
}

export default function TeamPage() {
    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-4 text-white animated slideInDown mb-4">Our Team</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Pages</a>
                            </li>
                            <li className="breadcrumb-item text-primary active" aria-current="page">Our Team</li>
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
                                <h6 className="text-body text-uppercase mb-2">Our Team</h6>
                                <h1 className="display-6 mb-0">Our Expert team</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                            <p className="mb-0">
                                At Mud Beavers, our team is the heartbeat of our innovative projects. Our
                                expert workers blend years of experience with a passion for sustainable
                                construction. With each artisan's skillful touch, we transform earth into
                                architectural marvels that stand as a testament to their dedication. From
                                crafting resilient structures to nurturing a greener future, our expert
                                workers are the driving force behind Mud Beavers' commitment to excellence.
                            </p>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/PRAJWAL_TAMANG.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px" }}>
                                    <h5>Prajwal Tamang</h5>
                                    <span>Founder & CEO</span>
                                </div>
                            </div>
                            <p>
                                Diploma, B.Tech in Civil Engineering.
                                <br />
                                Earth & Bamboo tech specialised, trained from Earth Institute & Bamboo Centre
                                Auroville, Tamil Nadu.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/AASHA_TAMANG.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px" }}>
                                    <h5>Aasha Tamang</h5>
                                    <span>President</span>
                                </div>
                            </div>
                            <p>
                                Former Community facilitator under North East Rural Livelihood Project.
                                <br />
                                Block resource person under Sikkim Rural Livelihood Mission.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/PRAKASH_TAMANG.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h6>Prakash Tamang</h6>
                                    <span>
                                        <small>Finance Manager/Permaculture Guru</small>
                                    </span>
                                </div>
                            </div>
                            <p>
                                Bachelor's in Commerce.
                                <br />
                                20 years of administrative experience at finance section.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/SALINA_RAI.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Salina Rai</h5>
                                    <span>
                                        <small>Creative Head/Product Designer/HR</small>
                                    </span>
                                </div>
                            </div>
                            <p>
                                B.Tech in Civil Engineering.
                                <br />
                                Certification on Graphic designing
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/LHAKDEN_LEPCHA.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Lhakden Lepcha</h5>
                                    <span>MD/Landscape Designer</span>
                                </div>
                            </div>
                            <p>Diploma, B.Tech in Civil Engineering.</p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/BHOOMIKA_CHAUDHARI.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Bhoomika Chaudhari</h5>
                                    <span>
                                        <small>Architect</small>
                                    </span>
                                </div>
                            </div>
                            <p>
                                * Bachelor's in Architecture (A.O.A, Mumbai)
                                <br />
                                Specialises in Sustainable Architecture
                                <br />
                                Worked as intern at Dus Studio, Auroville.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Team End */}
            {/* Team Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/PRATAP_TAMANG.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Pratap Tamang</h5>
                                    <span>Project Manager</span>
                                </div>
                            </div>
                            <p>
                                Sikkim Region
                                <br />
                                15 years of experience in civil works. Specialised is Traditional/Vernacular
                                civil construction.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/INDRA_KUMAR_TAMANG.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Indra Kumar Tamang</h5>
                                    <span>Project Manager</span>
                                </div>
                            </div>
                            <p>
                                West Bengal Region.
                                <br />
                                15 years of experience in civil works.
                                <br />
                                Specialised in traditional/vernacular carpentry, bamboo works.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/KAZI_MAN_LAMA.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Kazi Man Tamang</h5>
                                    <span>Project Manager</span>
                                </div>
                            </div>
                            <p>
                                Nepal.
                                <br />
                                15 years of experience in civil works.
                                <br />
                                Conventional civil works
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/NEDUP_ZANGPO_LEPCHA.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Nedup Zangpo Lepcha</h5>
                                    <span>
                                        Structural Engineer (Bamboo)
                                        {" "}
                                    </span>
                                </div>
                            </div>
                            <p>
                                Diploma, B.Tech in Civil Engineering.
                                <br />
                                *M.Tech in Structural Engineering (S.M.I.T, Majhitar)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Team End */}
            {/* Team Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/AASHUTOSH_TIWARI.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Aashutosh Tiwari</h5>
                                    <span>Aquaponics Guru</span>
                                </div>
                            </div>
                            <p>
                                Bachelor's in Fisheries.
                                <br />
                                Specialised with ornamental (aquarium) fishes & aquaculture
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/ACHONG_LEPCHA.png" alt="" />
                                <div className="team-text bg-white p-4">
                                    <h5>Achong Lepcha</h5>
                                    <span>Solar Energy Guru</span>
                                </div>
                            </div>
                            <p>Diploma, B.Tech in Civil Engineering.</p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/PRAVESH_PRADHAN.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Pravesh Pradhan</h5>
                                    <span>Rain Water Harvesting Guru</span>
                                </div>
                            </div>
                            <p>
                                Diploma, B.Tech in Civil Engineering.
                                <br />
                                Worked as technician for RWH project's.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/AMIT_RAI.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Amit Rai</h5>
                                    <span>Zero Waste Management Guru</span>
                                </div>
                            </div>
                            <p>
                                Diploma, B.Tech in Civil Engineering.
                                <br />
                                Certification on Waste management.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/teams/headtech.png" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px", width: "fit-content" }}>
                                    <h5>Nandeshwar Rabha</h5>
                                    <span>Head Technician</span>
                                </div>
                            </div>
                            <p>Trained and experienced in Earthen Construction.</p>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <img className="img-fluid" src="/img/gaonn.jpg" alt="" />
                                <div className="team-text bg-white p-4" style={{ height: "90px" }}>
                                    <h5>Namrakh Subba</h5>
                                    <span>Influencer Partner</span>
                                </div>
                            </div>
                            <p>
                                <a href="https://www.instagram.com/goankobhai/">
                                    Instagram: @goankobhai
                                    {" "}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Team End */}
            <Footer />
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up"></i>
            </a>
            <SiteScripts />
        </>
    )
}
