import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-12 px-5 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <span className="tracking-[0.3em] block mb-4" style={{ fontSize: "1.25rem", fontWeight: 800 }}>NVRLND</span>
            <p className="text-white/40 text-sm max-w-sm" style={{ lineHeight: 1.7 }}>
              Born from the streets. Designed for the culture. We create streetwear for those who express themselves unapologetically.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors text-sm tracking-wider" style={{ fontWeight: 600 }}>TIKTOK</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-white/40 mb-4" style={{ fontWeight: 600 }}>SHOP</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-white/40 mb-4" style={{ fontWeight: 600 }}>HELP</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/20">
          &copy; 2026 NVRLND. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
