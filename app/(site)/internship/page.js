import Footer from "@/components/Footer"
import ApiForm from "@/components/ApiForm"
import SiteScripts from "@/components/SiteScripts"

export const metadata = {
    title: "Internship-MudBeaverSikkim",
}

export default function InternshipPage() {
    return (
        <>
            {/* Loaded only on this page, after style.css, as in the original */}
            <link rel="stylesheet" href="/css/style2.css" precedence="default" />
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-4 text-white animated slideInDown mb-4">Internship</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-white" href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">Pages</a>
                            </li>
                            <li className="breadcrumb-item text-primary active" aria-current="page">Internship</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}
            <div className="demo-page">
                <div className="demo-page-navigation">
                    <nav>
                        <div className="container-xxl py-5">
                            <div className="container">
                                <div className="row g-5">
                                    <div className="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="border-start border-5 border-primary ps-4 mb-5">
                                            <h6 className="text-body text-uppercase mb-2">Internship</h6>
                                            <h1>Offering Internship Opportunities starting from ₹5,000</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <main className="demo-page-content">
                    <section>
                        <div className="href-target" id="input-types"></div>
                        <h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-align-justify">
                                <line x1="21" y1="10" x2="3" y2="10" />
                                <line x1="21" y1="6" x2="3" y2="6" />
                                <line x1="21" y1="14" x2="3" y2="14" />
                                <line x1="21" y1="18" x2="3" y2="18" />
                            </svg>
                            {" "}
                            Internship Form
                        </h1>
                        <p>
                            Mud Beaver Sikkim presents Summer Training cum Internship Introduction to modern
                            earth buildings Earth materials engineering and earth construction Earth building
                            technologies and earth construction techniques Modern earth structural engineering
                            Application of modern earth construction: international case studies Additional:
                            Techno-economic analysis and environmental assessment of stabilised rammed earth
                            (SRE) building construction Techno-economic analysis and environmental assessment
                            of stabilized insulated rammed earth (SIREWALL) building.
                        </p>
                        <ApiForm id="internship-form" action="/internship" encType="multipart/form-data" method="post">
                            <div className="nice-form-group">
                                <label>Name</label>
                                {" "}
                                <input type="text" placeholder="Your name" defaultValue="" name="name" required />
                            </div>
                            <div className="nice-form-group">
                                <label>Date of Birth</label>
                                {" "}
                                <input type="date" name="date_of_birth" />
                            </div>
                            <div className="nice-form-group">
                                <label>Email</label>
                                {" "}
                                <input type="email" placeholder="Your email" name="email" required />
                            </div>
                            <div className="nice-form-group">
                                <label>Phone Number</label>
                                {" "}
                                <input type="tel" placeholder="Your phone number" name="phone" required />
                            </div>
                            <div className="nice-form-group">
                                <label>Address</label>
                                {" "}
                                <input type="text" placeholder="Chisopani sikkim" name="address" required />
                            </div>
                            <div className="nice-form-group">
                                <label>City</label>
                                {" "}
                                <input type="text" placeholder="Jorthang" name="city" required />
                            </div>
                            <div className="nice-form-group">
                                <label>Region</label>
                                {" "}
                                <input type="text" placeholder="East" name="region" required />
                            </div>
                            <div className="nice-form-group">
                                <label>Zip Code</label>
                                {" "}
                                <input type="text" placeholder="737121" name="zip_code" required />
                            </div>
                            <label>Institution</label>
                            {" "}
                            <select name="institution" required>
                                <option>Select Institution</option>
                                <option>S.I.S.T (Sikkim Institute Of Science and Technology)</option>
                                <option>C.C.C.T (Center For Computers and Communication Technology)</option>
                            </select>
                        </ApiForm>
                    </section>
                </main>
            </div>
            <center>
                <br />
                <br />
                <span>
                    Amount To Pay
                    <h1>₹5,000</h1>
                </span>
            </center>
            <div className="nice-form-group">
                <img src="/img/internship_qr.jpg" className="img-fluid" alt="QR CODE" sizes="" srcSet="" />
            </div>
            <div className="nice-form-group">
                <label>Upload a screenshot of payment</label>
                {" "}
                <input type="file" name="image" accept=".png, .jpeg" required form="internship-form" />
            </div>
            <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit" style={{ backgroundColor: "#964B00" }} form="internship-form">
                    Submit
                </button>
            </div>
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
