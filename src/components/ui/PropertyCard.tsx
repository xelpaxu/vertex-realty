import { motion } from 'framer-motion';
import { type Property } from '../../types/types';

export default function PropertyCard({ p, index = 0 }: { p: Property, index?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-hover 
      className="bg-navy border border-gold/10 overflow-hidden transition-all duration-300 hover:border-gold/30 hover:-translate-y-1 group"
    >
      <div className="w-full aspect-[16/10] overflow-hidden relative">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className={`absolute top-3 left-3 text-[8px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 z-2 ${p.mode === 'rent' ? 'bg-navy-mid text-gold border border-gold/40' : 'bg-gold text-navy'}`}>
          {p.mode === 'rent' ? 'For Rent' : 'For Sale'}
        </div>
        {p.status && (
          <div className={`absolute top-3 right-3 text-[8px] tracking-[0.15em] uppercase font-bold px-2.5 py-1 border z-2 ${p.status === 'Ready' ? 'border-green-500/50 text-green-500' : 'border-gold/50 text-gold'}`}>
            {p.status}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold mb-1.5">
            {p.project}
        </div>

        <div className="text-base font-bold text-offwhite mb-1 tracking-tight">
            {p.title}
        </div>
        <div className="text-[10px] tracking-[0.15em] uppercase text-slate-custom font-medium mb-3.5">{p.location}</div>
        <div className="flex gap-4 mb-4 flex-wrap text-[11px] text-slate-custom">
          <span className="flex items-center gap-1"><svg className="opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg><strong className="text-offwhite font-semibold">{p.area}</strong> sqm</span>
          <span className="flex items-center gap-1"><svg className="opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg><strong className="text-offwhite font-semibold">{p.beds}</strong> Bed</span>
          <span className="flex items-center gap-1"><svg className="opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg><strong className="text-offwhite font-semibold">{p.baths}</strong> Bath</span>
        </div>
        <div className="text-2xl font-bold italic text-gold tracking-tight leading-none">{p.priceLabel}</div>
        <div className="text-[10px] font-medium text-slate-custom mt-1">{p.priceSub}</div>
      </div>
      <div className="px-5 py-3 border-t border-gold/5 flex justify-between items-center">
        <span className="text-[8px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 border border-gold/20 text-gold">{p.type}</span>
        <a href="#" className="text-[9px] tracking-[0.2em] uppercase font-semibold text-slate-custom hover:text-gold transition-colors flex items-center gap-1.5">
          Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </motion.div>
  );
}