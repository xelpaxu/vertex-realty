import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail'; // 1. Import your new page

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy text-offwhite font-sans">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/properties" element={<Properties />} />
            
            <Route path="/properties/:id" element={<PropertyDetail />} />
            
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}