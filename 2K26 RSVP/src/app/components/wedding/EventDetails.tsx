export function EventDetails() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center mb-16"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            color: '#1e3a8a'
          }}
        >
          Celebration Details
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-lg shadow-sm border border-blue-100">
            <div className="mb-6">
              <div className="inline-block px-4 py-1 bg-[#1e3a8a] rounded-full mb-4">
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'white',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  Main Event
                </span>
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: '#1e3a8a'
                }}
              >
                White Wedding
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#94a3b8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#334155' }}>
                    Saturday, June 20, 2026
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: '#64748b' }}>
                    10:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#94a3b8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Venue
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#334155' }}>
                    First Baptist Church
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: '#64748b' }}>
                    93 Aggrey Road, Port Harcourt, Rivers State
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#94a3b8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Reception
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#334155' }}>
                    The Arena Event Centre
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: '#64748b' }}>
                    GRA Phase 2, 37 Tombia Street, Port Harcourt, Rivers State
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-lg shadow-sm border border-slate-200">
            <div className="mb-6">
              <div className="inline-block px-4 py-1 bg-slate-100 rounded-full mb-4">
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#64748b',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  Optional
                </span>
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: '#334155'
                }}
              >
                Traditional Ceremony
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#94a3b8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#334155' }}>
                    Thursday, June 18, 2026
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: '#64748b' }}>
                    3:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#94a3b8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#334155' }}>
                    Barr. Karibi George's Residence
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: '#64748b' }}>
                    5 Agbere Street, Abuloma Housing Estate Phase 1, Port Harcourt
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: '#475569', fontStyle: 'italic' }}>
                  Join us for our traditional ceremony. Your presence would be an honor, but we understand if you can only attend the main celebration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
