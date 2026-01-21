import Image from 'next/image'

export default function TechniquesPage() {
  return (
    <main>
      {/* Page Header */}
      <div className="container-fluid page-header py-5 mb-5" style={{ backgroundColor: '#964B00' }}>
        <div className="container text-center py-5">
          <h1 className="display-4 text-white mb-4">Our Techniques</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a className="text-white" href="/">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a className="text-white" href="#">
                  Pages
                </a>
              </li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                Our Techniques
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Techniques Content */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="position-relative overflow-hidden ps-5 pt-5 h-100" style={{ minHeight: '400px' }}>
                <Image
                  className="position-absolute w-100 h-100"
                  src="/img/abbh.png"
                  alt="Techniques"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 start-0 bg-white pe-3 pb-3" style={{ width: '200px', height: '200px' }}>
                  <div className="d-flex flex-column justify-content-center text-center h-100 p-3" style={{ backgroundColor: '#964b00' }}>
                    <h1 className="text-white">Mud</h1>
                    <h2 className="text-white">Beavers</h2>
                    <h5 className="text-white mb-0">Sikkim</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="h-100">
                <div className="border-start border-5 border-primary ps-4 mb-5">
                  <h6 className="text-body text-uppercase mb-2">Our Techniques</h6>
                  <h1 className="display-6 mb-0">Building With Earth</h1>
                </div>
                <h5>RAMMED EARTH.</h5>
                <p>
                  Also known in French as pisé de terre or simply pisé has been used since ages worldwide like many other
                  earth techniques. The earth is mixed thoroughly with water to get a homogeneous humid mix. This humid
                  earth is poured in a form in thin layers and then rammed to increase its density. The increase of density
                  increases as well the compressive strength and the water resistance. Ramming was traditionally done by
                  hand. Since a few decades, ramming is being done mechanically with pneumatic rammers.
                  <br />
                  <br />
                  Soil stabilization gave a great input to rammed earth as well as mechanization. The traditional wooden
                  rammer has been replaced by pneumatic rammers. Heavy wooden formworks evolved into light composite ones,
                  made of plywood, wood and steel or sometimes aluminium. Pneumatic rammers, dumpy loaders, mixers, ban
                  conveyors, etc. allowed to build faster and get a better quality finish. Structures are most of the time
                  built with pier walls, meaning that walls are built up to their full height at once. This way of building
                  changed totally the design pattern of structures.
                  <br />
                  <br />
                </p>
                <p>
                  The worldwide tradition of rammed earth construction has shown that it is possible to achieve long lasting
                  and majestic buildings from single to multi storey. Wonderful heritage can be found in countries such as
                  France, Spain, Morocco, China, and all over the Himalayan area. One can see numerous and wonderful
                  examples with all kinds of buildings:
                  <br />
                  <br />• Farms, or rural houses, chateaux and apartments in Europe
                  <br />
                  <br />• Entire villages in North Africa
                  <br />
                  <br />• Parts of the great wall of China
                  <br />
                  <br />• Buildings in most of the Himalayan regions of Tibet, Bhutan, Nepal, Ladakh
                  <br />
                  <br />• Widespread examples in South America
                  <br />
                  <br />
                </p>
                <h5>WATTLE AND DAUB</h5>
                <p>
                  <br />
                  A techniques that has been our go to way to construct using earth and bamboo.
                  <br />
                  <br />
                  A load bearing structure, generally made with wood, is closed using panels. The latter are made of a
                  lattice plastered on both sides with a plastic soil.
                  <br />
                  <br />
                  The lattice frame holds the soil and gives rigid panels. This lattice is often made of reeds, sticks or
                  bamboo. It has been extensively used in many parts of the world: in developing countries as well as in
                  Europe. In France (Normandie & Bretagne) the earth was often stabilized with the urine of horse: the
                  ammonia contained in the urine gave water resistant properties, to a certain extent, to the soil.
                </p>
                <br />
                <h5>EARTH FILLED IN</h5>
                <p>
                  Humid soil was traditionally poured into wooden lattice works. Thus, it gave some thermal mass to light
                  structures as well as some acoustic insulation. In recent times, dry soil has been poured into synthetic
                  textiles which are hold outside by wooden poles driven into the ground.
                  <br />
                  We believe in bringing positive and proper changes within the building industry in context of
                  constructional practises being carried.
                  <br />
                  <br />
                  Dry soil is also being poured into long synthetic tubes, which are staked upon each other. Cal-Earth (The
                  California Institute of Earth Art and Architecture) www.calearth.org which was founded and headed by the
                  architect Nader Khalili does an extensive use of filled in technique. They call it Superadobe construction
                  and they are building what is called Eco-domes.
                  <br />
                  <br />
                  Superadobe structures are an excellent example of green building techniques. They use Tubular roll of
                  sandbag-type material which are filled with earth. A barbed wire is use to bind the earth tube together.
                  Later on the earth tubes are plastered with stabilised earth plaster.
                </p>
                <div className="border-start border-5 border-primary ps-4 mb-5">
                  <h6 className="text-body text-uppercase mb-2">Our Techniques</h6>
                  <h1 className="display-6 mb-0">Building With Bamboo</h1>
                </div>
                <p>
                  This blend of time-honored techniques and modern solutions is what makes bamboo architecture so exciting
                  and dynamic. It&apos;s a field that&apos;s constantly evolving, opening up new possibilities for sustainable,
                  innovative construction.
                </p>
                <h5>Post-and-Beam Structures</h5>
                <p>
                  Post-And-Beam StructuresPost and beam structures, a staple in bamboo architecture, draw inspiration from
                  the age-old technique of timber framing. Much like the time-honored methods used in traditional wooden
                  houses, this construction approach employs the same basic principles.
                </p>
                <br />
                <p>
                  The support system of a post and beam structure is composed of three key elements: vertical posts,
                  horizontal beams, and cross-bracings. The latter helps to triangulate the structure, enhancing its
                  stability against lateral loads such as winds and seismic forces.
                </p>
                <h5>Hyperbolaic Paraboloids</h5>
                <p>
                  A hyperbolic paraboloid, or a &apos;hypar&apos; for short, is a structural system that&apos;s as intriguing as its name
                  suggests. Recognizable by its signature &apos;saddle&apos; shape, it presents a marriage of concave and convex
                  surfaces. The result is a structure where two straight lines intersect at every point, creating a
                  captivating visual effect.
                </p>
                <br />
                <p>
                  The curvature of the surface lends these shells extraordinary stiffness, allowing them to bear considerable
                  loads over vast spans. These qualities make them especially suited for roof structures, though their
                  presence can be seen far and wide in both construction and everyday objects - even in the shape of a
                  Pringles chip!
                </p>
                <h5>Hyperbolic (twisted) Towers</h5>
                <p>
                  The world of bamboo construction is marked by incredible structures, among which the hyperbolic, or twisted
                  towers, truly stand out. These structures, akin to reciprocal structures, exhibit the remarkable strength
                  and versatility of bamboo. The shape of a Reciprocal Tower is reminiscent of a hyperboloid, bearing
                  similarities with the hyperbolic paraboloid. A key difference lies in the geometric construction of the
                  reciprocal tower, which involves rotating a hyperbola around a defined axis. This rotation gives birth to
                  a single-sheeted hyperboloid, unlike the hyperbolic paraboloid which has a doubly-ruled surface
                </p>
                <h5>Spatial Gridshells</h5>
                <p>
                  Bamboo construction continually innovates through structures like Spatial Gridshells, demonstrating the
                  boundless potential of this material. These structures, lightweight yet sturdy, are fashioned from a
                  lattice of bamboo splits. These splits, either intertwined organically or arranged in precise shapes,
                  create captivating, often dome-like structures. The gridshell structural system is a favorite in modern
                  bamboo architecture, credited to its ability to produce elegant, curved forms exhibiting exceptional
                  strength. Furthermore, gridshells excel in crafting large, open spaces, without the need for additional
                  interior supports.
                </p>

                <div className="border-start border-5 border-primary ps-4 mb-5">
                  <h6 className="text-body text-uppercase mb-2">Our Techniques</h6>
                  <h1 className="display-6 mb-0">Building With Stone</h1>
                </div>

                <h5>Ashlar Masonry</h5>
                <p>
                  In this technique, the stones are carefully cut and shaped to fit together without the use of cement. The
                  stones are typically placed in parallel divisions, creating a smooth and consistent surface.
                </p>
                <Image src="/img/technique/Modus.png" height={150} width={300} alt="Ashlar Masonry" className="mb-3" />

                <br />
                <br />
                <h5>Rubble Masonry</h5>
                <p>
                  This method of masonry uses uncut, naturally formed stones that have irregular shapes. The stones are
                  mortared together after being coarsely placed. For structures like farmhouses or rural residences that are
                  intended to blend in with their settings, rubble masonry is frequently used.
                </p>
                <Image src="/img/technique/Sagrada-familia1.jpg" height={200} width={400} alt="Rubble Masonry" className="mb-3" />

                <br />
                <br />
                <h5>Dry Stone Masonry</h5>
                <p>
                  This method involves placing stones free of mortar. Rural regions frequently have dry stone walls, which
                  are used as slope supports for terraces, retaining walls, and boundary walls. Natural look and low
                  maintenance are its benefits.
                </p>
                <Image src="/img/technique/Kauffman.png" alt="Dry Stone Masonry" height={200} width={400} className="mb-3" />
                <br />
                <br />
                <h5>Rustication</h5>
                <p>
                  In this approach, the stone faces are left unpolished and protruded from the wall. In structures built
                  during the Renaissance era, rustication is frequently used for decorative reasons. The stones&apos; rough
                  surface stands out sharply in comparison to the nearby stones&apos; polished surfaces. Its benefits include a
                  distinctive and decorative appearance.
                </p>
                <Image src="/img/technique/palazzo-medici.jpg" height={150} width={300} alt="Rustication" className="mb-3" />
                <br />
                <br />
                <h5>Polygonal Masonry</h5>
                <p>
                  This method uses stones of varying sizes and shapes that are puzzled together. The gaps between the stones
                  are generally covered with mortar and they are typically placed in horizontal courses. It has excellent
                  strength and a pleasant, rustic look, but it lacks uniformity. Ancient structures and strongholds
                  frequently made use of polygonal masonry because of its unique and unpolished appearance and irregular form.
                </p>
                <Image src="/img/technique/Jewish-Museum.jpg" height={200} width={400} alt="Polygonal Masonry" className="mb-3" />
                <br />
                <br />
                <h5>Cyclopean Masonry</h5>
                <p>
                  This technique uses big, asymmetrical shaped stones to build enormous structures. The heavy stones must be
                  moved and placed with considerable strength and expertise in cyclopean masonry. Cyclopean Masonry This
                  technique uses big, asymmetrical shaped stones to build enormous structures. The heavy stones must be moved
                  and placed with considerable strength and expertise in cyclopean masonry.
                </p>
                <Image src="/img/technique/cyclopean.png" height={200} width={400} alt="Cyclopean Masonry" className="mb-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
