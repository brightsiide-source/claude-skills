export default function ServiceAreas() {
  const areas = [
    {
      region: "Baltimore City",
      neighborhoods: [
        "Downtown",
        "Federal Hill",
        "Canton",
        "Fells Point",
        "Hampden",
        "Charles Village",
        "Remington",
        "Park Heights",
        "Pimlico",
        "Sandtown",
        "Woodberry",
        "Roland Park",
        "Guilford",
        "Govans",
        "Belair-Edison",
        "Brooklyn",
        "Curtis Bay",
        "Cherry Hill",
        "Locust Point",
        "Patterson Park",
      ],
    },
    {
      region: "Baltimore County",
      neighborhoods: [
        "Towson",
        "Dundalk",
        "Essex",
        "Catonsville",
        "Parkville",
        "Owings Mills",
        "Pikesville",
        "Woodlawn",
        "Randallstown",
        "Middle River",
        "Perry Hall",
        "Cockeysville",
        "Timonium",
        "Reisterstown",
        "White Marsh",
      ],
    },
    {
      region: "Anne Arundel County",
      neighborhoods: [
        "Glen Burnie",
        "Severn",
        "Pasadena",
        "Odenton",
        "Severna Park",
        "Linthicum",
        "Brooklyn Park",
        "Ferndale",
        "Crofton",
        "Millersville",
      ],
    },
    {
      region: "Howard County",
      neighborhoods: [
        "Columbia",
        "Ellicott City",
        "Elkridge",
        "Laurel",
        "Jessup",
        "Savage",
        "Highland",
        "Clarksville",
        "Fulton",
        "Maple Lawn",
      ],
    },
    {
      region: "Harford County",
      neighborhoods: [
        "Bel Air",
        "Edgewood",
        "Aberdeen",
        "Havre de Grace",
        "Fallston",
        "Joppa",
        "Forest Hill",
        "Jarrettsville",
      ],
    },
    {
      region: "Carroll County",
      neighborhoods: [
        "Westminster",
        "Eldersburg",
        "Sykesville",
        "Hampstead",
        "Taneytown",
        "Mt. Airy",
      ],
    },
  ];

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container-main mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold uppercase tracking-wide text-sm">
            Local Coverage
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-royal-900 mt-2 mb-4">
            We Buy Houses Across the Baltimore Metro
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From Baltimore City to the surrounding counties, we buy homes in
            every neighborhood. If it&apos;s in the Baltimore metro, we want to
            make you a cash offer.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div
              key={area.region}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <h3 className="font-heading text-xl font-bold text-royal-700 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gold-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {area.region}
              </h3>
              <div className="flex flex-wrap gap-2">
                {area.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="inline-block bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full hover:border-royal-400 hover:text-royal-700 transition-colors"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Don&apos;t see your area listed? We still buy there!
          </p>
          <a href="#contact" className="btn-secondary">
            Check if We Buy in Your Area
          </a>
        </div>
      </div>
    </section>
  );
}
