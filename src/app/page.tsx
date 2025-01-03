import Header from '@/components/landingPage/header'
import Hero from '@/components/landingPage/hero'
import Benefits from '@/components/landingPage/benefits'
import Feature from '@/components/landingPage/features'
import Footer from '@/components/landingPage/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <Hero />
      <Benefits />
      <Feature />
      <Footer />
    </div>
  )
}

