export function Footer() {
  return (
    <footer className="py-16 px-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-24 h-[1px] bg-slate-300 mx-auto mb-8" />

        <h3 className="mb-4">
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400,
              color: '#1e3a8a'
            }}
          >
            Kaine & Kelvin
          </div>
        </h3>

        <p
          className="mb-8"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            fontWeight: 300,
            color: '#64748b',
            lineHeight: 1.8,
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          Thank you for being part of our journey. Your love and support mean the world to us. We can't wait to celebrate this special day with you.
        </p>

        <div className="mb-8">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              color: '#94a3b8',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}
          >
            Share your moments
          </p>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              color: '#1e3a8a',
              letterSpacing: '0.05em'
            }}
          >
            #2K26
          </span>
        </div>

        <div className="w-24 h-[1px] bg-slate-300 mx-auto mb-8" />

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 300,
            color: '#94a3b8'
          }}
        >
          © 2026 Kaine & Kelvin
        </p>
      </div>
    </footer>
  );
}
