export function OurJourney() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="mb-12"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            color: '#1e3a8a'
          }}
        >
          Our Journey
        </h2>

        <div className="space-y-6">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
              fontWeight: 300,
              color: '#334155',
              lineHeight: 1.8
            }}
          >
            We could tell you how it all started, how we met, and every moment that led us here…
          </p>

          <p
            className="pt-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 500,
              color: '#1e3a8a',
              lineHeight: 1.6
            }}
          >
            But the story long abeg so... 😄
          </p>

          <div className="w-24 h-[1px] bg-slate-300 mx-auto my-10" />

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              fontWeight: 400,
              color: '#64748b',
              lineHeight: 1.7
            }}
          >
            We look forward to celebrating with everyone who responded.
          </p>

          <div className="pt-8">
            <a
              href="#rsvp"
              className="inline-block px-10 py-3 bg-[#1e3a8a] hover:bg-[#1e40af] transition-colors duration-300 rounded-sm shadow-md hover:shadow-lg"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'white',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              RSVP Closed
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
