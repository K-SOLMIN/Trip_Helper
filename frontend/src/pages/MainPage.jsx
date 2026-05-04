import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/main/HeroSection'
import FeaturesSection from '../components/main/FeaturesSection'
import StepsSection from '../components/main/StepsSection'
import ServicesSection from '../components/main/ServicesSection'
import CTASection from '../components/main/CTASection'
import Footer from '../components/main/Footer'
import MusicPlayer from '../components/main/MusicPlayer'
import '../styles/main-page.css'

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StepsSection />
      <ServicesSection />
      <CTASection />
      <Footer />
      <MusicPlayer />
    </div>
  )
}
