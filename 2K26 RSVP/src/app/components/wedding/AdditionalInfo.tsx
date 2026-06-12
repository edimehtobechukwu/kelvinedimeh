export function AdditionalInfo() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
              <svg className="w-6 h-6" style={{ color: '#1e3a8a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3
              className="mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#1e3a8a'
              }}
            >
              Dress Code
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 300,
                color: '#64748b',
                lineHeight: 1.6
              }}
            >
              Colors of the day are Navy Blue, Sky Blue and Silver. Dress comfortably and come ready to dance.
            </p>
          </div>

          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
              <svg className="w-6 h-6" style={{ color: '#1e3a8a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3
              className="mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#1e3a8a'
              }}
            >
              Guest Notes
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 300,
                color: '#64748b',
                lineHeight: 1.6
              }}
            >
              RSVP is now closed (deadline was June 5, 2026). For any questions or special accommodations, feel free to contact us directly.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
            <svg className="w-6 h-6" style={{ color: '#1e3a8a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#1e3a8a'
            }}
          >
            Venue Location
          </h3>
          <div className="w-full rounded-lg overflow-hidden shadow-xl border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.7023391037055!2d7.0016862762477965!3d4.821084395154408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069ce78d43d4c03%3A0x280016a27fc446b9!2sThe%20Arena%20Event%20Center%20(LATTD%20EVENT)!5e0!3m2!1sen!2sng!4v1777655788394!5m2!1sen!2sng"
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Arena Event Center, Port Harcourt"
            />
          </div>
          <p
            className="mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 300,
              color: '#64748b',
              lineHeight: 1.6
            }}
          >
            The Arena Event Center (LATTD EVENT), Port Harcourt, Rivers State. Detailed directions will be sent upon RSVP confirmation.
          </p>
        </div>

      </div>
    </section>
  );
}
