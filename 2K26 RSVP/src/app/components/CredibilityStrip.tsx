import { motion } from "motion/react";

const logos = [
  "VOGUE", "HYPEBEAST", "COMPLEX", "HIGHSNOBIETY", "GQ", "SSENSE"
];

export function CredibilityStrip() {
  return (
    <section className="bg-black border-y border-white/10 py-8 md:py-10">
      <p className="text-center text-xs tracking-[0.3em] text-white/40 mb-6">AS SEEN ON</p>
      <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap px-5">
        {logos.map((logo, i) => (
          <motion.span
            key={logo}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-white/30 tracking-[0.2em]"
            style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)", fontWeight: 700 }}
          >
            {logo}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
