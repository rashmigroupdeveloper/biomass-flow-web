
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import About from './pages/About';
import Products from './pages/Products';
import Process from './pages/Process';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import BioPellets from './pages/BioPellets';
import ActivatedCarbon from './pages/ActivatedCarbon';
import CharcoalBriquettes from './pages/CharcoalBriquettes';
import Certificates from './pages/Certificates';
import QualityPolicy from './pages/QualityPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/bio-pellets" element={<BioPellets />} />
        <Route path="/products/activated-carbon" element={<ActivatedCarbon />} />
        <Route path="/products/charcoal-briquettes" element={<CharcoalBriquettes />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/quality-policy" element={<QualityPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
