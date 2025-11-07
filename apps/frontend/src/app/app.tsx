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
import { DanceLesson } from './pages/DanceLesson';
import { YachtSailing } from './pages/YachtSailing';
import { IceSkating } from './pages/IceSkating';
import { HorseRiding } from './pages/HorseRiding';
import { WeekendParis } from './pages/WeekendParis';
import { HotAirBalloon } from './pages/HotAirBalloon';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Favorites } from './pages/Favorites';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Profile } from './pages/Profile';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';

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
        <Route path="/dance-lesson" element={<DanceLesson />} />
        <Route path="/yacht-sailing" element={<YachtSailing />} />
        <Route path="/ice-skating" element={<IceSkating />} />
        <Route path="/horse-riding" element={<HorseRiding />} />
        <Route path="/weekend-paris" element={<WeekendParis />} />
        <Route path="/hot-air-balloon" element={<HotAirBalloon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


