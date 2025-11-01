import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Rooftop } from './pages/Rooftop';
import { Amusement } from './pages/Amusement';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rooftop" element={<Rooftop />} />
        <Route path="/amusement" element={<Amusement />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


