import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShoppingBag, Menu, X } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1635650804494-41f0ecefec22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsJTIwdXJiYW58ZW58MXx8fHwxNzc0OTAxNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Hero() {
  const [count, setCount] = useState(2847);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Streetwear lifestyle"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-5 md:px-12 py-5">
        <span className="tracking-[0.3em] text-white" style={{ fontSize: "1.25rem", fontWeight: 800 }}>
          NVRLND
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wider text-white/70">
          <a href="#drops" className="hover:text-white transition-colors">NEW DROPS</a>
          <a href="#bestsellers" className="hover:text-white transition-colors">BEST SELLERS</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-white">
            <ShoppingBag size={20} />
            <span className="hidden md:inline text-sm tracking-wider">BAG (0)</span>
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-md md:hidden"
          >
            {/* Close header */}
            <div className="flex items-center justify-between px-5 py-5">
              <span className="tracking-[0.3em] text-white" style={{ fontSize: "1.25rem", fontWeight: 800 }}>
                NVRLND
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-white" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col items-start px-8 pt-8 gap-2">
              {[
                { label: "NEW DROPS", href: "#drops" },
                { label: "BEST SELLERS", href: "#bestsellers" },
                { label: "COLLECTIONS", href: "#" },
                { label: "ABOUT", href: "#about" },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-white py-3 tracking-[0.15em] border-b border-white/10 w-full"
                  style={{ fontSize: "1.5rem", fontWeight: 800 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 left-0 right-0 px-8 pb-10"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full bg-white text-black py-4 flex items-center justify-center gap-3 tracking-wider mb-4"
                style={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                SHOP NOW
                <ArrowRight size={18} />
              </button>
              <p className="text-center text-xs text-white/30 tracking-wider">
                FREE SHIPPING OVER $100
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[calc(100vh-80px)] px-5 md:px-12 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs tracking-wider text-white/90">SS26 DROP — LIMITED RELEASE</span>
          </div>

          <h1
            className="text-white mb-4 tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1 }}
          >
            YOUR STYLE.
            <br />
            YOUR RULES.
          </h1>
          <p className="text-white/70 max-w-md mb-8" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            Streetwear for the ones who don't follow trends — they set them.
            Built for comfort. Designed for culture.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black px-8 py-4 flex items-center gap-3 tracking-wider hover:bg-white/90 transition-colors"
              style={{ fontWeight: 700, fontSize: "0.9rem" }}
            >
              SHOP NOW
              <ArrowRight size={18} />
            </motion.button>
            <span className="text-white/50 text-sm">
              <span className="text-white" style={{ fontWeight: 600 }}>{count.toLocaleString()}+</span> people shopped this week
            </span>
          </div>
        </motion.div>

        {/* Scrolling ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/10 py-3 overflow-hidden"
        >
          <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {Array(3).fill(null).map((_, i) => (
              <span key={i} className="text-xs tracking-[0.25em] text-white/30 mx-8">
                FREE SHIPPING OVER $100 &nbsp;★&nbsp; NEW DROP EVERY FRIDAY &nbsp;★&nbsp; MADE FOR THE CULTURE &nbsp;★&nbsp; LIMITED STOCK &nbsp;★&nbsp;
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}