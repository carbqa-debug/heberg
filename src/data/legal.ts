export interface LegalSection {
  heading: string
  body?: string[]
  bullets?: string[]
}

export interface LegalDoc {
  slug: string
  title: string
  summary: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const COMPANY = 'Photocarb Technologies LLC'
const HQ = 'West Bay Business District, Doha, State of Qatar'
const RD = 'Avenue Yasser Arafat, Sahloul, Sousse, Tunisia'

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'How Photocarb collects, uses, and protects personal and operational data.',
    updated: 'July 2026',
    intro: `${COMPANY} ("Photocarb", "we", "us", or "our") is committed to protecting the privacy and security of the information entrusted to us. This Privacy Policy explains what data we collect, why we collect it, how we use and safeguard it, and the rights available to you when you use our website, platform, and services (collectively, the "Services").`,
    sections: [
      {
        heading: '1. Who We Are',
        body: [
          `${COMPANY} is a climate-technology company incorporated in the State of Qatar (Commercial Registration No. 243466), with its headquarters at ${HQ} and its engineering and R&D centre at ${RD}. Photocarb acts as the data controller for personal data processed through its website, and as either a data controller or a data processor for information processed through its platform, depending on the context of the engagement.`,
        ],
      },
      {
        heading: '2. Information We Collect',
        body: ['We collect the following categories of information:'],
        bullets: [
          'Identity and contact data — name, job title, employer, business email address, and phone number provided through demo requests, contact forms, or account registration.',
          'Operational and emissions data — facility, sensor, energy, production, and supply-chain data submitted to the platform for carbon accounting, LCA, CBAM, MRV, and reporting purposes.',
          'Usage and technical data — IP address, browser type, device information, pages visited, and interactions with the platform, collected via cookies and similar technologies.',
          'Communications data — records of correspondence when you contact us for support, sales, or other enquiries.',
        ],
      },
      {
        heading: '3. How We Use Your Information',
        body: ['We use the information we collect to:'],
        bullets: [
          'Provide, operate, and maintain the Services, including carbon measurement, reporting, and compliance functionality.',
          'Respond to demo requests, enquiries, and support tickets.',
          'Generate the regulatory and sustainability reports you request.',
          'Improve, secure, and develop our platform and website.',
          'Comply with legal, regulatory, and contractual obligations.',
        ],
      },
      {
        heading: '4. Legal Basis for Processing',
        body: [
          'Where applicable law requires a legal basis for processing, we rely on one or more of the following: the performance of a contract with you or your organisation; your consent; our legitimate business interests; and compliance with a legal obligation. For individuals in the European Union, processing is carried out in accordance with the General Data Protection Regulation (GDPR); for individuals in Qatar, in accordance with Law No. 13 of 2016 on Personal Data Privacy Protection (PDPPL).',
        ],
      },
      {
        heading: '5. Data Sharing and Disclosure',
        body: [
          'We do not sell your personal data. We may share information with trusted sub-processors and service providers who support the delivery of our Services (such as hosting and infrastructure providers), with professional advisers, and with regulatory or governmental authorities where required by law. All sub-processors are bound by contractual obligations consistent with this Policy.',
        ],
      },
      {
        heading: '6. Data Residency and International Transfers',
        body: [
          'Photocarb prioritises Gulf-hosted, sovereign data infrastructure. Where data is transferred across borders — for example, between our Qatar and Tunisia operations — we implement appropriate safeguards, including contractual protections, to ensure your data remains protected to the standard described in this Policy.',
        ],
      },
      {
        heading: '7. Data Security',
        body: [
          'We maintain technical and organisational measures designed to protect information against unauthorised access, alteration, disclosure, or destruction. These include encryption in transit and at rest, access controls, and regular security reviews aligned with recognised international standards.',
        ],
      },
      {
        heading: '8. Data Retention',
        body: [
          'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Operational and emissions data is retained in accordance with the terms of the relevant service agreement.',
        ],
      },
      {
        heading: '9. Your Rights',
        body: ['Subject to applicable law, you may have the right to:'],
        bullets: [
          'Access the personal data we hold about you.',
          'Request correction of inaccurate or incomplete data.',
          'Request deletion of your data in certain circumstances.',
          'Object to or restrict certain processing.',
          'Request a copy of your data in a portable format.',
          'Withdraw consent where processing is based on consent.',
        ],
      },
      {
        heading: '10. Contact Us',
        body: [
          'For any questions about this Privacy Policy or to exercise your rights, please contact our privacy team at privacy@photocarb.qa.',
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    summary: 'The terms governing your use of the Photocarb website and platform.',
    updated: 'July 2026',
    intro: `These Terms of Service ("Terms") govern your access to and use of the website, platform, and services provided by ${COMPANY} ("Photocarb"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, you must not use the Services.`,
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: [
          'By accessing the Photocarb website or using the platform, you confirm that you have the authority to enter into these Terms on behalf of yourself or the organisation you represent, and that you accept these Terms in full.',
        ],
      },
      {
        heading: '2. The Services',
        body: [
          'Photocarb provides an AI-powered carbon intelligence platform for measuring, managing, and reporting greenhouse gas emissions, including carbon accounting, Life Cycle Assessment (LCA), ESG reporting, CBAM compliance, MRV, and supply-chain analytics. Specific features, scope, and service levels are defined in the applicable order form or service agreement between you and Photocarb.',
        ],
      },
      {
        heading: '3. Accounts and Access',
        body: [
          'Access to certain features requires an account. You are responsible for maintaining the confidentiality of your credentials and for all activity carried out under your account. You must notify Photocarb promptly of any unauthorised use.',
        ],
      },
      {
        heading: '4. Customer Data and Ownership',
        body: [
          'You retain all rights, title, and interest in the operational, emissions, and business data you submit to the platform ("Customer Data"). You grant Photocarb a limited licence to process Customer Data solely to provide and improve the Services. Photocarb retains all rights in the platform, software, models, and methodologies.',
        ],
      },
      {
        heading: '5. Acceptable Use',
        body: ['You agree not to:'],
        bullets: [
          'Use the Services in violation of any applicable law or regulation.',
          'Attempt to gain unauthorised access to the platform or its underlying systems.',
          'Reverse engineer, copy, or resell any part of the Services except as permitted by law.',
          'Upload malicious code or interfere with the integrity or performance of the Services.',
        ],
      },
      {
        heading: '6. Reports and Regulatory Reliance',
        body: [
          'Photocarb applies recognised methodologies and standards to generate reports and calculations. However, the outputs depend on the accuracy and completeness of the data you provide. You remain responsible for reviewing outputs and for your own regulatory filings and compliance obligations. Reports are provided as a decision-support tool and do not constitute legal, financial, or professional advice.',
        ],
      },
      {
        heading: '7. Fees and Payment',
        body: [
          'Fees, billing cycles, and payment terms are set out in the applicable order form or service agreement. Unless otherwise stated, fees are non-refundable and exclusive of applicable taxes.',
        ],
      },
      {
        heading: '8. Intellectual Property',
        body: [
          'All intellectual property rights in the platform, website, branding, and documentation are and remain the property of Photocarb or its licensors. Nothing in these Terms transfers any such rights to you.',
        ],
      },
      {
        heading: '9. Limitation of Liability',
        body: [
          'To the maximum extent permitted by law, Photocarb shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services. Photocarb\'s total aggregate liability shall not exceed the fees paid by you for the Services in the twelve months preceding the event giving rise to the claim.',
        ],
      },
      {
        heading: '10. Governing Law',
        body: [
          'These Terms are governed by the laws of the State of Qatar. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of Qatar, without prejudice to any mandatory consumer protections available to you.',
        ],
      },
      {
        heading: '11. Contact Us',
        body: [
          'For questions regarding these Terms, please contact legal@photocarb.qa.',
        ],
      },
    ],
  },
  {
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement',
    summary: 'How Photocarb processes personal data on behalf of its customers.',
    updated: 'July 2026',
    intro: `This Data Processing Agreement ("DPA") forms part of the service agreement between ${COMPANY} ("Photocarb", acting as data processor) and the customer ("Controller"). It governs the processing of personal data carried out by Photocarb on behalf of the Controller in connection with the Services.`,
    sections: [
      {
        heading: '1. Roles of the Parties',
        body: [
          'For personal data processed on behalf of the Controller, the Controller is the data controller and Photocarb is the data processor. Each party shall comply with its respective obligations under applicable data protection law, including the GDPR and Qatar\'s PDPPL where relevant.',
        ],
      },
      {
        heading: '2. Scope and Purpose of Processing',
        body: [
          'Photocarb processes personal data only for the purpose of providing the Services and strictly in accordance with the Controller\'s documented instructions, unless required otherwise by law. The subject matter, duration, nature, and purpose of processing are defined by the service agreement.',
        ],
      },
      {
        heading: '3. Categories of Data and Data Subjects',
        body: ['Processing under this DPA may involve:'],
        bullets: [
          'Data subjects: the Controller\'s employees, contractors, and authorised platform users.',
          'Categories of data: identity and contact details, account credentials, and usage records associated with platform access.',
        ],
      },
      {
        heading: '4. Confidentiality',
        body: [
          'Photocarb ensures that all personnel authorised to process personal data are bound by appropriate confidentiality obligations and are made aware of the confidential nature of the data.',
        ],
      },
      {
        heading: '5. Security Measures',
        body: [
          'Photocarb implements appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including encryption, access control, network security, logging, and regular testing of the effectiveness of these measures.',
        ],
      },
      {
        heading: '6. Sub-Processors',
        body: [
          'The Controller grants a general authorisation for Photocarb to engage sub-processors to support the delivery of the Services. Photocarb maintains a list of sub-processors, imposes data protection obligations on them consistent with this DPA, and remains responsible for their performance. Photocarb will inform the Controller of intended changes to sub-processors and provide an opportunity to object on reasonable grounds.',
        ],
      },
      {
        heading: '7. Assistance to the Controller',
        body: [
          'Taking into account the nature of processing, Photocarb assists the Controller by appropriate technical and organisational measures in fulfilling the Controller\'s obligations to respond to data-subject requests and to ensure compliance with security, breach-notification, and data-protection-impact-assessment obligations.',
        ],
      },
      {
        heading: '8. Personal Data Breach',
        body: [
          'Photocarb notifies the Controller without undue delay after becoming aware of a personal data breach affecting the Controller\'s data, and provides sufficient information to enable the Controller to meet any obligations to report the breach to the relevant supervisory authority and affected data subjects.',
        ],
      },
      {
        heading: '9. International Transfers',
        body: [
          'Where personal data is transferred across borders, Photocarb ensures that appropriate safeguards are in place, including contractual protections, so that the level of protection required by applicable law is maintained.',
        ],
      },
      {
        heading: '10. Return or Deletion of Data',
        body: [
          'Upon termination of the Services, Photocarb will, at the Controller\'s choice, return or securely delete the personal data processed on the Controller\'s behalf, unless retention is required by applicable law.',
        ],
      },
      {
        heading: '11. Contact Us',
        body: [
          'To request a signed copy of this DPA or Photocarb\'s current sub-processor list, please contact privacy@photocarb.qa.',
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    summary: 'How Photocarb uses cookies and similar technologies on its website.',
    updated: 'July 2026',
    intro: `This Cookie Policy explains how ${COMPANY} ("Photocarb") uses cookies and similar technologies when you visit our website. It should be read together with our Privacy Policy.`,
    sections: [
      {
        heading: '1. What Are Cookies',
        body: [
          'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to improve efficiency, and to provide information to site owners. Similar technologies include pixels, local storage, and software development kits.',
        ],
      },
      {
        heading: '2. Types of Cookies We Use',
        body: ['We use the following categories of cookies:'],
        bullets: [
          'Strictly necessary cookies — required for the website to function, such as security, network management, and accessibility. These cannot be switched off.',
          'Performance and analytics cookies — help us understand how visitors interact with the website so we can improve it. These are only set with your consent where required.',
          'Functionality cookies — remember your preferences, such as language, to provide an enhanced experience.',
        ],
      },
      {
        heading: '3. How We Use Cookies',
        body: [
          'We use cookies to operate and secure the website, to remember your preferences, to measure and analyse traffic, and to understand which content is most useful to our visitors. We do not use cookies to sell your personal information.',
        ],
      },
      {
        heading: '4. Managing Your Preferences',
        body: [
          'You can control and manage cookies through your browser settings, and you can delete cookies already stored on your device. Please note that disabling certain cookies may affect the functionality of the website. Where consent is required, you may withdraw it at any time.',
        ],
      },
      {
        heading: '5. Third-Party Cookies',
        body: [
          'Some cookies may be set by third-party services that appear on our pages. We do not control the placement of these cookies, and we recommend reviewing the relevant third parties\' own privacy and cookie policies.',
        ],
      },
      {
        heading: '6. Updates to This Policy',
        body: [
          'We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. The date at the top of this page indicates when it was last revised.',
        ],
      },
      {
        heading: '7. Contact Us',
        body: [
          'If you have questions about our use of cookies, please contact privacy@photocarb.qa.',
        ],
      },
    ],
  },
]

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find(d => d.slug === slug)
}
