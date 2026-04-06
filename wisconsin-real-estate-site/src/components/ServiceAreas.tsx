export default function ServiceAreas() {
  const metros = [
    {
      city: "Milwaukee",
      tagline: "Wisconsin's largest city",
      areas: [
        "Waukesha",
        "West Allis",
        "Wauwatosa",
        "Brookfield",
        "New Berlin",
        "Menomonee Falls",
        "Oak Creek",
        "Franklin",
        "Greenfield",
        "South Milwaukee",
      ],
    },
    {
      city: "Madison",
      tagline: "The capital city",
      areas: [
        "Sun Prairie",
        "Fitchburg",
        "Middleton",
        "Verona",
        "Oregon",
        "Stoughton",
        "Monona",
        "DeForest",
        "Waunakee",
        "McFarland",
      ],
    },
    {
      city: "Green Bay",
      tagline: "Titletown, USA",
      areas: [
        "De Pere",
        "Ashwaubenon",
        "Howard",
        "Bellevue",
        "Allouez",
        "Suamico",
        "Hobart",
        "Pulaski",
        "Wrightstown",
        "Denmark",
      ],
    },
    {
      city: "Kenosha",
      tagline: "Gateway to Wisconsin",
      areas: [
        "Pleasant Prairie",
        "Somers",
        "Salem Lakes",
        "Bristol",
        "Twin Lakes",
        "Paddock Lake",
        "Silver Lake",
        "Wheatland",
        "Randall",
        "Brighton",
      ],
    },
    {
      city: "Racine",
      tagline: "Belle City of the Lakes",
      areas: [
        "Mount Pleasant",
        "Caledonia",
        "Sturtevant",
        "Burlington",
        "Waterford",
        "Wind Point",
        "Elmwood Park",
        "North Bay",
        "Rochester",
        "Union Grove",
      ],
    },
    {
      city: "Appleton",
      tagline: "Heart of the Fox Valley",
      areas: [
        "Oshkosh",
        "Neenah",
        "Menasha",
        "Kaukauna",
        "Grand Chute",
        "Little Chute",
        "Kimberly",
        "Combined Locks",
        "Greenville",
        "Harrison",
      ],
    },
    {
      city: "Eau Claire",
      tagline: "Western Wisconsin hub",
      areas: [
        "Chippewa Falls",
        "Altoona",
        "Menomonie",
        "Lake Hallie",
        "Bloomer",
        "Cadott",
        "Osseo",
        "Augusta",
        "Fall Creek",
        "Eleva",
      ],
    },
    {
      city: "Janesville",
      tagline: "Wisconsin's Park Place",
      areas: [
        "Beloit",
        "Milton",
        "Edgerton",
        "Evansville",
        "Delavan",
        "Elkhorn",
        "Lake Geneva",
        "Whitewater",
        "Fort Atkinson",
        "Jefferson",
      ],
    },
  ];

  return (
    <section id="areas" className="py-24 bg-brand-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">
            Service Areas
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4">
            We Buy Houses Across{" "}
            <span className="text-brand-red">All Wisconsin</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From Milwaukee to Green Bay, Madison to Kenosha — we buy homes in
            every major metro and surrounding area in the Badger State.
          </p>
        </div>

        {/* Metro Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metros.map((metro) => (
            <div
              key={metro.city}
              className="bg-brand-black border border-brand-gray-mid rounded-xl p-6 hover:border-brand-red/40 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-brand-red rounded-full" />
                <div>
                  <h3 className="text-lg font-bold">{metro.city}</h3>
                  <p className="text-gray-500 text-xs">{metro.tagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {metro.areas.map((area) => (
                  <span
                    key={area}
                    className="text-xs text-gray-400 bg-brand-gray-dark px-2 py-1 rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Don&apos;t see your city?{" "}
            <a href="#contact" className="text-brand-red hover:underline font-medium">
              Contact us anyway
            </a>{" "}
            — we buy houses throughout all of Wisconsin.
          </p>
        </div>
      </div>
    </section>
  );
}
