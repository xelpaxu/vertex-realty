import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { propertiesData } from '../data/properties';

export default function PropertyDetail() {
  const { id } = useParams();
  
  // 1. Force both to string to prevent type mismatch
  const p = useMemo(() => {
    return propertiesData.find(item => String(item.id) === String(id));
  }, [id]);

  const [activeImage, setActiveImage] = useState(0);

  // 2. Creative "Not Found" instead of a blank screen
  if (!p) {
    return (
      <div className="h-screen bg-navy flex flex-col items-center justify-center px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="border border-gold/10 p-12 bg-navy-mid relative"
        >
          <div className="text-8xl font-black italic text-gold/5 absolute inset-0 flex items-center justify-center select-none">
            404
          </div>
          <h2 className="text-2xl font-bold text-offwhite mb-4 relative z-10">Listing Unattainable</h2>
          <p className="text-slate-custom text-sm mb-8 max-w-xs relative z-10">
            The property reference <span className="text-gold">#{id}</span> is either off-market or the architectural record has moved.
          </p>
          <Link to="/properties" className="inline-block bg-gold text-navy px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold-bright transition-all relative z-10">
            Return to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  // Mock additional images for gallery - in real app, these would be in your data
  const gallery = [p.img, p.img, p.img]; 

  return (
    <div className="bg-navy min-h-screen">
      {/* 1. CINEMATIC GALLERY HEADER */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-navy-mid">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            src={gallery[activeImage]}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        
        {/* Navigation Overlays */}
        <div className="absolute bottom-10 left-6 md:left-10 flex gap-3">
          {gallery.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(i)}
              className={`h-1 transition-all duration-500 ${activeImage === i ? 'w-12 bg-gold' : 'w-4 bg-gold/30'}`}
            />
          ))}
        </div>

        <Link to="/properties" className="absolute top-10 left-6 md:left-10 z-10 text-[10px] tracking-[0.3em] uppercase text-offwhite/60 hover:text-gold flex items-center gap-2 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Listings
        </Link>
      </section>

      {/* 2. THE CORE INFO GRID */}
      <main className="max-w-[1300px] mx-auto px-6 md:px-10 -mt-32 relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-mid border border-gold/10 p-8 md:p-12"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 border border-gold/40 text-gold text-[9px] uppercase tracking-widest font-bold">
                  {p.mode === 'buy' ? 'Ownership' : 'Leasehold'}
                </span>
                <span className="text-slate-custom text-[10px] tracking-[0.2em] uppercase font-semibold">
                  {p.project} // {p.type}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold italic text-offwhite tracking-tighter mb-4">
                {p.title}
              </h1>
              <p className="text-gold text-lg font-medium mb-10 tracking-wide">{p.location}</p>

              {/* Technical Specs Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gold/10 mb-12">
                {[
                  { label: 'Floor Area', value: `${p.area} sqm`, icon: 'M3 3h18v18H3z' },
                  { label: 'Bedrooms', value: p.beds, icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
                  { label: 'Bathrooms', value: p.baths, icon: 'M22 12H2' },
                  { label: 'Condition', value: p.status || 'Ready', icon: 'M9 12l2 2 4-4' },
                ].map((spec, i) => (
                  <div key={i} className="p-6 border-r border-b border-gold/10 last:border-r-0 flex flex-col items-center text-center">
                    <span className="text-[10px] text-slate-custom uppercase tracking-widest mb-3 opacity-50">{spec.label}</span>
                    <span className="text-xl font-bold text-offwhite italic">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-gold text-sm uppercase tracking-widest mb-4">Architectural Narrative</h3>
                <p className="text-slate-custom leading-relaxed text-[15px]">
                  Experience a residence where precision meets luxury. This {p.type} at {p.project} has been curated for those who value structural integrity and aesthetic clarity. From the floor-to-ceiling vistas to the meticulous material selection, every square meter reflects the Vertex standard of excellence.
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Floating Action Box */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gold p-10 text-navy"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 opacity-70">Market Valuation</div>
                <div className="text-4xl font-black italic tracking-tighter mb-1">{p.priceLabel}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-8 border-b border-navy/10 pb-6">{p.priceSub}</div>
                
                <div className="flex flex-col gap-3">
                    <a href="https://www.facebook.com/profile.php?id=100071329680525" target='_blank'>
                        <button className="w-full bg-navy text-white py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-navy-light transition-all">
                            Schedule a Viewing
                        </button>
                    </a>
                  
                  <a href="https://www.facebook.com/profile.php?id=100071329680525" target='_blank'>
                    <button className="w-full border border-navy text-navy py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-navy/5 transition-all">
                        Inquire via Facebook
                    </button>
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-navy/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center text-[10px] font-bold">VA</div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest">Vertex Advisor</div>
                      <div className="text-[9px] opacity-70 italic">Assigned to this Listing</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Utilities */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <button className="p-4 border border-gold/10 text-[9px] uppercase tracking-widest text-slate-custom hover:bg-gold/5 transition-all">Download PDF</button>
                <button className="p-4 border border-gold/10 text-[9px] uppercase tracking-widest text-slate-custom hover:bg-gold/5 transition-all">Share Listing</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}