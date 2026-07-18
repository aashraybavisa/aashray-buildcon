/** Company details. Placeholder values — replace with the client's real data. */
export const company = {
  name: 'Aashray Buildcon',
  city: 'Rajkot',
  region: 'Saurashtra, Gujarat',
  since: 2009,
  tagline: 'Construction & Contracting',
  addressLine: '150 Ft Ring Road, Rajkot',
  addressFull: '150 Ft Ring Road, Rajkot, Gujarat 360005',
  phone: '+91 98240 00000',
  phoneHref: 'tel:+919824000000',
  email: 'hello@aashraybuildcon.in',
  gst: '24XXXXXXXXXXX',
  hours: 'Mon–Sat · 9:30am – 7:00pm',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
  },
} as const

export const stats = [
  { value: '15', suffix: '+', label: 'Years building', labelGu: 'વર્ષોનો અનુભવ' },
  { value: '240', suffix: '+', label: 'Projects delivered', labelGu: 'પૂર્ણ પ્રોજેક્ટ્સ' },
  { value: '1.8M', suffix: ' sq-ft', label: 'Built area', labelGu: 'બાંધકામ વિસ્તાર' },
  { value: '98', suffix: '%', label: 'On-time handover', labelGu: 'સમયસર હેન્ડઓવર' },
] as const

export const processSteps = [
  {
    n: '1',
    title: 'Consult',
    desc: 'We visit the site, understand your brief and budget.',
    titleGu: 'સલાહ',
    descGu: 'અમે સાઇટની મુલાકાત લઈ તમારી જરૂરિયાત અને બજેટ સમજીએ છીએ.',
  },
  {
    n: '2',
    title: 'Design',
    desc: 'Drawings, 3D views and a fixed, itemised quote.',
    titleGu: 'ડિઝાઇન',
    descGu: 'ડ્રોઇંગ, 3D વ્યૂ અને નિશ્ચિત, વિગતવાર ક્વોટ.',
  },
  {
    n: '3',
    title: 'Build',
    desc: 'Certified teams, weekly updates, strict safety.',
    titleGu: 'બાંધકામ',
    descGu: 'પ્રમાણિત ટીમો, સાપ્તાહિક અપડેટ્સ અને કડક સલામતી.',
  },
  {
    n: '4',
    title: 'Handover',
    desc: 'Snag-free handover with warranty and support.',
    titleGu: 'હેન્ડઓવર',
    descGu: 'વોરંટી અને સપોર્ટ સાથે સરળ હેન્ડઓવર.',
  },
] as const
