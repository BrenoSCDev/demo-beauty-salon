import { LanguageProvider } from './contexts/LanguageContext';
import LanguagePicker from './components/LanguagePicker';
import Hero from './components/Hero';
import Services from './components/Services';
import MoodBoard from './components/MoodBoard';
import About from './components/About';
import Testimonials from './components/Testimonials';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <LanguagePicker />
      <Hero />
      <Services />
      <MoodBoard />
      <About />
      <Testimonials />
      <AppointmentForm />
      <Footer />
    </LanguageProvider>
  );
}
