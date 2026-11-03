import PageIntro from "@/components/PageIntro"
import PageEnd from "@/components/PageEnd"
import FactsReveal from "@/components/FactsReveal"

// Content from the Mud Beaver brochure "Why Choose Us?" pages (spelling tidied)

const REASONS = [
    {
        title: "Carbon footprint issues can be tackled",
        text: [
            "Our project provides an alternative to conventional (concrete) construction. Since concrete is used to build most roads, bridges, dams, and other structures worldwide, it emits a significant quantity of CO2. Aside from water, it is the most consumed product on the planet. This industry will continue to harm the environment with over 4 billion tonnes of carbon dioxide annually until global emissions are reduced.",
            "G20 and sustainable goals can be attained.",
        ],
        facts: [],
    },
    {
        title: "Fight climate change",
        text: [
            "All of the project's various techniques and features are provided with the aim of sustainable construction and the future in mind. This basically boils down to the fact that our project helps to bring about a positive change in the ecosystem. This, in turn, helps in fighting the glaring problem we face as a species, that is climate change.",
            "(Being self responsible for the planet)",
        ],
        facts: [
            "Sikkim monthly consumes approx 20-25 thousand tons of cement just through the trade market, i.e. equivalent to 2,250 tons of carbon emission!",
        ],
    },
    {
        title: "Our project aims to introduce waste management techniques",
        text: [
            "When we talk about waste management, we cannot do so without talking about segregation of wastes; however, segregation can be done properly only if it starts from the home where the wastes are produced. We will introduce a well-designed flow chart or a system that will have segregation of wastes as its core.",
        ],
        facts: [
            "We lack a proper segregation and treatment system for our waste, therefore our net zero waste system that starts from the household itself will not let our waste reach the landfills.",
        ],
    },
    {
        title: "Free water via rain water harvesting",
        text: [
            "With rain water harvesting, we aim to help in the ever increasing demand for water and reduce the need for imported water. This will help in both water and energy conservation, as well as help in reducing the water bill.",
        ],
        facts: [
            "A state that has half a year of monsoon season and receives approx 400-550 mm of rainfall monthly has a lot of potential to harvest free rain and use it for our household and drinking purposes.",
        ],
    },
    {
        title: "The excess soil from landslides can be reused by us at MudBeaver",
        text: [
            "Landslides being a common occurrence and problem in our state, we offer some semblance of silver lining in the fact that we can put the soil from such landslides to better use through sustainable construction.",
        ],
        facts: [
            "As stated above, the monsoon we experience brings lots of landslides all around the state, producing tons of mud which is generally thrown or dumped!",
        ],
    },
    {
        title: "To be introduced to and become a part of our permaculture project",
        text: [
            "With this project we want to help design and set up small-scale or large-scale fields for the purpose of self-sustaining irrigation. This will help provide food for oneself and their families. This will be achieved through application of various features and techniques namely aquaponics, drip irrigation and mixed cropping to name a few.",
        ],
        facts: [
            "Being an organic state, growing food should not be limited only to our farmers — everyone should try to home grow their own food!",
        ],
    },
    {
        title: "Workshops / awareness camps for sustainable lifestyle",
        text: [
            "After we build a sustainable infrastructure around us, if we don't realise and accept a sustainable lifestyle the effort put in may only be a mere percentage. Therefore a proper change in mentality and lifestyle is needed, so after we finish building green systems, we'll be hosting and giving workshops on how we can attain total sustainability by accepting a new dimension of habits and living.",
        ],
        facts: [
            "To attain sustainability and to transcend the whole sustainable approach we should walk, talk, wear and eat keeping the planet as our first priority, because it's critical high time right now.",
        ],
    },
    {
        title: "Solar harnessing as part of the project",
        text: [
            "Most of the present day resources of energy are limited and irreplaceable. The next generation will face an acute energy crisis if alternate resources of energy are not developed concurrently. Increasing cost and import of conventional resources have a bad effect on the economy of a country, and the only cheaper solution is “unlimited power” from the sun.",
        ],
        facts: [
            "With average temperatures ranging from 18 to 32 degrees celsius, we have a lot of potential in harnessing free renewable sun energy from nature.",
        ],
    },
    {
        title: "Preserving traditional / vernacular designs",
        text: [
            "The construction techniques and materials we seek to incorporate into our structures will reintroduce feasible traditional features. This not only rekindles one's love for traditional structures, it will help in spreading cultural importance that has been gradually fading over time.",
        ],
        facts: [],
    },
    {
        title: "Improper construction practises",
        text: [
            "It is no secret that the construction process of a common man's home in Sikkim has long been in need of an overhaul. The construction usually is not done with proper survey and technical tests; thumb rules are followed for construction in completely different conditions of sites. These are only but a few problems being highlighted.",
            "These improper practises can prove fatal in the long run. We aim to raise awareness against it and introduce proper procedures to be followed.",
        ],
        facts: [
            "With close encounter and observation made with the laid back, improper construction practices done, a positive change within the industry is needed!",
        ],
    },
    {
        title: "Pocket friendly",
        text: [
            "The construction materials that we will be using in our techniques mainly revolve around mud, and this can be locally sourced or even be available free of cost. This means lesser cost of transportation, faster construction and increase in efficiency.",
            "This all contributes to the fact that the net cost of construction decreases substantially.",
        ],
        facts: [
            "Our locally sourced material approach will reduce the building cost by 30%-40% because we don't have to capitalize much on our hero material, i.e. “MUD”.",
        ],
    },
    {
        title: "Promote local tourism",
        text: [
            "The structures we aim to erect are going to look the part as well as carry the tag of a green building. This, due to its rarity and uniqueness, can generate interest from locals and tourists alike. This will in turn help in increasing the local tourism of the state.",
        ],
        facts: [
            "Tourism being our flag bearing attraction, with an average annual visit of 15-17 lakh tourists, we would like to step up through sustainable tourism with our approach!",
            "With a 7.3% unemployment rate being the nation's problem, we bring in opportunities for livelihood to locals and youths of Sikkim, along with collaboration with SHGs all around the state!",
            "With Sikkim solely producing thousands of engineering graduates every year, we want to provide students with intern opportunities and start the culture of internships to help students with skill building and stipend motivation!",
        ],
    },
    {
        title: "Attain sustainable development goals",
        text: [
            "The state we work out of, that is Sikkim, is known as the first organic state of India. This being the case, there are various goals and objectives set by the state for further improvement in this field. Our project will contribute heavily into attaining the said goals.",
        ],
        facts: [
            "With the G20 summit just passing by and us being a part of it, we fit in perfectly for all the sustainable goals that the summit formulated.",
        ],
    },
    {
        title: "Make people feel proud & responsible through green certifications",
        text: [
            "The construction of structures we are going to be responsible for will warrant a green certificate that certifies the ownership of green buildings. This serves to invoke pride and responsibility of the owner for owning a green building.",
        ],
        facts: [
            "We believe in certifying every dwelling that we build with a green building certification such as GRIHA, IGBC, LEED!",
        ],
    },
    {
        title: "Awareness & availing schemes related to constructing green buildings",
        text: [
            "Since sustainability is the need of the hour to tackle all the climate priorities, the government has provided various schemes in relation to the construction of green buildings. This will help in the availing of various subsidies that will help alleviate / reduce the cost of construction of the said green building.",
        ],
        facts: [
            "We would like to work with the Govt. as well as help people avail schemes that support the construction of green buildings and practises.",
        ],
    },
    {
        title: "Introduction to aquaponics",
        text: [
            "With our aquaponic services we aim to provide all-natural fertilizer from waste produced by fishes. Without any reliance on mined or manufactured fertilizers, efficient, sustainable and highly productive irrigation can be done. The waste water from the fishes' excretion can be used as nutrient rich water for plants. This water, which is technically filtered, can then again be cycled into the tank containing fishes. This cycle goes on, thereby proving to be a great self-sustaining process.",
        ],
        facts: [
            "A permaculture technique where you produce veggies along with 2-3 kg of fish every month, for self sustaining your life!",
        ],
    },
    {
        title: "Concrete buildings nearing their scrap period",
        text: [
            "Various old structures all over the state are nearing the end of their life span. The resultant waste products from their eventual demolitions can be a huge problem and could use up a huge area for landfills, therefore our regenerative mud houses through us at MudBeaver can greatly reduce the burden to the ecosystem in the state.",
        ],
        facts: [
            "From private housing to govt housing and quarters, Sikkim has comparatively a good percentage of buildings entering the scrap period.",
        ],
    },
]

const pad = (n) => String(n).padStart(2, "0")

export const metadata = { title: "Why Choose Us | Mud Beavers Sikkim" }

export default function WhyChooseUsPage() {
    return (
        <>
            <main>
                <PageIntro
                    eyebrow="Why Choose Us"
                    title="Why build with"
                    accent="Mud Beaver?"
                    description="From cutting carbon and reusing landslide soil to harvesting rain and sunlight, here is how building with earth helps Sikkim, its people, and the planet."
                    action="#reasons"
                    actionLabel="See the reasons"
                />

                <section id="reasons" className="mb-page-section">
                    <div className="mb-container">
                        <ol className="mb-reasons">
                            {REASONS.map(({ title, text, facts }, index) => (
                                <li
                                    key={title}
                                    className={`mb-reason${facts.length ? "" : " mb-reason--solo"}`}
                                >
                                    <span className="mb-reason__number" aria-hidden="true">
                                        {pad(index + 1)}
                                    </span>
                                    <div className="mb-reason__body">
                                        <h2>{title}</h2>
                                        {text.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>
                                    {facts.length > 0 && (
                                        <aside className="mb-reason__facts" aria-label="Facts">
                                            {facts.map((fact, i) => (
                                                <div key={fact} className="mb-reason__fact" style={{ "--i": i }}>
                                                    <span>Fact</span>
                                                    <p>{fact}</p>
                                                </div>
                                            ))}
                                            <img
                                                className="mb-reason__beaver"
                                                src="/img/beaver/beaver-talker.webp"
                                                alt=""
                                                width="216"
                                                height="240"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </aside>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <FactsReveal />
                </section>

                <section className="mb-page-section mb-page-section--dark">
                    <div className="mb-container mb-reasons-cta">
                        <div>
                            <p className="mb-section-eyebrow">Build with us</p>
                            <h2>
                                Ready to build with earth?
                                <br />
                                <span>Let's talk about your project.</span>
                            </h2>
                        </div>
                        <a className="mb-btn mb-btn--primary" href="/contact">
                            Contact us
                            <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </section>
            </main>
            <PageEnd />
        </>
    )
}
