import { motion } from "motion/react";
import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const testimonials = [
  {
    id: 1,
    name: "Mia Chen",
    handle: "@miaxchen",
    avatar: "https://images.unsplash.com/photo-1617895037670-977261119412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc3NDk3MjQyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "This hoodie is literally the softest thing I own. I've been wearing it every single day for 3 weeks straight. No regrets.",
    followers: "142K",
  },
  {
    id: 2,
    name: "Jaylen Ross",
    handle: "@jaylenross",
    avatar: "https://images.unsplash.com/photo-1676302225279-12bbabdf5110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0cmVldHdlYXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQ5NzI0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "Finally a brand that gets it. The fit, the quality, the whole vibe. NVRLND is all I wear now.",
    followers: "89K",
  },
  {
    id: 3,
    name: "Priya Nair",
    handle: "@priyanstyle",
    avatar: "https://images.unsplash.com/photo-1572112686886-5c0b5bc8dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaW5mbHVlbmNlciUyMGNhbmRpZCUyMHN0eWxlfGVufDF8fHx8MTc3NDk3MjQzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "Got compliments from 4 strangers in one day wearing the cargo pants. The stock bar wasn't lying — grab these before they're gone.",
    followers: "210K",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9", label: "Average Rating" },
  { value: "12K+", label: "5-Star Reviews" },
  { value: "98%", label: "Would Recommend" },
];

export function SocialProof() {
  return (
    <section className="bg-neutral-950 text-white py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-white mb-1" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900 }}>
                {stat.value}
              </p>
              <p className="text-white/40 text-xs tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-4">
          <span className="text-xs tracking-[0.3em] text-white/40 block mb-2">THE COMMUNITY SPEAKS</span>
          <h2 className="text-white tracking-tight mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, lineHeight: 1.1 }}>
            Don't take our word for it
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 p-6 rounded-sm"
            >
              <div className="flex gap-0.5 mb-4">
                {Array(5).fill(null).map((_, j) => (
                  <Star key={j} size={14} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-white/80 mb-6 text-sm" style={{ lineHeight: 1.7 }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>{t.name}</p>
                  <p className="text-white/40 text-xs">{t.handle} · {t.followers} followers</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
