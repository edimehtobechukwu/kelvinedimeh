import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Flame } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const products = [
  {
    id: 1,
    name: "Shadow Oversized Hoodie",
    price: 89,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1644483878398-b57d19f84ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllJTIwYmxhY2slMjBtaW5pbWFsfGVufDF8fHx8MTc3NDk3MjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tag: "SELLING FAST",
    stock: 12,
    benefit: "Feels like a cloud. Looks like a statement.",
  },
  {
    id: 2,
    name: "Culture Tee — Washed Black",
    price: 49,
    image: "https://images.unsplash.com/photo-1582735142555-dfe7455f7dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBvdmVyc2l6ZWQlMjB0c2hpcnR8ZW58MXx8fHwxNzc0OTcyNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tag: "NEW DROP",
    stock: 34,
    benefit: "The everyday essential you'll never take off.",
  },
  {
    id: 3,
    name: "Drift Cargo Pants",
    price: 110,
    image: "https://images.unsplash.com/photo-1758267928031-a87e5a5c6c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2FyZ28lMjBwYW50cyUyMGZhc2hpb258ZW58MXx8fHwxNzc0OTcyNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tag: "ALMOST GONE",
    stock: 5,
    benefit: "Maximum mobility. Zero compromise on fit.",
  },
  {
    id: 4,
    name: "Phantom Bomber Jacket",
    price: 149,
    originalPrice: 195,
    image: "https://images.unsplash.com/photo-1772835069733-2dd0f9129d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBzdHlsZSUyMGphY2tldCUyMHVyYmFuJTIweW91dGh8ZW58MXx8fHwxNzc0OTcyNDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tag: "FAN FAVORITE",
    stock: 8,
    benefit: "Turn heads without trying.",
  },
];

export function BestSellers() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="bestsellers" className="bg-black text-white py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="text-xs tracking-[0.3em] text-white/40 block mb-2">COMMUNITY PICKS</span>
            <h2 className="text-white tracking-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1 }}>
              Best Sellers
            </h2>
          </div>
          <a href="#" className="text-sm tracking-wider text-white/50 hover:text-white transition-colors hidden md:block">
            VIEW ALL →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden mb-3">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                  {product.stock <= 10 && <Flame size={12} className="text-orange-500" />}
                  <span className="text-[10px] tracking-wider text-white" style={{ fontWeight: 600 }}>{product.tag}</span>
                </div>
                {/* Quick add */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: hoveredId === product.id ? 1 : 0, y: hoveredId === product.id ? 0 : 10 }}
                  className="absolute bottom-3 left-3 right-3 bg-white text-black py-2.5 flex items-center justify-center gap-2 text-xs tracking-wider"
                  style={{ fontWeight: 700 }}
                >
                  <ShoppingBag size={14} />
                  QUICK ADD
                </motion.button>
              </div>
              <h3 className="text-white text-sm mb-0.5" style={{ fontWeight: 600 }}>{product.name}</h3>
              <p className="text-white/40 text-xs mb-2">{product.benefit}</p>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm" style={{ fontWeight: 700 }}>${product.price}</span>
                {product.originalPrice && (
                  <span className="text-white/30 text-xs line-through">${product.originalPrice}</span>
                )}
              </div>
              {product.stock <= 10 && (
                <div className="mt-2">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(product.stock / 30) * 100}%` }}
                    />
                  </div>
                  <p className="text-orange-500/80 text-[10px] mt-1" style={{ fontWeight: 600 }}>
                    Only {product.stock} left
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <a href="#" className="block text-center text-sm tracking-wider text-white/50 hover:text-white transition-colors mt-8 md:hidden">
          VIEW ALL →
        </a>
      </div>
    </section>
  );
}
