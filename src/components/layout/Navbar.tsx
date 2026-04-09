import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../public/logo-high.png';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Properties', path: '/properties' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 md:px-10 border-b transition-colors duration-300 ${
          scrolled ? 'bg-navy/97' : 'bg-navy/80 backdrop-blur-xl'
        } border-gold/10`}
      >
        <Link to="/" className="flex items-center gap-2.5 text-offwhite font-bold text-[15px] tracking-wider">
          <div className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold italic font-bold text-sm">
            <img src={logo} alt="logo" />
          </div>
          <div>VERTEX<span className="block text-[9px] tracking-[0.45em] text-gold font-semibold">3 : 5 — 7</span></div>
        </Link>

        <div className="ml-auto hidden md:flex items-center gap-10">
          {links.map(l => (
            <Link key={l.path} to={l.path} className={`text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors ${location.pathname === l.path ? 'text-offwhite' : 'text-slate-custom hover:text-offwhite'}`}>
              {l.label}
            </Link>
          ))}
          <a 
            href="https://www.facebook.com/profile.php?id=100071329680525" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[0.22em] uppercase px-5 py-2.5 border border-gold/50 text-gold hover:bg-gold hover:text-navy transition-all inline-block"
          >
            Inquire
          </a>
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden text-offwhite ml-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-navy z-[200] flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-offwhite text-2xl">✕</button>
            {links.map(l => (
              <Link key={l.path} to={l.path} className={`text-3xl font-bold italic ${location.pathname === l.path ? 'text-gold' : 'text-offwhite'}`}>
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}