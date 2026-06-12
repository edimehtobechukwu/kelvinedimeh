export function RSVPForm() {
  return (
    <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white p-10 md:p-16 rounded-xl shadow-xl border border-blue-50/80 relative overflow-hidden">
          {/* Accent top gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700" />
          
          <div className="w-20 h-20 bg-blue-50/60 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-100">
            <svg className="w-10 h-10 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2
            className="mb-6 tracking-wide"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.25rem, 4vw, 3rem)',
              fontWeight: 500,
              color: '#1e3a8a',
            }}
          >
            RSVP is Closed
          </h2>

          <div className="w-16 h-[1px] bg-blue-200 mx-auto mb-8" />

          <p
            className="mb-6 font-light"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.25rem',
              color: '#1e293b',
              lineHeight: 1.6
            }}
          >
            We've locked the guest list! 🔒
          </p>

          <p
            className="mb-8 font-light text-slate-500"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: 1.8
            }}
          >
            The deadline has passed, and we've officially submitted our final counts. We are incredibly grateful for the overwhelming amount of love, RSVPs, and support we've received.
          </p>

          <p
            className="mb-10 font-light text-slate-500"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: 1.8
            }}
          >
            If you've already registered, we can't wait to see you on the dance floor! If you couldn't make it or missed the cutoff, we'll carry your warm wishes with us.
          </p>

          <p
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem',
              color: '#1e3a8a',
              lineHeight: 1.6
            }}
          >
            With love, <br />
            Kaine &amp; Kelvin
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-50 rounded-full text-blue-900 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em'
              }}
            >
              JUNE 20, 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

