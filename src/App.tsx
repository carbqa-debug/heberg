import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'))
const CompliancePage = lazy(() => import('./pages/CompliancePage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Minimal, layout-neutral placeholder shown only for the brief moment a
 * route chunk is downloading (near-instant on repeat visits / fast connections). */
function PageFallback() {
  return <div className="min-h-screen bg-[var(--color-bg)]" />
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
    </PageTransition>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"             element={<LazyPage><HomePage /></LazyPage>} />
        <Route path="/services"     element={<LazyPage><ServicesPage /></LazyPage>} />
        <Route path="/services/:slug" element={<LazyPage><ServiceDetailPage /></LazyPage>} />
        <Route path="/about"        element={<LazyPage><AboutPage /></LazyPage>} />
        <Route path="/technology"   element={<LazyPage><TechnologyPage /></LazyPage>} />
        <Route path="/compliance"   element={<LazyPage><CompliancePage /></LazyPage>} />
        <Route path="/case-studies" element={<LazyPage><CaseStudiesPage /></LazyPage>} />
        <Route path="/contact"      element={<LazyPage><ContactPage /></LazyPage>} />
        <Route path="/legal/:slug"  element={<LazyPage><LegalPage /></LazyPage>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Nav />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
