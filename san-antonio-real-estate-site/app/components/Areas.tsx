export default function Areas() {
  const areas = [
    "Downtown San Antonio",
    "Alamo Heights",
    "Stone Oak",
    "Helotes",
    "Leon Valley",
    "Converse",
    "Schertz",
    "Universal City",
    "Live Oak",
    "Windcrest",
    "Kirby",
    "Balcones Heights",
    "Castle Hills",
    "Shavano Park",
    "Hollywood Park",
    "Garden Ridge",
    "New Braunfels",
    "Boerne",
    "Seguin",
    "Floresville",
    "Pleasanton",
    "South San Antonio",
    "West Side",
    "East Side",
  ];

  return (
    <section id="areas" className="py-24 bg-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              Buying Houses Across{" "}
              <span className="text-teal">Greater San Antonio</span>
            </h2>
            <p className="text-lg text-silver-dark mb-8">
              We purchase homes throughout San Antonio and the surrounding Bexar County area. If your property is in the greater SA metro, we want to make you a cash offer.
            </p>

            <div className="bg-black rounded-xl p-6 mb-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-extrabold text-teal">200+</div>
                  <div className="text-silver-dark text-sm mt-1">Homes Bought</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-teal">$50M+</div>
                  <div className="text-silver-dark text-sm mt-1">Cash Paid Out</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-teal">14</div>
                  <div className="text-silver-dark text-sm mt-1">Avg Days to Close</div>
                </div>
              </div>
            </div>

            <a
              href="#get-offer"
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-8 py-4 rounded-md text-lg font-bold transition-colors"
            >
              Check If We Buy in Your Area
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {areas.map((area) => (
                <div
                  key={area}
                  className="bg-white rounded-lg px-4 py-3 text-sm font-medium text-black border border-silver/50 hover:border-teal/50 hover:text-teal transition-colors text-center"
                >
                  {area}
                </div>
              ))}
            </div>

            {/* Google Maps Embed — San Antonio service area */}
            <div className="rounded-xl overflow-hidden border border-silver/50 shadow-sm">
              <iframe
                title="SA Cash Home Buyers service area — San Antonio, TX"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222355.07104045655!2d-98.63737842968749!3d29.45876805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c58af04d00eaf%3A0x856e13b10a016bc!2sSan%20Antonio%2C%20TX!5e0!3m2!1sen!2sus!4v1711200000000!5m2!1sen!2sus"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
