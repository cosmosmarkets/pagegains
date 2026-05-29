import Nav from './sections/Nav'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import SampleOutput from './sections/SampleOutput'
import Testimonials from './sections/Testimonials'
import Pricing from './sections/Pricing'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <SampleOutput />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
