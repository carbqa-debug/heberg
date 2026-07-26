import Hero from '../components/Hero'
import CertMarquee from '../components/CertMarquee'
import ProblemSection from '../components/ProblemSection'
import BenefitsSection from '../components/BenefitsSection'
import MetricsStrip from '../components/MetricsStrip'
import ComplianceSection from '../components/ComplianceSection'
import HowItWorks from '../components/HowItWorks'
import SectorTabs from '../components/SectorTabs'
import CaseStudies from '../components/CaseStudies'
import Testimonial from '../components/Testimonial'
import FinalCTA from '../components/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CertMarquee />
      <ProblemSection />
      <BenefitsSection />
      <MetricsStrip />
      <ComplianceSection />
      <HowItWorks />
      <SectorTabs />
      <CaseStudies />
      <Testimonial />
      <FinalCTA />
    </>
  )
}
