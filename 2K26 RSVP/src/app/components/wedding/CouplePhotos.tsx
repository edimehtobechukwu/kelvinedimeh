export function CouplePhotos() {
  // Exact filenames from public/Moments/ — keep extensions as-is
  const momentFiles = [
    '1.jpeg',
    '2.jpeg',
    '3.jpg',
    '4.jpg',
    '5.jpeg',
    '6.jpg',
    '7.JPG',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
  ];

  const base = import.meta.env.BASE_URL;
  const photos = momentFiles.map((file) => `${base}Moments/${file}`);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 300,
              color: '#94a3b8',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            A Collection of
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 500,
              color: '#1e3a8a',
              marginBottom: '1rem',
            }}
          >
            Our Moments
          </h2>
          <div className="w-16 h-[1px] bg-slate-300 mx-auto" />
        </div>

        {/* Grid — strict left-to-right order 1–15 */}
        <div className="moments-grid">
          {photos.map((src, index) => (
            <div
              key={index}
              className="moments-item"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 16px rgba(30,58,138,0.10)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                cursor: 'pointer',
                aspectRatio: '4 / 5',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 12px 40px rgba(30,58,138,0.18)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 4px 16px rgba(30,58,138,0.10)';
              }}
            >
              <img
                src={src}
                alt={`Our moment ${index + 1}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
              <div
                className="moments-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(30,58,138,0.25), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .moments-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        @media (min-width: 640px) {
          .moments-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }
        @media (min-width: 1024px) {
          .moments-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        }
        .moments-item:hover .moments-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
