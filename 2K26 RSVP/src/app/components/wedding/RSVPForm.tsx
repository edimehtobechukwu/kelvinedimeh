import { useState } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';

export function RSVPForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    guestCount: '0',
    attendWhiteWedding: 'yes',
    attendTraditional: false,
    dietaryRequirements: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-rsvp-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white p-12 rounded-lg shadow-lg border border-blue-100">
            <svg className="w-16 h-16 mx-auto mb-6" style={{ color: '#10b981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 600,
                color: '#1e3a8a'
              }}
            >
              Thank You!
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
              Your RSVP has been received. A confirmation email is on its way to <strong>{formData.email}</strong>. We can't wait to celebrate with you!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 500,
              color: '#1e3a8a'
            }}
          >
            RSVP
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 300,
              color: '#64748b'
            }}
          >
            Your response helps us plan better
          </p>
        </div>

        <div className="bg-white p-10 rounded-lg shadow-lg border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#334155',
                  letterSpacing: '0.025em'
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 300
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#334155',
                    letterSpacing: '0.025em'
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 300
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#334155',
                    letterSpacing: '0.025em'
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 300
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="guestCount"
                className="block mb-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#334155',
                  letterSpacing: '0.025em'
                }}
              >
                Number of Guests *
              </label>
              <select
                id="guestCount"
                name="guestCount"
                required
                value={formData.guestCount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 300
                }}
              >
                <option value="0">0 — Just me</option>
                <option value="1">+ 1 Guest (2 total)</option>
                <option value="2">+ 2 Guests (3 total)</option>
                <option value="3">+ 3 Guests (4 total)</option>
                <option value="4">+ 4 Guests (5 total)</option>
                <option value="5">+ 5 or more Guests</option>
              </select>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <label
                className="block mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#334155',
                  letterSpacing: '0.025em'
                }}
              >
                White Wedding (June 20, 2026) *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attendWhiteWedding"
                    value="yes"
                    checked={formData.attendWhiteWedding === 'yes'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 300,
                      color: '#334155'
                    }}
                  >
                    Joyfully Accept
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attendWhiteWedding"
                    value="no"
                    checked={formData.attendWhiteWedding === 'no'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 300,
                      color: '#334155'
                    }}
                  >
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="attendTraditional"
                  checked={formData.attendTraditional}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 text-blue-600 rounded"
                />
                <div>
                  <span
                    className="block mb-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#334155'
                    }}
                  >
                    Also attending Traditional Ceremony
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: '#64748b'
                    }}
                  >
                    June 18, 2026 (Optional)
                  </span>
                </div>
              </label>
            </div>

            <div>
              <label
                htmlFor="dietaryRequirements"
                className="block mb-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#334155',
                  letterSpacing: '0.025em'
                }}
              >
                Dietary Requirements (Optional)
              </label>
              <textarea
                id="dietaryRequirements"
                name="dietaryRequirements"
                rows={3}
                value={formData.dietaryRequirements}
                onChange={handleChange}
                placeholder="Let us know about any allergies or dietary preferences"
                className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 300
                }}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded text-center">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#dc2626' }}>
                  {error} — please try again or contact us directly.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1e3a8a] hover:bg-[#1e40af] transition-colors duration-300 rounded-sm shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'white',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              {loading ? 'Sending…' : 'Submit RSVP'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
