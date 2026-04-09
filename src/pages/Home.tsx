import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import PropertyCard from '../components/ui/PropertyCard';
import { propertiesData } from '../data/properties';
import HeroVideo from '../../assets/heroVideo.mp4';

// --- Particle Canvas ---
class Particle {
  x: number; y: number; vx: number; vy: number; r: number; a: number;
  constructor(W: number, H: number, init: boolean) {
    this.x = Math.random() * W; this.y = init ? Math.random() * H : -10;
    this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5; this.a = Math.random();
  }
  tick(W: number, H: number) { this.x += this.vx; this.y += this.vy; if(this.x<0||this.x>W)this.vx*=-1; if(this.y<0||this.y>H)this.vy*=-1; }
  draw(ctx: CanvasRenderingContext2D) { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${this.a * 0.35})`; ctx.fill(); }
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    let pts: Particle[] = [];
    for (let i = 0; i < 70; i++) pts.push(new Particle(W, H, true));
    const handleResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => { p.tick(W, H); p.draw(ctx); });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) { ctx.beginPath(); ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 160) * 0.12})`; ctx.lineWidth = 1; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', handleResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />;
}

// --- Data ---
const highlights = [
  { num: '01', title: 'Zero-Pressure Approach', body: 'We never rush a decision. Our advisors are compensated on successful outcomes — not on volume. This means honest assessments, even when the honest answer is "don\'t buy this."', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { num: '02', title: 'Off-Market Access', body: 'Over 40% of our transactions involve properties never listed publicly. Our relationships with developers and private sellers give clients access others simply don\'t have.', icon: <svg><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
  { num: '03', title: 'Legal & Financial Rigor', body: 'Every transaction passes through our legal director and financial advisor before closing. Title verification, tax implications, loan structuring — all handled internally.', icon: <svg><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
  { num: '04', title: 'Client-First, Always', body: 'We represent the buyer, not the seller. Our fiduciary duty is to you. This fundamental alignment of interest is rare in Philippine real estate — and it changes everything.', icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /> }
];

const selectArrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;

// --- Main Component ---
export default function Home() {
  const projects = ['Kalea Heights', 'One Delta', 'Moncello Crest'];
  
  // Filter State
  const [filterMode, setFilterMode] = useState<'buy' | 'rent'>('buy');
  const [showResults, setShowResults] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ fname: '', lname: '', email: '', phone: '', interest: '', budget: '', message: '' });
  const [errors, setErrors] = useState({ fname: false, lname: false, email: false, message: false });

  const handleSearch = () => {
    let count = Math.floor(Math.random() * 30) + 5;
    setResultCount(count);
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = { fname: false, lname: false, email: false, message: false };
    
    if (!formData.fname.trim()) newErrors.fname = true;
    if (!formData.lname.trim()) newErrors.lname = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;

    setErrors(newErrors);
    if (Object.values(newErrors).some(v => v)) return;
    
    setFormSubmitted(true);
  };

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <header className="h-screen min-h-[700px] relative flex items-end px-6 md:px-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
            <video
                src={HeroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                onCanPlayThrough={(e) => e.currentTarget.play()}
                />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/45 via-navy/65 to-navy"></div>
        </div>
        <ParticleCanvas />
        <div className="relative z-[2] max-w-[900px]">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className="flex items-center gap-3 text-[12px] tracking-[0.4em] ml-4 font-semibold uppercase text-gold mb-7">
            BACOLOD | ILOILO | ROXAS | GUIMARAS
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:1}} className="text-[clamp(52px,8vw,112px)] font-bold leading-[0.92] italic tracking-tight text-offwhite mb-8" style={{textShadow:'0 4px 40px rgba(0,0,0,0.5)'}}>
            We're Built<br/><em className="text-gold not-italic">to be Different.</em>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.55,duration:0.8}} className="max-w-[440px] text-sm leading-relaxed text-slate-custom">
            Premier property advisory for discerning buyers and tenants. Curated listings across Panay.
          </motion.p>
        </div>
        {/* Scroll Indicator */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:1}} className="absolute bottom-20 right-10 z-[2] hidden md:flex flex-col items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-slate-custom font-medium" style={{writingMode:'vertical-rl'}}>
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent mb-1"></div>Scroll
        </motion.div>
      </header>

      {/* FILTER SECTION */}
      <section className="py-24 pb-20 px-6 md:px-10 bg-navy relative z-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader tag="Find Your Property" title={`I Want to <em>${filterMode === 'buy' ? 'Buy' : 'Rent'}</em>`} />
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            <div className="flex gap-0 mb-8 border-b border-gold/10">
              {(['buy', 'rent'] as const).map(m => (
                <button key={m} onClick={() => setFilterMode(m)} className={`px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase relative transition-colors ${filterMode === m ? 'text-gold' : 'text-slate-custom hover:text-offwhite'}`}>
                  {m}
                  {filterMode === m && <motion.div layoutId="filter-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Location</label>
                <select className="w-full py-3.5 px-4 bg-navy-light border border-gold/15 text-offwhite text-[13px] appearance-none outline-none focus:border-gold transition-colors" style={{backgroundImage: selectArrow, backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center', paddingRight:'40px'}}>
                  <option value="">All Locations</option><option>Makati City</option><option>Bonifacio Global City</option><option>Taguig City</option><option>Quezon City</option><option>Cebu City</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Unit Type</label>
                <select className="w-full py-3.5 px-4 bg-navy-light border border-gold/15 text-offwhite text-[13px] appearance-none outline-none focus:border-gold transition-colors" style={{backgroundImage: selectArrow, backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center', paddingRight:'40px'}}>
                  <option value="">All Types</option><option>Studio</option><option>1 Bedroom</option><option>2 Bedroom</option><option>3 Bedroom</option><option>House & Lot</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Price Range</label>
                <select className="w-full py-3.5 px-4 bg-navy-light border border-gold/15 text-offwhite text-[13px] appearance-none outline-none focus:border-gold transition-colors" style={{backgroundImage: selectArrow, backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center', paddingRight:'40px'}}>
                  <option value="">Any Price</option>
                  {filterMode === 'buy' 
                    ? <><option value="0-5m">Under ₱5M</option><option>₱5M — ₱10M</option><option>₱10M — ₱20M</option><option>₱20M — ₱50M</option><option>₱50M — ₱100M</option><option>₱100M+</option></>
                    : <><option value="0-15k">Under ₱15K/mo</option><option>₱15K — ₱25K/mo</option><option>₱25K — ₱50K/mo</option><option>₱50K+/mo</option></>
                  }
                </select>
              </div>
              <button onClick={handleSearch} className="px-8 py-3.5 bg-gold text-navy text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-gold-bright transition-colors">
                Search
              </button>
            </div>
            {showResults && (
              <div className="mt-5 text-xs text-slate-custom">Showing <strong className="text-offwhite font-semibold">{resultCount}</strong> properties matching your criteria</div>
            )}
          </motion.div>
        </div>
      </section>

    <section id="properties-section" className="py-24 px-6 md:px-10 bg-navy-mid border-t border-gold/5 relative z-20 overflow-hidden">
    <div className="max-w-[1300px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
        <SectionHeader tag="Curated Selection" title="Recommended<br/><em>Properties</em>" className="mb-0" />
        <a href="/properties" className="text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-custom border-b border-transparent hover:text-gold hover:border-gold pb-0.5 transition-all">
            View All Listings →
        </a>
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
        <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear"
            }}
        >
            {[...projects, ...projects].map((proj, i) => {
            const props = propertiesData.filter(p => p.project === proj);
            const recommended = props[Math.floor(Math.random() * props.length)];

            if (!recommended) return null;

            return (
                <div key={`${proj}-${i}`} className="min-w-[280px] max-w-[280px]">
                <PropertyCard p={recommended} index={i} />
                </div>
            );
            })}
        </motion.div>
        </div>

    </div>
    </section>

    {/* CITIES (PROFESSIONAL LAYOUT) */}
    <section className="py-24 px-6 md:px-10 bg-navy border-t border-gold/5 relative z-20">
    <div className="max-w-[1300px] mx-auto">
        <SectionHeader tag="Markets We Serve" title="Explore<br/><em>Cities</em>" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-auto lg:h-[520px]">

        {/* FEATURED CITY (LEFT BIG) */}
        <motion.div 
            initial={{opacity:0,y:30}} 
            whileInView={{opacity:1,y:0}} 
            viewport={{once:true}} 
            className="relative overflow-hidden group border border-gold/10 lg:col-span-2 h-[320px] lg:h-full"
        >
            <img 
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80" 
            alt="Makati City"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-3xl font-bold italic text-offwhite mb-2">Makati City</h3>
            <div className="text-[11px] tracking-[0.25em] uppercase text-gold font-semibold mb-2">
                The Financial Capital
            </div>
            <div className="text-xs text-slate-custom">
                48 Active Listings
            </div>
            </div>
        </motion.div>

        {/* RIGHT STACK */}
        <div className="grid grid-cols-1 gap-5">

            {[
            {
                name: 'BGC',
                sub: 'Bonifacio Global City',
                count: '62 Active Listings',
                img: 'https://images.unsplash.com/photo-1520483601560-389dff434fdf?w=600&q=80'
            },
            {
                name: 'Cebu City',
                sub: 'Queen City of the South',
                count: '27 Active Listings',
                img: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&q=80'
            }
            ].map((city, i) => (
            <motion.div 
                key={city.name}
                initial={{opacity:0,y:30}} 
                whileInView={{opacity:1,y:0}} 
                viewport={{once:true}} 
                transition={{delay:i*0.1}}
                className="relative overflow-hidden border border-gold/10 group h-[150px]"
            >
                <img 
                src={city.img} 
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5">
                <h4 className="text-lg font-bold italic text-offwhite">{city.name}</h4>
                <div className="text-[9px] tracking-[0.2em] uppercase text-gold">{city.sub}</div>
                <div className="text-[9px] text-slate-custom mt-1">{city.count}</div>
                </div>
            </motion.div>
            ))}

        </div>

        {/* BOTTOM ROW */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 lg:mt-0">

            {[
            {
                name: 'Quezon City',
                sub: 'The Largest Metro',
                count: '35 Active Listings',
                img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80" 
            },
            {
                name: 'Iloilo City',
                sub: 'Emerging Prime Market',
                count: '14 Active Listings',
                img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80'
            },
            {
                name: 'Pasig City',
                sub: 'Ortigas & Beyond',
                count: '19 Active Listings',
                img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80'
            }
            ].map((city, i) => (
            <motion.div 
                key={city.name}
                initial={{opacity:0,y:30}} 
                whileInView={{opacity:1,y:0}} 
                viewport={{once:true}} 
                transition={{delay:i*0.1}}
                className="relative overflow-hidden border border-gold/10 group h-48"
            >
                <img 
                src={city.img} 
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5">
                <h4 className="text-lg font-bold italic text-offwhite">{city.name}</h4>
                <div className="text-[9px] tracking-[0.2em] uppercase text-gold">{city.sub}</div>
                <div className="text-[9px] text-slate-custom mt-1">{city.count}</div>
                </div>
            </motion.div>
            ))}

        </div>

        </div>
    </div>
    </section>

    {/* HIGHLIGHTS - Creative Asymmetric Layout */}
    <section className="py-32 px-6 md:px-10 bg-navy-mid relative z-20 overflow-hidden">
    {/* Background Decor Elements */}
    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
    
    <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <SectionHeader 
            tag="Why Vertex" 
            title="Vertex<br/><span className='text-gold italic font-light'>Highlights</span>" 
            className="text-left" 
        />
        <p className="text-slate-custom max-w-sm text-sm border-l border-gold/20 pl-6 mb-2">
            Breaking the traditional mold of architectural precision with a focus on fluid, functional design.
        </p>
        </div>

        {/* The Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
        {highlights.map((h, i) => (
            <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            // This logic creates a staggered "1-2-1" visual rhythm
            className={`
                relative group
                ${i % 3 === 0 ? 'md:col-span-7' : 'md:col-span-5'} 
                ${i % 2 === 0 ? 'md:mt-0' : 'md:mt-24'}
            `}
            >
            {/* Card Content */}
            <div className="relative p-8 md:p-12 h-full bg-navy/50 backdrop-blur-sm border-b border-r border-gold/10 hover:border-gold/40 transition-all duration-500">
                
                {/* Minimalist Numbering */}
                <span className="block text-xs font-mono tracking-[0.3em] text-gold/40 mb-8">
                PHASE // 0{i + 1}
                </span>

                <div className="flex flex-col h-full">
                <div className="mb-8 text-gold transform group-hover:scale-110 transition-transform duration-500 origin-left">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    {h.icon}
                    </svg>
                </div>

                <h3 className="text-2xl font-light text-offwhite mb-4 tracking-tight">
                    {h.title}
                </h3>
                
                <p className="text-[14px] leading-relaxed text-slate-custom/80 group-hover:text-slate-custom transition-colors">
                    {h.body}
                </p>
                </div>

                {/* Decorative Corner Bracket */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
            </div>
            </motion.div>
        ))}
        </div>
    </div>
    </section>

      {/* QUOTE */}
      <div className="py-20 px-6 md:px-10 bg-navy border-y border-gold/10 text-center relative overflow-hidden z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(80px,14vw,220px)] font-bold italic text-gold/[0.03] tracking-tight whitespace-nowrap pointer-events-none select-none">Precision</div>
        <motion.blockquote initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative max-w-[760px] mx-auto text-[clamp(22px,3vw,38px)] font-semibold italic leading-snug tracking-tight text-offwhite">
          "We never confused urgency with excellence. The deals that define careers are the ones where you <em className="text-gold not-italic">refused to rush.</em>"
          <cite className="block mt-7 text-[10px] tracking-[0.35em] uppercase not-italic font-semibold text-slate-custom">— Marcus A. Villanueva, Founder</cite>
        </motion.blockquote>
      </div>

      {/* CONTACT SECTION */}
      <section className="py-24 px-6 md:px-10 bg-navy-mid border-t border-gold/5 relative z-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Info */}
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="lg:sticky lg:top-[140px]">
            <SectionHeader tag="Get in Touch" title="Contact<br/><em>Us</em>" />
            <p className="text-sm leading-relaxed text-slate-custom mb-8">Every great property journey begins with a single conversation. Tell us what you're looking for — we'll tell you honestly if we can help.</p>
            
            {[
              { 
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, 
                label: 'Main Office', 
                value: '2ND FLOOR ADELINA BLDG. CORNER GENERAL LUNA, \nJalandoni St, Iloilo City, 5000' 
              },
              { 
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, 
                label: 'Email', 
                value: 'vertex0357realty@gmail.com' 
              },
              { 
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, 
                label: 'Phone', 
                value: '0917 884 8602' 
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3.5 items-start mb-5">
                <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0 text-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-1">{item.label}</div>
                  <div className="text-sm text-offwhite font-medium whitespace-pre-line">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Form */}
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}>
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="p-5 border border-green-500/30 bg-green-500/5 flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF7D" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <div><div className="text-sm text-offwhite font-medium">Message Sent Successfully</div><div className="text-xs text-slate-custom mt-0.5">Our team will respond within 24 hours.</div></div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">First Name *</label>
                      <input type="text" value={formData.fname} onChange={e=>setFormData({...formData, fname:e.target.value})} placeholder="Juan" className="w-full py-3.5 px-4 bg-navy border border-gold/15 text-offwhite text-[13px] outline-none focus:border-gold transition-colors" />
                      {errors.fname && <div className="text-[11px] text-[#E85D5D] mt-1.5">Please enter your first name.</div>}
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Last Name *</label>
                      <input type="text" value={formData.lname} onChange={e=>setFormData({...formData, lname:e.target.value})} placeholder="Dela Cruz" className="w-full py-3.5 px-4 bg-navy border border-gold/15 text-offwhite text-[13px] outline-none focus:border-gold transition-colors" />
                      {errors.lname && <div className="text-[11px] text-[#E85D5D] mt-1.5">Please enter your last name.</div>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Email Address *</label>
                    <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} placeholder="juan@example.com" className="w-full py-3.5 px-4 bg-navy border border-gold/15 text-offwhite text-[13px] outline-none focus:border-gold transition-colors" />
                    {errors.email && <div className="text-[11px] text-[#E85D5D] mt-1.5">Please enter a valid email address.</div>}
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} placeholder="+63 917 123 4567" className="w-full py-3.5 px-4 bg-navy border border-gold/15 text-offwhite text-[13px] outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">I'm Interested In</label>
                      <select value={formData.interest} onChange={e=>setFormData({...formData, interest:e.target.value})} className="w-full py-3.5 px-4 bg-navy border border-gold/15 text-offwhite text-[13px] appearance-none outline-none focus:border-gold transition-colors" style={{backgroundImage: selectArrow, backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center', paddingRight:'40px'}}>
                        <option value="">Select one</option><option>Buying a Property</option><option>Renting a Property</option><option>Investment Advisory</option><option>Selling My Property</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Budget Range</label>
                      <select value={formData.budget} onChange={e=>setFormData({...formData, budget:e.target.value})} className="w-full py-3.5 px-4 bg-navy border border-gold/15 text-offwhite text-[13px] appearance-none outline-none focus:border-gold transition-colors" style={{backgroundImage: selectArrow, backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center', paddingRight:'40px'}}>
                        <option value="">Select range</option><option>Under ₱5M</option><option>₱5M – ₱10M</option><option>₱10M – ₱20M</option><option>₱20M – ₱50M</option><option>₱50M – ₱100M</option><option>₱100M+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-custom mb-2">Your Message *</label>
                    <textarea value={formData.message} onChange={e=>setFormData({...formData, message:e.target.value})} placeholder="Tell us about your ideal property — location, size, timeline, anything that helps us understand your needs." rows={5} className="w-full py-3.5 px-4 bg-navy border border-gold/15 text-offwhite text-[13px] outline-none focus:border-gold transition-colors resize-y min-h-[120px]"></textarea>
                    {errors.message && <div className="text-[11px] text-[#E85D5D] mt-1.5">Please enter your message.</div>}
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-gold text-navy text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-gold-bright transition-colors active:scale-[0.97] mt-2">
                    Send Inquiry
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-10 min-h-[180px] bg-navy-light border-t border-gold/10 px-6 md:px-10 relative z-20">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <h2 className="text-[clamp(24px,3vw,42px)] font-bold italic text-offwhite tracking-tight">Ready to find<br/><em className="text-gold not-italic">something exceptional?</em></h2>
        </motion.div>
        <a href="https://www.facebook.com/profile.php?id=100071329680525" target='_blank' className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-navy text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-gold-bright transition-colors">
          Begin the Conversation
        </a>
      </div>
    </div>
  );
}