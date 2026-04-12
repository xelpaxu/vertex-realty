import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { propertiesData } from '../data/properties';

export default function PropertyDetail() {
  const { id } = useParams();
  
  const p = useMemo(() => {
    return propertiesData.find(item => String(item.id) === String(id));
  }, [id]);

  const [activeImage, setActiveImage] = useState(0);

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

  // In a real app, p.gallery would be an array. Using p.img repeatedly for demo.
  const gallery = [p.img, p.img, p.img, p.img]; 

  return (
    <div className="bg-navy min-h-screen">
      {/* 1. ARCHITECTURAL GALLERY HEADER */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              src={gallery[activeImage]}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
          </AnimatePresence>
        </div>

        {/* Vertical Filmstrip Thumbnails */}
        <div className="absolute left-6 md:left-10 bottom-40 z-30 flex flex-col gap-3">
          {gallery.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(i)}
              className={`relative w-12 h-16 md:w-16 md:h-20 overflow-hidden border transition-all duration-500 ${
                activeImage === i ? 'border-gold scale-110 shadow-lg' : 'border-white/10 opacity-40 hover:opacity-100'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`view-${i}`} />
            </button>
          ))}
        </div>

        {/* Floating Title Overlay */}
        <div className="absolute inset-0 flex items-end pb-40 z-20 pointer-events-none">
          <div className="max-w-[1300px] mx-auto w-full px-6 md:px-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-gold text-[10px] tracking-[0.5em] uppercase font-bold mb-4">
                Ref No. {p.id} // Vertex Portfolio
              </div>
              <h1 className="text-5xl md:text-8xl font-bold italic text-offwhite tracking-tighter leading-[0.85] max-w-4xl uppercase">
                {p.title}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

        <Link to="/properties" className="absolute top-10 left-6 md:left-10 z-30 text-[10px] tracking-[0.3em] uppercase text-offwhite/60 hover:text-gold flex items-center gap-2 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Listings
        </Link>
      </section>

      {/* 2. THE FLOATING SPECS BAR */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 -mt-16 relative z-40">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0a0f1a] border-t-2 border-gold grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 shadow-2xl"
        >
          {[
            { label: 'Surface area', value: `${p.area} m²` },
            { label: 'Living Quarters', value: `${p.beds} Beds` },
            { label: 'Sanitary', value: `${p.baths} Baths` },
            { label: 'Status', value: p.status || 'Available' },
          ].map((spec, i) => (
            <div key={i} className="p-8 group hover:bg-gold/5 transition-colors">
              <p className="text-[9px] uppercase tracking-[.3em] text-gold/50 mb-2">{spec.label}</p>
              <p className="text-2xl font-bold text-offwhite group-hover:text-gold transition-colors">{spec.value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. CORE CONTENT GRID */}
      <main className="max-w-[1300px] mx-auto px-6 md:px-10 mt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-gold text-navy text-[9px] uppercase tracking-widest font-bold">
                {p.mode === 'buy' ? 'Ownership' : 'Leasehold'}
              </span>
              <span className="text-slate-custom text-[10px] tracking-[0.2em] uppercase font-semibold">
                {p.project} // {p.type}
              </span>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-gold text-sm uppercase tracking-widest mb-6 border-b border-gold/10 pb-4 inline-block">Architectural Narrative</h3>
              <p className="text-slate-custom leading-relaxed text-lg font-light italic mb-8">
                {p.location} — A definitive statement in modern luxury.
              </p>
              <p className="text-offwhite/70 leading-relaxed text-[16px] mb-6">
                Experience a residence where precision meets luxury. This {p.type} at {p.project} has been curated for those who value structural integrity and aesthetic clarity. Every square meter reflects the Vertex standard of excellence, offering panoramic vistas and high-spec finishes.
              </p>
            </div>
          </div>

          {/* Floating Action Box */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-navy-light border border-gold/20 p-10"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 text-gold">Market Valuation</div>
                <div className="text-4xl font-black italic tracking-tighter text-offwhite mb-1">{p.priceLabel}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-custom mb-8 border-b border-white/5 pb-6">{p.priceSub}</div>
                
                <div className="flex flex-col gap-3">
                  <a href="https://www.facebook.com/" target='_blank' rel="noreferrer">
                    <button className="w-full bg-gold text-navy py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-bright transition-all">
                      Schedule a Viewing
                    </button>
                  </a>
                  <a href="https://www.facebook.com/" target='_blank' rel="noreferrer">
                    <button className="w-full border border-gold/30 text-gold py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold/10 transition-all">
                      Inquire via Messenger
                    </button>
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-[10px] font-bold text-gold">VA</div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-offwhite">Vertex Advisor</div>
                      <div className="text-[9px] text-slate-custom italic">Assigned to this Listing</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}