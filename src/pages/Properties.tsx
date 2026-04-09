import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/ui/PropertyCard';
import { propertiesData } from '../data/properties';

export default function Properties() {
  const [mode, setMode] = useState<'buy' | 'rent'>('buy');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const uniqueLocations = [...new Set(propertiesData.map(p => p.location))];
  const uniqueTypes = [...new Set(propertiesData.map(p => p.type))];

  const filteredProperties = useMemo(() => {
    return propertiesData.filter(p => {
      if (p.mode !== mode) return false;
      if (locationFilter && p.location !== locationFilter) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      return true;
    });
  }, [mode, locationFilter, typeFilter]);

  const groupedProperties = useMemo(() => {
    return filteredProperties.reduce((acc, p) => {
      if (!acc[p.project]) acc[p.project] = { loc: p.projectLoc, items: [] };
      acc[p.project].items.push(p);
      return acc;
    }, {} as Record<string, { loc: string, items: typeof propertiesData }>);
  }, [filteredProperties]);

  return (
    <div>
      {/* HERO */}
      <header className="h-[40vh] min-h-[320px] relative flex items-end px-6 md:px-10 pb-14">
        <div className="absolute inset-0 bg-cover" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80)'}}>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/55 to-navy"></div>
        </div>
        <div className="relative z-[2] max-w-[900px]">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="flex items-center gap-3 text-[9px] tracking-[0.4em] font-semibold uppercase text-gold mb-5">
            <span className="w-8 h-px bg-gold"></span>Full Listings
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:1}} className="text-[clamp(42px,6vw,80px)] font-bold leading-[0.92] italic tracking-tight text-offwhite" style={{textShadow:'0 4px 40px rgba(0,0,0,0.5)'}}>
            Available <em className="text-gold not-italic">Properties</em>
          </motion.h1>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="sticky top-[72px] z-40 py-5 px-6 md:px-10 bg-navy-light/95 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3 flex-wrap">
          <div className="flex gap-0 mr-3">
            {(['buy', 'rent'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all ${mode === m ? 'bg-gold text-navy border-gold' : 'border-gold/15 text-slate-custom hover:border-gold/40 hover:text-offwhite'}`}>
                {m}
              </button>
            ))}
          </div>
          
          <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="flex-1 min-w-[140px] max-w-[200px] py-2.5 px-3 pr-8 bg-navy border border-gold/15 text-offwhite text-xs appearance-none outline-none focus:border-gold" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center'}}>
            <option value="">All Locations</option>
            {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="flex-1 min-w-[140px] max-w-[200px] py-2.5 px-3 pr-8 bg-navy border border-gold/15 text-offwhite text-xs appearance-none outline-none focus:border-gold" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center'}}>
            <option value="">All Types</option>
            {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <div className="flex-1 min-w-[8px]"></div>
          
          <div className="text-[11px] text-slate-custom">
            Showing <strong className="text-offwhite font-semibold">{filteredProperties.length}</strong> properties
          </div>
        </div>
      </div>

      {/* LISTINGS */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 pb-20">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl text-gold/20 italic font-bold mb-5">∅</div>
            <div className="text-lg text-offwhite font-semibold mb-2">No properties match your criteria</div>
            <div className="text-sm text-slate-custom">Try adjusting your filters.</div>
          </div>
        ) : (
          Object.entries(groupedProperties).map(([proj, data]) => (
            <div key={proj} className="mb-16 last:mb-0">
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-4 border-b border-gold/10">
                <h3 className="text-xl font-bold text-offwhite">{proj}</h3>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">{data.loc}</span>
                <span className="sm:ml-auto text-[10px] tracking-[0.2em] uppercase text-slate-custom font-medium">{data.items.length} Units</span>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {data.items.map((p, i) => <PropertyCard key={p.id} p={p} index={i} />)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}