import Hero from '../components/Hero'
import CertMarquee from '../components/CertMarquee'
import ProblemSection from '../components/ProblemSection'
import BenefitsSection from '../components/BenefitsSection'
import MetricsStrip from '../components/MetricsStrip'
import ComplianceSection from '../components/ComplianceSection'
import HowItWorks from '../components/HowItWorks'
import SectorTabs from '../components/SectorTabs'
import CaseStudies from '../components/CaseStudies'
import AchievementsMap from '../components/AchievementsMap'
import Partners from '../components/Partners'
import FinalCTA from '../components/FinalCTA'
import { useHashScroll } from '../hooks/useHashScroll'

export default function HomePage() {
  useHashScroll()

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
      <AchievementsMap />
      <Partners />
      <FinalCTA />
    </>
  )
}
