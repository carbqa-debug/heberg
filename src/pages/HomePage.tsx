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
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function HomePage() {
  useHashScroll()
  useDocumentMeta(
    'Photocarb | AI-Powered Carbon Intelligence Platform',
    'Photocarb unifies CO₂ hardware sensing, carbon accounting, ESG reporting, and CBAM compliance in one platform — built for industrial and commercial operators anywhere in the world.',
  )

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
