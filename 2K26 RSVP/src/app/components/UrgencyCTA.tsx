import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";

export function UrgencyCTA() {
  const [time, setTime] = useState({ hours: 11, minutes: 42, seconds: 17 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 0; minutes = 0; seconds = 0; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="bg-white text-black py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full mb-6">
            <Clock size={14} />
            <span className="text-xs tracking-wider" style={{ fontWeight: 600 }}>LIMITED DROP ENDS SOON</span>
          </div>

          <h2 className="tracking-tight mb-4" style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.05 }}>
            This Drop Won't Last.
            <br />
            <span className="text-black/40">Neither Should Your Hesitation.</span>
          </h2>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { value: pad(time.hours), label: "HRS" },
              { value: pad(time.minutes), label: "MIN" },
              { value: pad(time.seconds), label: "SEC" },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="bg-black text-white px-4 py-3 rounded-sm tabular-nums" style={{ fontSize: "1.75rem", fontWeight: 800 }}>
                  {unit.value}
                </span>
                <span className="text-[10px] tracking-wider text-black/40 mt-1.5" style={{ fontWeight: 600 }}>{unit.label}</span>
              </div>
            ))}
          </div>

          <p className="text-black/50 mb-8 max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            Once this collection is gone, it's gone forever. No restocks. No exceptions.
            Join 50,000+ who already made the move.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-black text-white px-10 py-4 inline-flex items-center gap-3 tracking-wider hover:bg-black/90 transition-colors"
            style={{ fontWeight: 700, fontSize: "0.9rem" }}
          >
            SHOP THE DROP
            <ArrowRight size={18} />
          </motion.button>

          <p className="text-xs text-black/30 mt-4">Free shipping · Easy returns · Pay in 4 with Afterpay</p>
        </motion.div>
      </div>
    </section>
  );
}
