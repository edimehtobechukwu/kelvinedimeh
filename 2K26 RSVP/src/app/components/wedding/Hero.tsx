export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Image — B&W via CSS grayscale */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}hero.png)`,
          filter: 'grayscale(100%)',
          zIndex: 0
        }}
      />

      {/* Blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-blue-900/50 to-slate-900/70" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center" style={{ zIndex: 2 }}>
        <div className="mb-8">
          <div className="w-24 h-[1px] bg-white/30 mx-auto mb-8" />
          <div
            className="inline-block px-5 py-1.5 mb-4"
            style={{
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '2px',
              backdropFilter: 'blur(4px)',
              background: 'rgba(255,255,255,0.08)'
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              #2K26
            </span>
          </div>
        </div>

        <h1 className="mb-8">
          <div
            className="mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Kelvin Edimeh
          </div>
          <div
            className="my-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: '#bfdbfe',
              letterSpacing: '0.05em',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            &
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Kaine Karibi-George
          </div>
        </h1>

        <div className="w-16 h-[1px] bg-white/40 mx-auto mb-8" />

        <p
          className="mb-3 tracking-wide"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 300,
            color: '#e0e7ff',
            letterSpacing: '0.1em',
            textShadow: '0 2px 6px rgba(0,0,0,0.4)'
          }}
        >
          WE'RE GETTING MARRIED
        </p>

        <p
          className="mb-10 max-w-2xl mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
            fontWeight: 300,
            color: '#cbd5e1',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            textShadow: '0 2px 6px rgba(0,0,0,0.4)'
          }}
        >
          Together with our families, we invite you to celebrate our wedding
        </p>

        <div className="mb-10">
          <p
            className="mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 500,
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}
          >
            June 20, 2026
          </p>
        </div>

        <a
          href="#rsvp"
          className="inline-block px-12 py-4 bg-white hover:bg-blue-50 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#1e3a8a',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          RSVP Now
        </a>
      </div>
    </section>
  );
}
