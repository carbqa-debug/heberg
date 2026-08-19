import CertMarquee from '../components/CertMarquee'
import FinalCTA from '../components/FinalCTA'
import { useInView } from '../hooks/useInView'
import { useOdometer } from '../hooks/useOdometer'
import { useHashScroll } from '../hooks/useHashScroll'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useState } from 'react'
import { IconFactory, IconGlobe, IconChart } from '../components/icons'
import { QatarFlag } from '../components/Flags'
import { useLang } from '../i18n/LanguageContext'

const BOARD = [
  {
    initials: 'IH',
    color: 'var(--color-qatar)',
    en: {
      name: 'Ms. Ekram Fahad Alhosni',
      role: 'Co-founder & Chairman of the Board',
      messageTitle: "Chairman's Message",
      bismillah: 'In the name of God, the Most Gracious, the Most Merciful.',
      paragraphs: [
        'Praise be to God, who entrusted humankind with stewardship of the Earth and made its development and careful protection a responsibility and a trust; and may peace and blessings be upon our Prophet Muhammad.',
        'Guided by these enduring values, and in the conviction that protecting the environment, conserving resources, and achieving sustainable development are a shared responsibility toward present and future generations, our vision at PhotoCarb is to contribute to building a future that is more sustainable, innovative, and resilient.',
        'Amid accelerating global transformations and mounting environmental and climate challenges, innovation and sustainability have become essential to shaping the future of economies and societies — two central pillars for building a world that is more prosperous and better able to meet the challenges ahead.',
        'From this standpoint, PhotoCarb was founded to be part of a new generation of institutions striving to develop innovative solutions and initiatives that support the transition toward a low-emission, more sustainable future — by harnessing knowledge and modern technologies, strengthening research and development, and building effective partnerships that create real and lasting impact.',
        'At PhotoCarb, we do not regard sustainability merely as a corporate obligation, but as a shared responsibility and an opportunity to reshape the relationship between economic growth, technological progress, and the preservation of resources and the environment. On this basis, we are building an integrated ecosystem that brings together innovation, research, development, talent empowerment, and closer collaboration across sectors and stakeholders.',
        'We also believe that the great challenges facing the world today call for meaningful partnerships and long-term vision — grounded in the exchange of expertise, complementary roles, and joint action to achieve an impact that reaches beyond institutions to communities and future generations.',
        'Our ambition at PhotoCarb is to be an active contributor in supporting regional and international efforts in sustainability, climate action, and carbon management, and to continue developing initiatives and solutions that help build a future that is more sustainable, resilient, and innovative.',
        'As we move forward on this journey, we renew our commitment to our values of responsibility, excellence, innovation, and collaboration — in the belief that true impact is measured not only by what we achieve today, but by the lasting value and positive legacy we leave for generations to come.',
        'We ask God for success and guidance on this journey, and that He make our work and efforts a beneficial contribution in the service of people, the environment, and society.',
        'Please accept our sincere appreciation and respect.',
      ],
    },
    ar: {
      name: 'الأستاذة إكرام فهد الحوسني',
      role: 'الشريك المؤسس ورئيس مجلس الإدارة',
      messageTitle: 'كلمة رئيس مجلس الإدارة',
      bismillah: 'بسم الله الرحمن الرحيم',
      paragraphs: [
        'الحمد لله الذي استخلف الإنسان في الأرض وجعل عمارتها وحسن رعايتها مسؤوليةً وأمانة، والصلاة والسلام على سيدنا محمد صلى الله عليه وسلم.',
        'انطلاقًا من هذه القيم الراسخة، وإيمانًا بأن حماية البيئة والمحافظة على الموارد وتحقيق التنمية المستدامة تمثل مسؤولية مشتركة تجاه الأجيال الحاضرة والقادمة، تتجسد رؤيتنا في فوتوكارب (PhotoCarb) في الإسهام ببناء مستقبل أكثر استدامة وابتكارًا ومرونة.',
        'وفي ظل التحولات العالمية المتسارعة والتحديات البيئية والمناخية المتزايدة، أصبح الابتكار والاستدامة عنصرين أساسيين في صياغة مستقبل الاقتصادات والمجتمعات، وركيزتين رئيسيتين لبناء عالم أكثر ازدهارًا وقدرةً على مواجهة تحديات المستقبل.',
        'ومن هذا المنطلق، جاءت فوتوكارب لتكون جزءًا من الجيل الجديد من المؤسسات التي تسعى إلى تطوير حلول ومبادرات مبتكرة تدعم مسيرة التحول نحو مستقبل منخفض الانبعاثات وأكثر استدامة، من خلال توظيف المعرفة والتقنيات الحديثة، وتعزيز البحث والتطوير، وبناء الشراكات الفاعلة التي تصنع أثرًا حقيقيًا ومستدامًا.',
        'إننا في فوتوكارب لا ننظر إلى الاستدامة باعتبارها التزامًا مؤسسيًا فحسب، بل نراها مسؤولية مشتركة وفرصة لإعادة صياغة العلاقة بين النمو الاقتصادي، والتقدم التقني، والحفاظ على الموارد والبيئة. ومن هذا المنطلق، نعمل على بناء منظومة متكاملة تجمع بين الابتكار، والبحث، والتطوير، وتمكين الكفاءات، وتعزيز التعاون مع مختلف القطاعات والجهات ذات العلاقة.',
        'كما نؤمن بأن التحديات الكبرى التي يواجهها العالم اليوم تتطلب شراكات نوعية ورؤى طويلة المدى، تقوم على تبادل الخبرات، وتكامل الأدوار، والعمل المشترك من أجل تحقيق أثر يتجاوز حدود المؤسسات ليصل إلى المجتمعات والأجيال القادمة.',
        'ويتمثل طموحنا في فوتوكارب في أن نكون مساهمًا فاعلًا في دعم الجهود الإقليمية والدولية في مجالات الاستدامة والعمل المناخي وإدارة الكربون، وأن نواصل تطوير المبادرات والحلول التي تسهم في بناء مستقبل أكثر استدامة ومرونة وابتكارًا.',
        'وإذ نمضي قدمًا في هذه المسيرة، فإننا نجدد التزامنا بقيمنا المتمثلة في المسؤولية والتميز والابتكار والتعاون، إيمانًا منا بأن الأثر الحقيقي لا يُقاس بما نحققه اليوم فحسب، بل بما نتركه من قيمة مستدامة وإرث إيجابي للأجيال القادمة.',
        'نسأل الله تعالى التوفيق والسداد في هذه المسيرة، وأن يجعل أعمالنا وجهودنا إسهامًا نافعًا في خدمة الإنسان والبيئة والمجتمع.',
        'وتفضلوا بقبول خالص التقدير والاحترام.',
      ],
    },
  },
  {
    initials: 'IJ',
    color: 'var(--color-primary)',
    en: {
      name: 'Ms. Imtinen Jemaa',
      role: 'Co-founder & Vice Chairman of the Board',
      messageTitle: "Founder & CTO's Message",
      bismillah: 'In the name of God, the Most Gracious, the Most Merciful.',
      paragraphs: [
        'Praise be to God, Lord of the worlds, and may peace and blessings be upon our Prophet Muhammad.',
        'True innovation begins when challenges are turned into practical solutions. It was from this principle that PhotoCarb was born — with a vision to harness technology, artificial intelligence, and data to build advanced solutions in sustainability, carbon management, and climate action.',
        'As Founder and Chief Technology Officer, I believe technology is not merely a set of digital tools, but an engine for change and a means of creating impact. That is why we are building an integrated platform that unites carbon footprint management, sustainability reporting, life cycle assessment (LCA), MRV systems, and compliance mechanisms for international standards such as CBAM — within an intelligent environment powered by data analytics and artificial intelligence to support decision-makers.',
        'Our vision extends beyond software development to building a complete technology ecosystem that helps organizations accelerate their transition toward a low-emission economy, strengthen their competitiveness, and achieve their environmental goals with efficiency and transparency.',
        "PhotoCarb's journey has been rich with learning and achievement, and what we have accomplished to date is the fruit of a passionate team that believes innovation is a responsibility and that technology can create a positive and lasting impact. We continue to look to the future with even greater ambition — developing smarter solutions, expanding our partnerships, and strengthening our presence at both the regional and international levels.",
        'In closing, I extend my thanks to all our partners, our team, and everyone who believed in the PhotoCarb vision, and I look forward to continuing this journey toward a future led by knowledge, innovation, and sustainability.',
        'Peace be upon you, and the mercy and blessings of God.',
      ],
    },
    ar: {
      name: 'الأستاذة امتنان جماعة',
      role: 'الشريك المؤسس ونائبة مجلس الإدارة',
      messageTitle: 'كلمة نائبة مجلس الإدارة',
      bismillah: 'بسم الله الرحمن الرحيم',
      paragraphs: [
        'الحمد لله رب العالمين، والصلاة والسلام على سيدنا محمد صلى الله عليه وسلم.',
        'إن الابتكار الحقيقي يبدأ عندما تتحول التحديات إلى حلول عملية. ومن هذا المبدأ انطلقت فوتوكارب (PhotoCarb)، برؤية تهدف إلى تسخير التكنولوجيا والذكاء الاصطناعي والبيانات لبناء حلول متقدمة في مجالات الاستدامة، وإدارة الكربون، والعمل المناخي.',
        'بصفتي المؤسِّسة والرئيسة التنفيذية للتقنية، أؤمن بأن التكنولوجيا ليست مجرد أدوات رقمية، بل هي محرك للتغيير وصناعة الأثر. لذلك نعمل على تطوير منصة متكاملة تجمع بين إدارة البصمة الكربونية، وإعداد تقارير الاستدامة، وتقييم دورة الحياة (LCA)، وأنظمة MRV، وآليات الامتثال للمعايير الدولية مثل CBAM، ضمن بيئة ذكية تعتمد على تحليل البيانات والذكاء الاصطناعي لدعم متخذي القرار.',
        'ولا تقتصر رؤيتنا على تطوير البرمجيات، بل تمتد إلى بناء منظومة تقنية متكاملة تساعد المؤسسات على تسريع تحولها نحو اقتصاد منخفض الانبعاثات، وتعزيز قدرتها التنافسية، وتحقيق أهدافها البيئية بكفاءة وشفافية.',
        'لقد كانت رحلة فوتوكارب حافلة بالتعلم والإنجازات، وما تحقق حتى اليوم هو ثمرة شغف فريق يؤمن بأن الابتكار مسؤولية، وأن التكنولوجيا قادرة على إحداث أثر إيجابي ومستدام. وما زلنا ننظر إلى المستقبل بطموح أكبر، من خلال تطوير حلول أكثر ذكاءً، وتوسيع شراكاتنا، وتعزيز حضورنا على المستويين الإقليمي والدولي.',
        'وفي الختام، أتوجه بالشكر إلى جميع شركائنا وفريق عملنا وكل من آمن برؤية فوتوكارب، وأتطلع إلى مواصلة هذه المسيرة نحو مستقبل تقوده المعرفة والابتكار والاستدامة.',
        'والسلام عليكم ورحمة الله وبركاته.',
      ],
    },
  },
]

const CEO_MESSAGE = {
  initials: 'IH',
  color: 'var(--color-primary)',
  en: {
    name: 'Ms. Ekram Fahad Alhosni',
    role: 'Chief Executive Officer (CEO) & Co-Founder',
    bismillah: 'In the name of God, the Most Gracious, the Most Merciful.',
    lead: 'At PhotoCarb, technology is an effective tool to enable industrial and commercial organizations to achieve a sustainable environmental and economic impact.',
    paragraphs: [
      'Praise be to God, Lord of the worlds, and may peace and blessings be upon the noblest of prophets and messengers, our Prophet Muhammad, and upon all his family and companions.',
      'Today we live in a historic moment in which environmental and technological transformations are accelerating at an unprecedented pace, placing a greater responsibility on industrial and commercial organizations to adopt more sustainable and efficient practices. It is from here that our vision at PhotoCarb was born: that technology should be an effective tool to enable these organizations to achieve a sustainable environmental and economic impact.',
      'Our journey began from a firm belief that innovation and technology are capable of driving real change in the way sustainability is managed. That is why we are developing advanced digital solutions powered by artificial intelligence to help organizations measure and manage their carbon emissions, and make smarter, more effective decisions to achieve their sustainability goals with efficiency and reliability.',
      'At PhotoCarb, our ambition is not limited to providing technological solutions; we also seek to contribute to building a sustainable ecosystem that supports the transition toward an economy that is more efficient and more conscious of its environmental responsibility. We further aspire for PhotoCarb to be a leading Gulf model that reaches global markets, carrying a message of innovation and sustainability from our region to the world.',
      'We believe that true success is not measured by growth and expansion alone, but by the positive impact we create in communities, the economy, and the environment. From this standpoint, we continue to develop solutions that empower our clients and partners to contribute effectively to building a more sustainable future for generations to come.',
      'I extend my sincere thanks to our partners, our supporters, and our clients for their continued trust, and we look forward to continuing our journey toward a future that is smarter and more sustainable.',
    ],
  },
  ar: {
    name: 'الأستاذة إكرام فهد الحوسني',
    role: 'الرئيس التنفيذي والشريك المؤسس',
    bismillah: 'بسم الله الرحمن الرحيم',
    lead: 'في فوتوكارب، التكنولوجيا أداة فاعلة لتمكين الجهات والمنشآت الصناعية والتجارية من تحقيق أثر بيئي واقتصادي مستدام.',
    paragraphs: [
      'الحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين سيدنا محمد وعلى آله وصحبه أجمعين.',
      'نعيش اليوم في مرحلة تاريخية تتسارع فيها التحولات البيئية والتقنية بشكل غير مسبوق، مما يضع على عاتق الجهات والمنشآت الصناعية والتجارية مسؤولية أكبر نحو تبني ممارسات أكثر استدامة وكفاءة. ومن هنا جاءت رؤيتنا في فوتوكارب؛ بأن تكون التكنولوجيا أداة فاعلة لتمكين الجهات والمنشآت الصناعية والتجارية من تحقيق أثر بيئي واقتصادي مستدام.',
      'انطلقت رحلتنا من إيمان راسخ بأن الابتكار والتقنية قادران على إحداث تغيير حقيقي في الطريقة التي تُدار بها الاستدامة. ولذلك نعمل على تطوير حلول رقمية متقدمة تعتمد على الذكاء الاصطناعي لمساعدة الجهات والمنشآت الصناعية والتجارية على قياس وإدارة انبعاثاتها الكربونية، واتخاذ قرارات أكثر ذكاءً وفاعلية لتحقيق أهداف الاستدامة بكفاءة وموثوقية.',
      'في فوتوكارب، لا يقتصر طموحنا على تقديم حلول تقنية فحسب، بل نسعى إلى المساهمة في بناء منظومة مستدامة تدعم التحول نحو اقتصاد أكثر كفاءة ووعيًا بالمسؤولية البيئية. كما نطمح إلى أن تكون فوتوكارب نموذجًا خليجيًا رائدًا ينطلق إلى الأسواق العالمية، حاملًا رسالة الابتكار والاستدامة من منطقتنا إلى العالم.',
      'ونؤمن بأن النجاح الحقيقي لا يُقاس فقط بالنمو والتوسع، بل بالأثر الإيجابي الذي نُحدثه في المجتمعات والاقتصاد والبيئة. ومن هذا المنطلق، نواصل العمل على تطوير حلول تُمكّن عملاءنا وشركاءنا من المساهمة بفاعلية في بناء مستقبل أكثر استدامة للأجيال القادمة.',
      'أتقدم بخالص الشكر لشركائنا وداعمينا وعملائنا على ثقتهم المستمرة، ونتطلع إلى مواصلة مسيرتنا نحو مستقبل أكثر ذكاءً واستدامة.',
    ],
  },
}

const VALUES = [
  { num: '01', titleKey: 'about.val1.title', emphasisKey: 'about.val1.emphasis', descKey: 'about.val1.desc', color: 'var(--color-primary)' },
  { num: '02', titleKey: 'about.val2.title', emphasisKey: 'about.val2.emphasis', descKey: 'about.val2.desc', color: 'var(--color-lime)' },
  { num: '03', titleKey: 'about.val3.title', emphasisKey: 'about.val3.emphasis', descKey: 'about.val3.desc', color: 'var(--color-violet)' },
  { num: '04', titleKey: 'about.val4.title', emphasisKey: 'about.val4.emphasis', descKey: 'about.val4.desc', color: 'var(--color-primary)' },
]

const VISION_PILLARS = [
  { icon: IconFactory, titleKey: 'about.vision.p1.title', descKey: 'about.vision.p1.desc' },
  { icon: IconGlobe, titleKey: 'about.vision.p2.title', descKey: 'about.vision.p2.desc' },
  { icon: IconChart, titleKey: 'about.vision.p3.title', descKey: 'about.vision.p3.desc' },
]

export default function AboutPage() {
  useHashScroll()
  useDocumentMeta(
    'About Photocarb | Our Story, Mission & Leadership',
    'Founded by industrial engineers and AI researchers, Photocarb is headquartered in Doha, Qatar, with an engineering and R&D center in Sousse, Tunisia — building the next generation of ClimateTech for industry everywhere.',
  )

  return (
    <>
      <AboutHero />
      <CertMarquee />
      <OriginStory />
      <CEOMessageSection />
      <LeadershipSection />
      <ValuesSection />
      <Vision2030 />
      <FinalCTA />
    </>
  )
}

function AboutHero() {
  const { t } = useLang()
  return (
    <section id="about-top" className="pt-32 pb-20 bg-[var(--color-bg)] relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, color-mix(in srgb, var(--color-lime) 6%, transparent) 0%, transparent 55%)' }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[820px]">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-5 block" style={{ fontFamily: 'var(--font-body)' }}>
            — {t('about.heroEyebrow')}
          </span>
          <h1 className="text-[52px] lg:text-[68px] leading-[1.04] text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {t('about.heroTitle')}{' '}
            <em className="italic font-normal text-[var(--color-primary)]">{t('about.heroTitleAccent')}</em>
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--color-text-secondary)] max-w-[600px]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('about.heroSubtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

function OriginStory() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()
  const founded = useOdometer(2024, visible, 1400)
  const rd = useOdometer(2025, visible, 1600)
  const modules = useOdometer(7, visible, 1200)

  return (
    <section id="our-story" ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-[1.5fr_1fr] gap-14 items-start fade-up ${visible ? 'visible' : ''}`}>
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>{t('about.storyEyebrow')}</span>
            <h2 className="text-[38px] leading-tight text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {t('about.storyTitle')}{' '}
              <em className="italic font-normal text-[var(--color-text-secondary)]">{t('about.storyTitleAccent')}</em>
            </h2>
            <div className="space-y-5">
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p1')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p2')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p3')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p4')}</p>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5 lg:sticky lg:top-24">
            {[
              { n: founded, suffix: '', label: t('about.stat.founded') },
              { n: rd,      suffix: '', label: t('about.stat.rd') },
              { n: modules, suffix: '', label: t('about.stat.modules') },
            ].map(s => (
              <div key={s.label} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] text-center lg:text-start">
                <div className="text-[44px] font-bold leading-none text-[var(--color-primary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {s.n}{s.suffix}
                </div>
                <div className="text-[12px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CEOMessageSection() {
  const { ref, visible } = useInView(0.15)
  const [expanded, setExpanded] = useState(false)
  const { t, lang } = useLang()
  const m = { ...CEO_MESSAGE, ...CEO_MESSAGE[lang] }
  const closingLine = m.paragraphs[m.paragraphs.length - 1]

  return (
    <section
      id="ceo-message"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden py-20 scroll-mt-20"
      style={{ background: 'linear-gradient(165deg, var(--color-tint-teal), var(--color-bg) 55%)' }}
    >
      {/* Hex pattern motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg viewBox="0 0 1200 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 60 }).map((_, i) => {
            const col = i % 12
            const row = Math.floor(i / 12)
            const ox = col * 110 + (row % 2) * 55
            const oy = row * 94
            return (
              <polygon
                key={i}
                points={`${ox + 55},${oy} ${ox + 110},${oy + 31} ${ox + 110},${oy + 79} ${ox + 55},${oy + 110} ${ox},${oy + 79} ${ox},${oy + 31}`}
                fill="none" stroke="var(--color-primary)" strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 relative">
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>
            — {t('about.ceoMessage')}
          </span>
          <blockquote
            className="text-[28px] lg:text-[36px] leading-[1.25] text-[var(--color-text-primary)] max-w-[880px] mx-auto"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            <span className="not-italic" style={{ color: m.color }}>“</span>
            <em className="italic font-normal">{m.lead}</em>
            <span className="not-italic" style={{ color: m.color }}>”</span>
          </blockquote>
        </div>

        {/* Signature card */}
        <div className={`flex items-center justify-center gap-4 mb-10 fade-up ${visible ? 'visible' : ''} stagger-2`}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
            style={{ background: m.color, fontFamily: 'var(--font-body)' }}
          >
            {m.initials}
          </div>
          <div className="text-start">
            <div className="text-[18px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{m.name}</div>
            <div className="text-[13px] font-medium" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>{m.role}</div>
          </div>
        </div>

        {/* Full message */}
        <div className={`max-w-[780px] mx-auto fade-up ${visible ? 'visible' : ''} stagger-3`}>
          <p className="text-[13px] italic mb-5 text-center tracking-wide" style={{ color: m.color, fontFamily: 'var(--font-display)' }}>
            {m.bismillah}
          </p>
          <div className="space-y-4">
            {(expanded ? m.paragraphs : m.paragraphs.slice(0, 2)).map((p, i) => (
              <p
                key={i}
                className={`text-[15px] leading-relaxed ${p === closingLine ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold px-5 py-2.5 rounded-full border transition-colors"
              style={{ color: m.color, borderColor: `color-mix(in srgb, ${m.color} 35%, transparent)`, fontFamily: 'var(--font-body)' }}
            >
              {expanded ? t('common.showLess') : t('common.readFullMessage')}
              <svg
                width="13" height="13" viewBox="0 0 12 12" fill="none"
                className="transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function LeadershipSection() {
  const { ref, visible } = useInView(0.1)
  const { t } = useLang()

  return (
    <section id="board-of-directors" ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-14 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>{t('about.board')}</span>
          <h2 className="text-[40px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('about.boardTitle')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('about.boardTitleAccent')}</em>
          </h2>
        </div>

        <div className="space-y-8">
          {BOARD.map((member, i) => (
            <LeadershipMessage key={i} member={member} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LeadershipMessage({ member, visible, index }: { member: typeof BOARD[0]; visible: boolean; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const { t, lang } = useLang()
  const m = { ...member, ...member[lang] }
  const preview = m.paragraphs.slice(0, 2)
  const rest = m.paragraphs.slice(2)
  const closingLine = m.paragraphs[m.paragraphs.length - 1]

  return (
    <div
      className={`fade-up ${visible ? 'visible' : ''} stagger-${index + 1} relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]`}
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: m.color }} />

      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* Identity panel */}
        <div
          className="p-8 lg:p-10 flex flex-col items-center lg:items-start text-center lg:text-start lg:border-e border-[var(--color-border)]"
          style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${m.color} 10%, transparent), var(--color-surface) 70%)` }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-5"
            style={{ background: m.color, fontFamily: 'var(--font-body)' }}
          >
            {m.initials}
          </div>
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ color: m.color, background: `color-mix(in srgb, ${m.color} 12%, transparent)`, fontFamily: 'var(--font-body)' }}
          >
            {m.messageTitle}
          </span>
          <h3 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>{m.name}</h3>
          <p className="text-[12.5px] font-medium leading-snug" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>{m.role}</p>
        </div>

        {/* Message body */}
        <div className="p-8 lg:p-10 relative">
          <span
            className="absolute top-6 end-8 text-[80px] leading-none opacity-[0.08] pointer-events-none select-none"
            style={{ color: m.color, fontFamily: 'var(--font-display)' }}
          >
            "
          </span>

          <p
            className="text-[13px] italic mb-5 tracking-wide"
            style={{ color: m.color, fontFamily: 'var(--font-display)' }}
          >
            {m.bismillah}
          </p>

          <div className="space-y-4">
            {preview.map((p, pi) => (
              <p key={pi} className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{p}</p>
            ))}
          </div>

          {expanded && (
            <div className="space-y-4 mt-4" style={{ animation: 'fade-up 0.3s ease both' }}>
              {rest.map((p, pi) => (
                <p
                  key={pi}
                  className={`text-[15px] leading-relaxed ${p === closingLine ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: m.color, fontFamily: 'var(--font-body)' }}
            >
              {expanded ? t('common.showLess') : t('common.readFullMessage')}
              <svg
                width="13" height="13" viewBox="0 0 12 12" fill="none"
                className="transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ValuesSection() {
  const { ref, visible } = useInView(0.1)
  const { t } = useLang()
  return (
    <section id="our-values" ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-8 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20">
        <div className={`text-center mb-6 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>{t('about.valuesEyebrow')}</span>
          <h2 className="text-[40px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('about.valuesTitle')}
          </h2>
        </div>
      </div>
      {VALUES.map((v, i) => (
        <ValueBlock key={v.num} value={v} flip={i % 2 === 1} visible={visible} delay={i * 0.1} />
      ))}
    </section>
  )
}

function ValueBlock({ value: v, flip, visible, delay }: { value: typeof VALUES[0]; flip: boolean; visible: boolean; delay: number }) {
  const { t } = useLang()
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${flip ? '' : ''}`}>
        <div className={`relative ${flip ? 'lg:order-2' : ''} fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
          <div className="absolute -top-6 -left-4 text-[160px] font-bold leading-none pointer-events-none select-none gradient-numeral opacity-[0.07]" style={{ fontFamily: 'var(--font-display)' }}>
            {v.num}
          </div>
          <div className="relative">
            <h3 className="text-[38px] font-bold leading-tight text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {t(v.titleKey)}{' '}
              <em className="italic font-normal" style={{ color: v.color }}>{t(v.emphasisKey)}</em>
            </h3>
            <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t(v.descKey)}</p>
          </div>
        </div>
        <div className={`${flip ? 'lg:order-1' : ''} fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay + 0.15}s` }}>
          <div
            className="h-48 rounded-3xl flex items-center justify-center"
            style={{ background: `color-mix(in srgb, ${v.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${v.color} 22%, transparent)` }}
          >
            <span className="text-8xl opacity-20">{v.num}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Vision2030() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()
  const tonnes = useOdometer(11, visible, 1800)

  return (
    <section
      id="vision-2030"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 relative overflow-hidden scroll-mt-20"
      style={{ background: 'linear-gradient(160deg, var(--color-qatar-tint), var(--color-bg-secondary) 60%)' }}
    >
      {/* Hex background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 32 }).map((_, i) => {
            const col = i % 8
            const row = Math.floor(i / 8)
            const ox = col * 100 + (row % 2) * 50
            const oy = row * 86
            return (
              <polygon
                key={i}
                points={`${ox+50},${oy} ${ox+100},${oy+28} ${ox+100},${oy+72} ${ox+50},${oy+100} ${ox},${oy+72} ${ox},${oy+28}`}
                fill="none" stroke="var(--color-qatar)" strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className={`text-center mb-14 fade-up ${visible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <QatarFlag width={22} height={16} />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--color-qatar)', fontFamily: 'var(--font-body)' }}>
              {t('about.vision.eyebrow')}
            </span>
            <span className="qatar-rule" />
          </div>
          <h2 className="text-[44px] text-[var(--color-text-primary)] leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            <span className="text-[var(--color-primary)]">{tonnes} {t('about.vision.unit')}</span>{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('about.vision.by')}</em>
          </h2>
          <p className="text-[16px] text-[var(--color-text-secondary)] max-w-[580px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {t('about.vision.desc')}
          </p>
        </div>

        <div className={`grid lg:grid-cols-3 gap-5 fade-up ${visible ? 'visible' : ''} stagger-2`}>
          {VISION_PILLARS.map(p => (
            <div key={p.titleKey} className="card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--color-tint-teal)', color: 'var(--color-primary)' }}>
                <p.icon size={22} strokeWidth={1.6} />
              </div>
              <h3 className="text-[18px] font-semibold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>{t(p.titleKey)}</h3>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{t(p.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
