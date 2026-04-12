import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import HeroPhoto from '../../assets/group1.jpg';
import GroupPhoto1 from '../../assets/group2.jpg';
import founder1 from '../../assets/founderImage.jpg';
import founder2 from '../../assets/founderImage2.jpg';
import leaImage from '../../assets/lea-redgarnet.png';
import emeraldSD from '../../assets/sales_director-emerald.png';

// --- Typed Particle Canvas (Identical to Home.tsx) ---
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
const stats = [
  { num: '350', sub: 'Clients Served', sup: '+' },
  { num: '₱28', sub: 'In Total Transactions', sup: 'B' },
  { num: '15', sub: 'In Operation', sup: 'yr' },
  { num: '28', sub: 'Senior Advisors', sup: '' },
];

const ethosCards = [
  { 
    num: '03', 
    title: 'Trust with All Your Heart', 
    body: 'Rooted in Verse 5, we believe true partnership begins with wholehearted trust. We lean not on our own understanding or market trends alone, but on a foundation of absolute transparency and integrity that ensures your peace of mind is never compromised.', 
    pills: ['Proverbs 3:5', 'Wholehearted Trust', 'Market Integrity'] 
  },
  { 
    num: '05', 
    title: 'Straight Paths in All Ways', 
    body: 'Guided by Verse 6, we acknowledge a higher standard in every transaction. Our mission is to make your real estate journey "straight"—removing the crooked complexities of buying and selling through divine diligence and a commitment to honest, clear-cut pathways.', 
    pills: ['Proverbs 3:6', 'Submission to Excellence', 'Clear Pathways'] 
  },
  { 
    num: '07', 
    title: 'Wisdom Beyond the Surface', 
    body: 'Reflecting Verse 7, we refuse to be wise in our own eyes. We approach every property in Iloilo and beyond with humility and a "fear of the Lord," shunning unethical shortcuts to ensure our precision and service honor the community and the Creator.', 
    pills: ['Proverbs 3:7', 'Humble Expertise', 'Ethical Stewardship'] 
  },
];

const sales_director = [
  { name: 'Lea Morancil', team: 'Red Garnet', bio: '15+ years in investment analysis and real estate advisory. Founded Vertex on the principle that property transactions deserve institutional-grade rigor.', since: 'Since 2010', img: `${leaImage}` },
  { name: 'Annalyn Fuentespina', team: 'Founder', bio: 'Former architect turned operations executive. Applies structural thinking to every process and transaction within the firm.', since: 'Since 2012', img: `${founder2}` },
  { name: 'Jason Fuentespina', team: 'Founder', bio: 'Investment banking background with 12 years in property finance. Every number he presents is airtight. Every projection, conservative.', since: 'Since 2013', img: `${founder1}` },
  { name: 'John Doe', team: 'Red Garnet', bio: 'UP Law graduate. Every contract she drafts is airtight. Every title transfer, bulletproof. Clients sleep well because of Sofia.', since: 'Since 2014', img: `${emeraldSD}` },
];

const agentDetails = [
  { name: 'Jason Fuentespina', role: 'Founder', img: `${founder1}`, bio: 'Marcus spent the first decade of his career as an investment analyst at a Manila-based boutique firm, specializing in real estate-backed securities. In 2010, he left institutional finance to build Vertex from the ground up — driven by the conviction that individual property buyers deserved the same analytical rigor that institutional investors received.<br><br>Under his leadership, Vertex has grown from a three-person Makati operation to a 28-advisor firm with offices in Pasig, Cebu, and Iloilo. Marcus personally oversees every transaction above ₱50M.<br><br>He holds a BS Management degree from Ateneo de Manila University and completed executive programs at INSEAD.', stats: [{n:'₱12.4B',l:'Total Volume Closed'},{n:'180+',l:'Clients Advised'},{n:'15yr',l:'Industry Experience'}], specs: ['Luxury Residential', 'Investment Advisory', 'Pre-Selling Analysis', 'Portfolio Strategy'] },
  { name: 'Ann Fuentespina', role: 'Founder', img: `${founder2}`, bio: 'Elena began her career as a licensed architect at a prominent Manila firm, where she spent six years designing mid-rise residential projects across Metro Manila. Her transition to real estate operations was driven by a simple realization: the best-designed buildings were being sold by people who didn\'t understand them.<br><br>At Vertex, Elena oversees all operational processes — from client onboarding to turnover logistics. She redesigned the firm\'s 7-step closing methodology in 2018 and personally trains every new advisor.<br><br>She holds a BS Architecture degree from UP and an MBA from the Asian Institute of Management.', stats: [{n:'₱8.2B',l:'Total Volume Closed'},{n:'120+',l:'Clients Advised'},{n:'13yr',l:'Industry Experience'}], specs: ['Operations Design', 'Property Evaluation', 'Developer Relations'] }
];

const faqs = [
  { q: 'What does "3:5–7" actually mean?', a: 'Each number maps to a core operating principle: Trust (3 commitments), Quality (5 sensory criteria), and Process (7 closing steps). It\'s not marketing — it\'s methodology.' },
  { q: 'What price range do you specialize in?', a: 'We specialize in the premium and luxury segment — typically properties valued at ₱20 million and above. Our sweet spot is ₱35M to ₱200M.' },
  { q: 'Do buyers pay a fee?', a: 'For standard acquisitions, our advisory is complimentary to buyers. For bespoke off-market searches, a separate retainer may apply — always disclosed upfront in writing.' },
  { q: 'Where do you operate?', a: 'Our primary markets are Metro Manila, Cebu, and Iloilo. We also assist with curated acquisitions in Davao and Boracay on a case-by-case basis.' },
  { q: 'How do I begin working with Vertex?', a: 'Every engagement begins with a confidential discovery call — typically 30 minutes. We learn what you need. We\'re honest about whether we\'re the right fit.' },
  { q: 'How are your advisors different from other brokers?', a: 'Every Vertex advisor undergoes 200+ hours of internal training before handling their first client. Many come from architecture, finance, or law — not just brokerage.' },
];

const timeline = [
  { year: '2010', title: 'The Foundation', text: 'Founded in a small Makati office with a singular conviction: the Philippine real estate market deserved a brokerage that operated with architectural precision. Three people. One standard.' },
  { year: '2014', title: 'First Landmark Deal', text: 'Brokered our first major transaction — a 45-unit premium condominium in Taguig. The sale set a new per-square-meter record for the district and established our reputation for impossible results.' },
  { year: '2018', title: 'The 3:5–7 Framework', text: 'Formalized our proprietary client methodology after eight years of refinement. The framework became the measurable standard by which we evaluate every property, partner, and transaction.' },
  { year: '2022', title: 'National Expansion', text: 'Opened advisory offices in Cebu and Iloilo. Our client base expanded to include overseas Filipino investors, diplomatic corps, and multinational corporate relocations.' },
  { year: '2010', title: 'The Foundation', text: 'Founded in a small Makati office with a singular conviction: the Philippine real estate market deserved a brokerage that operated with architectural precision. Three people. One standard.' },
  { year: '2014', title: 'First Landmark Deal', text: 'Brokered our first major transaction — a 45-unit premium condominium in Taguig. The sale set a new per-square-meter record for the district and established our reputation for impossible results.' },
  { year: '2018', title: 'The 3:5–7 Framework', text: 'Formalized our proprietary client methodology after eight years of refinement. The framework became the measurable standard by which we evaluate every property, partner, and transaction.' },
  { year: '2022', title: 'National Expansion', text: 'Opened advisory offices in Cebu and Iloilo. Our client base expanded to include overseas Filipino investors, diplomatic corps, and multinational corporate relocations.' },
  { year: '2025', title: 'The Next Vertex', text: 'Over 350 satisfied clients. A team of 28 senior advisors across Metro Manila, Cebu, and Iloilo. The mission has not changed — we are simply further along the line.', active: true },
  { year: '2025', title: 'The Next Vertex', text: 'Over 350 satisfied clients. A team of 28 senior advisors across Metro Manila, Cebu, and Iloilo. The mission has not changed — we are simply further along the line.', active: true },
];

// --- Component ---
export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

    // ... inside About component
    const scrollRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    // The 'stiffness' and 'damping' here control the "slow/smooth" feel
    const springX = useSpring(x, { stiffness: 60, damping: 20 });

    useEffect(() => {
    // Sync the spring value to the actual scroll position
    return springX.on("change", (val) => {
        if (scrollRef.current) {
        scrollRef.current.scrollLeft = -val;
        }
    });
    }, [springX]);

    const handleDrag = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only drag if left click is held
    // Adjust the '0.5' to make the physical drag feel heavier or lighter
    x.set(x.get() + e.movementX * 1.5); 
    };

  return (
    <div>
      {/* HERO */}
      <header className="h-[70vh] min-h-[560px] relative flex items-end px-6 md:px-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[20%_80%]" style={{backgroundImage: `url(${HeroPhoto})`}}>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/60 to-navy"></div>
        </div>
        <ParticleCanvas />
        <div className="relative z-[2] max-w-[900px]">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className="flex items-center gap-3 text-[9px] tracking-[0.4em] font-semibold uppercase text-gold mb-6">
            <span className="w-8 h-px bg-gold"></span>Who We Are
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:1}} className="text-[clamp(48px,7vw,96px)] font-bold leading-[0.92] italic tracking-tight text-offwhite mb-6" style={{textShadow:'0 4px 40px rgba(0,0,0,0.5)'}}>
            Our Story,<br/><em className="text-gold not-italic">Our Standard.</em>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.55,duration:0.8}} className="max-w-[480px] text-sm leading-relaxed text-slate-custom">
            A real estate advisory firm built on conviction — that the Philippine property market deserves precision, honesty, and a higher standard of care.
          </motion.p>
        </div>
      </header>

    {/* STATS BAR */}
    <div className="grid grid-cols-2 lg:grid-cols-4 bg-navy-dark border-y border-gold/20 overflow-hidden">
    {stats.map((s, i) => (
        <motion.div 
        key={s.sub} 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
        className="relative p-10 group border-r border-gold/10 last:border-r-0 hover:bg-gold/[0.02] transition-colors"
        >
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500" />

        <div className="relative z-10">
            <div className="flex items-baseline gap-1 mb-2">
            <span className="text-5xl md:text-6xl font-bold italic tracking-tighter text-offwhite">
                {s.num}
            </span>
            {s.sup && (
                <span className="text-gold font-semibold text-lg self-start mt-1">
                {s.sup}
                </span>
            )}
            </div>
            
            <div className="flex items-center gap-3">
            <div className="h-px w-4 bg-gold/50" />
            <div className="text-[11px] tracking-[0.3em] uppercase text-slate-custom font-semibold">
                {s.sub}
            </div>
            </div>
        </div>
        </motion.div>
    ))}
    </div>

      {/* ETHOS SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-[1300px] mx-auto items-start">
          {/* Left Sticky */}
          <div className="lg:sticky lg:top-[140px]">
            <SectionHeader tag="The Framework" title="What's <em>Vertex 3:5-7</em>" />
            <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}} className="text-[15px] leading-relaxed text-slate-custom mb-6">
                Vertex 3:5-7 Realty is a real estate company that has made its mark in the industry with its exceptional services and commitment to excellence. The company was founded in the year 2020 by Jason and Ann Fuentespina, a visionary entrepreneur with a passion for real estate.
            </motion.p>
            <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}} className="text-[15px] leading-relaxed text-slate-custom mb-6">
                The inception of Vertex 3:5-7 Realty was driven by the desire to create a real estate agency that would not only provide top-notch services to its clients but also prioritize the well-being and professional growth of its agents.
            </motion.p>
            <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.3}} className="text-[15px] leading-relaxed text-slate-custom">
                The name “Vertex 3:5-7 Realty” was chosen to reflect the company’s core values and beliefs. From its early days, Vertex 3:5-7 Realty set out to establish a strong foothold in the real estate market. With a focus on Iloilo, Roxas, Bacolod, and Guimaras, the company aimed to become a trusted and reliable partner for buyers, sellers, and developers in these areas.</motion.p>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.4}} className="mt-8 w-full h-80 overflow-hidden border border-gold/10">
              <img src={GroupPhoto1} alt="Architectural marble detail" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col">
            {ethosCards.map((card, i) => (
              <motion.div 
                key={card.num} 
                initial={{opacity:0,y:30}} 
                whileInView={{opacity:1,y:0}} 
                viewport={{once:true}} 
                transition={{delay:i*0.1}}
                data-hover 
                className="border-t border-gold/10 py-10 grid grid-cols-[72px_1fr] gap-6 group hover:pl-3 hover:border-t-gold/40 transition-all last:border-b last:border-gold/10"
              >
                <div className="text-5xl font-bold italic text-gold/20 leading-none tracking-tight group-hover:text-gold transition-colors">{card.num}</div>
                <div>
                  <h3 className="text-xl font-bold text-offwhite mb-2.5 tracking-tight">{card.title}</h3>
                  <p className="text-[13px] leading-relaxed text-slate-custom">{card.body}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {card.pills.map(p => (
                      <span key={p} className="text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 border border-gold/25 text-gold">{p}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="py-24 px-6 md:px-10 bg-navy-mid border-y border-gold/10 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(80px,14vw,220px)] font-bold italic text-gold/[0.03] tracking-tight whitespace-nowrap pointer-events-none select-none">Precision</div>
        <motion.blockquote initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative max-w-[760px] mx-auto text-[clamp(22px,3vw,38px)] font-semibold italic leading-snug tracking-tight text-offwhite">
          "We never confuse a quick sale with a lasting legacy. At Vertex 3:5-7, we believe the homes that define lives are the ones where we <em className="text-gold not-italic">refused to rush the foundation of trust.</em>"
          <cite className="block mt-7 text-[10px] tracking-[0.35em] uppercase not-italic font-semibold text-slate-custom">—  Jason Fuentespina, Founder</cite>
        </motion.blockquote>
      </div>

    {/* SENIOR ADVISORS - Editorial Dossier Layout */}
    <section className="py-32 px-6 md:px-10 bg-navy relative overflow-hidden">
    {/* Background Decor */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/[0.01] -skew-x-12" />

    <div className="max-w-[1200px] mx-auto relative">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeader tag="Executive Profile" title="Senior <em>Advisors</em>" />
        <div className="text-[11px] tracking-[0.4em] uppercase text-gold/40 border-b border-gold/20 pb-2">
            Institutional Expertise // Individual Care
        </div>
        </div>

        <div className="space-y-32 md:space-y-48">
        {agentDetails.map((agent, i) => (
            <motion.div 
            key={agent.name} 
            initial={{ opacity: 0, y: 60 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
            }`}
            >
            {/* Large Background Index Number */}
            <div className={`absolute -top-16 text-[180px] font-black text-gold/[0.03] select-none pointer-events-none hidden lg:block ${
                i % 2 === 1 ? 'right-0' : 'left-0'
            }`}>
                0{i + 1}
            </div>

            {/* Photo Column - Floating Aesthetic */}
            <div className={`lg:col-span-5 relative group ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden z-10 border border-gold/10">
                <img 
                    src={agent.img} 
                    alt={agent.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                    loading="lazy" 
                />
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/40" />
                </div>
                {/* Background "Ghost" Square */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/5 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-7 flex flex-col ${i % 2 === 1 ? 'lg:order-1 lg:text-right lg:items-end' : ''}`}>
                <div className="mb-8">
                <h3 className="text-4xl md:text-5xl font-light text-offwhite tracking-tighter mb-2">
                    {agent.name.split(' ').map((word, index) => 
                    index === agent.name.split(' ').length - 1 ? <em key={index} className="italic text-gold ml-2">{word}</em> : word + " "
                    )}
                </h3>
                <div className="text-xs tracking-[0.4em] uppercase text-gold/60 font-semibold italic">
                    {agent.role}
                </div>
                </div>

                <div className={`text-[15px] leading-relaxed text-slate-custom mb-10 max-w-xl ${i % 2 === 1 ? 'ml-auto' : ''}`} 
                    dangerouslySetInnerHTML={{ __html: agent.bio }} />

                {/* Stats - Grid within the card */}
                <div className="grid grid-cols-3 gap-8 w-full border-t border-gold/10 pt-8 mb-10">
                {agent.stats.map(s => (
                    <div key={s.l} className="group/stat">
                    <div className="text-2xl font-bold italic text-offwhite tracking-tight group-hover/stat:text-gold transition-colors">{s.n}</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase text-slate-custom/60 font-medium mt-2">{s.l}</div>
                    </div>
                ))}
                </div>

                {/* Specialties - Modern Tags */}
                <div className="flex flex-wrap gap-2">
                {agent.specs.map(s => (
                    <span key={s} className="text-[10px] tracking-widest uppercase font-mono px-4 py-2 bg-navy-light border border-gold/5 text-slate-custom hover:border-gold/30 hover:text-gold transition-all cursor-default">
                    {s}
                    </span>
                ))}
                </div>
            </div>
            </motion.div>
        ))}
        </div>
    </div>
    </section>

    {/* LEADERSHIP TEAM (PERMANENT COLOR & STAGGERED GALLERY) */}
    <section className="py-24 md:py-32 px-6 md:px-10 bg-navy border-t border-gold/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-gold/20 via-transparent to-transparent hidden md:block" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <SectionHeader tag="The Vanguard" title="Sales <em>Directors</em>" className="mb-0" />
          <p className="text-slate-custom text-[10px] tracking-[0.3em] uppercase font-bold hidden md:block">
            Leading with Precision // 2026
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {sales_director.map((t, i) => {

            return (
              <motion.div 
                key={t.name} 
                initial={{opacity:0, y: 30}} 
                whileInView={{opacity:1, y: 0}} 
                viewport={{once:true}} 
                transition={{delay: i * 0.15, duration: 0.8}}
                className={`relative group ${'mt-0'}`}
              >
                {/* The Image Container - Removed Grayscale */}
                <div className="relative overflow-hidden aspect-[3/4] bg-navy-light mb-6 shadow-lg transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(201,168,76,0.15)]">
                  <img 
                    src={t.img} 
                    alt={t.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    loading="lazy" 
                  />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>

                {/* Info Section */}
                <div className="px-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-4 h-px bg-gold/50"></span>
                    <span className="text-[9px] tracking-[0.3em] uppercase text-gold font-bold">{t.team}</span>
                  </div>
                  <h3 className="text-xl font-bold text-offwhite tracking-tight uppercase mb-3">{t.name}</h3>
                  
                  {/* Bio: Stays hidden until hover for cleanliness, but text color is stable */}
                  <div className="overflow-hidden">
                    <p className="text-[11px] leading-relaxed text-slate-custom max-h-0 group-hover:max-h-24 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 italic">
                      {t.bio}
                    </p>
                  </div>
                  
                  <div className="text-[8px] text-gold/40 mt-4 tracking-[0.2em] uppercase font-bold">
                    {t.since}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* COMPACT HORIZONTAL JOURNEY - Smooth Momentum Version */}
    <section className="py-20 bg-navy overflow-hidden select-none">
    <div className="px-6 md:px-10 mb-12 flex justify-between items-end max-w-[1300px] mx-auto">
        <SectionHeader tag="History" title="The <em>Timeline</em>" />
        <div className="hidden md:block text-[10px] tracking-[0.3em] text-gold/30 uppercase pb-2">
        Drag slowly to explore history →
        </div>
    </div>

    <div 
        ref={scrollRef}
        onMouseMove={handleDrag}
        className="flex overflow-x-auto no-scrollbar px-6 md:px-[10vw] gap-0 pb-10 cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
    >
        {timeline.map((t, i) => (
        <motion.div 
            key={t.year}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="flex-shrink-0 w-[320px] md:w-[450px] relative border-l border-gold/10 group pointer-events-none"
        >
            <div className={`px-10 transition-all duration-700 group-hover:pl-14 ${
            i % 2 === 0 ? 'pt-0 pb-24' : 'pt-24 pb-0'
            }`}>
            
            <div className="flex items-center gap-4 mb-6">
                <span className={`text-5xl font-black italic tracking-tighter transition-colors duration-700 ${
                t.active ? 'text-gold' : 'text-gold/5 group-hover:text-gold/25'
                }`}>
                {t.year}
                </span>
                {t.active && (
                <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.6)] animate-pulse" />
                )}
            </div>

            <h3 className="text-xl font-bold text-offwhite mb-3 group-hover:text-gold transition-colors duration-500">
                {t.title}
            </h3>
            
            <p className="text-[14px] leading-relaxed text-slate-custom/60 group-hover:text-slate-custom/90 transition-colors duration-500">
                {t.text}
            </p>
            </div>

            {/* Decorative Line */}
            <div className="absolute top-[50%] left-0 w-full h-[1px] bg-gold/10">
            <div className="absolute left-[-5.5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-gold/40 bg-navy group-hover:bg-gold transition-all duration-500" />
            </div>
        </motion.div>
        ))}
        
        <div className="flex-shrink-0 w-[20vw]" />
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}} />
    </section>

      {/* FAQ SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-navy">
        <div className="max-w-[780px] mx-auto">
          <SectionHeader tag="Common Questions" title="Asked &<br/><em>Answered</em>" />
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            {faqs.map((f, i) => (
              <div key={i} className="border-t border-gold/10 last:border-b last:border-gold/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-6 flex items-center justify-between text-left gap-5" data-hover>
                  <span className="text-base font-semibold text-offwhite">{f.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-gold text-xl leading-none shrink-0">+</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-slate-custom pb-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-10 min-h-[180px] bg-navy-light border-t border-gold/10 px-6 md:px-10">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <h2 className="text-[clamp(24px,3vw,42px)] font-bold italic text-offwhite tracking-tight">Ready to work with<br/><em className="text-gold not-italic">a different standard?</em></h2>
        </motion.div>
        <a href="/properties" className="inline-flex items-center justify-center px-9 py-4 bg-gold text-navy text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-gold-bright transition-colors">
          Begin the Conversation
        </a>
      </div>
    </div>
  );
}