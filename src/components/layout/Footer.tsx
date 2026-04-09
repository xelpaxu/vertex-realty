import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy-mid border-t border-gold/10 pt-16 pb-10 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div>
          <div className="text-2xl font-bold italic text-offwhite">Vertex <sub className="text-[9px] tracking-[0.35em] text-gold not-italic font-semibold uppercase">3:5—7</sub></div>
          <p className="text-slate-custom text-sm leading-relaxed mt-4 max-w-[220px]">Premier real estate advisory for discerning clients across Western Visayas.</p>
        </div>
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold text-offwhite mb-5">Navigate</h4>
          <ul className="flex flex-col gap-2.5 text-slate-custom text-sm">
            {[{l:'Home', p:'/'}, {l:'About', p:'/about'}, {l:'Properties', p:'/properties'}].map(n => (
              <li key={n.p}><Link to={n.p} className="hover:text-gold transition-colors">{n.l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold text-offwhite mb-5">Properties</h4>
          <ul className="flex flex-col gap-2.5 text-slate-custom text-sm">
            {['Kalea Heights', 'One Delta', 'Moncello Crest'].map(p => (
              <li key={p}><Link to="/properties" className="hover:text-gold transition-colors">{p}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold text-offwhite mb-5">Reach Us</h4>
          <div className="flex flex-col gap-3 text-slate-custom text-sm">
            <span className="flex gap-2.5 items-start"><svg className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>Iloilo City, Philippines</span>
            <span className="flex gap-2.5 items-start"><svg className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>vertex0357realty@gmail.com</span>
            <span className="flex gap-2.5 items-start"><svg className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72"/></svg>0917 884 8602</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-7 max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-custom/50">
        <span>© 2025 Vertex 3:5-7 Realty. All rights reserved.</span>
      </div>
    </footer>
  );
}