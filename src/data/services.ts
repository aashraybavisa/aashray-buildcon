export type Service = {
  slug: string
  icon: string // lucide icon name (rendered via Icon component)
  title: string
  excerpt: string
  body: string
  titleGu: string
  excerptGu: string
  bodyGu: string
}

export const services: Service[] = [
  {
    slug: 'residential',
    icon: 'home',
    title: 'Residential Construction',
    excerpt: 'Custom homes, villas and apartments built to last, from foundation to finish.',
    body: 'End-to-end residential builds — bungalows, villas and multi-storey apartments. We handle structure, MEP, finishes and landscaping under one contract.',
    titleGu: 'રહેણાંક બાંધકામ',
    excerptGu: 'પાયાથી પૂર્ણતા સુધી ટકી રહે તેવા કસ્ટમ ઘર, વિલા અને એપાર્ટમેન્ટ.',
    bodyGu:
      'બંગલા, વિલા અને બહુમાળી એપાર્ટમેન્ટનું સંપૂર્ણ રહેણાંક બાંધકામ. એક કરાર હેઠળ માળખું, MEP, ફિનિશિંગ અને લેન્ડસ્કેપિંગ.',
  },
  {
    slug: 'commercial',
    icon: 'building-2',
    title: 'Commercial Construction',
    excerpt: 'Showrooms, offices, retail and industrial sheds delivered to spec and on schedule.',
    body: 'Commercial spaces engineered for footfall and function — showrooms, corporate offices, retail and RCC/steel industrial sheds.',
    titleGu: 'વ્યાવસાયિક બાંધકામ',
    excerptGu: 'શોરૂમ, ઓફિસ, રિટેલ અને ઔદ્યોગિક શેડ્સ સ્પેસિફિકેશન અને સમયસર પૂર્ણ.',
    bodyGu: 'શોરૂમ, કોર્પોરેટ ઓફિસ, રિટેલ અને RCC/સ્ટીલ ઔદ્યોગિક શેડ્સ માટે કાર્યક્ષમ વ્યાવસાયિક જગ્યાઓ.',
  },
  {
    slug: 'renovation',
    icon: 'hammer',
    title: 'Renovation & Remodeling',
    excerpt: 'Structural upgrades and full property makeovers that modernise any space.',
    body: 'Remodels, extensions and structural strengthening. We upgrade older properties to modern standards with minimal disruption.',
    titleGu: 'નવીનીકરણ અને રિમોડેલિંગ',
    excerptGu: 'કોઈપણ જગ્યાને આધુનિક બનાવતા માળખાકીય સુધારા અને સંપૂર્ણ પ્રોપર્ટી મેકઓવર.',
    bodyGu:
      'રિમોડેલિંગ, વિસ્તરણ અને માળખાકીય મજબૂતી. ઓછામાં ઓછા વિક્ષેપ સાથે જૂની પ્રોપર્ટીને આધુનિક ધોરણ સુધી સુધારીએ છીએ.',
  },
  {
    slug: 'interior-fit-out',
    icon: 'layout',
    title: 'Interior Fit-out',
    excerpt: 'Turnkey interiors for homes and workspaces, delivered ready to move in.',
    body: 'Turnkey interiors — false ceilings, joinery, flooring, lighting and furniture — coordinated to a single handover date.',
    titleGu: 'ઇન્ટિરિયર ફિટ-આઉટ',
    excerptGu: 'ઘર અને કાર્યસ્થળ માટે ટર્નકી ઇન્ટિરિયર્સ, રહેવા માટે સંપૂર્ણ તૈયાર.',
    bodyGu:
      'ફોલ્સ સિલિંગ, જોઇનરી, ફ્લોરિંગ, લાઇટિંગ અને ફર્નિચર સહિત ટર્નકી ઇન્ટિરિયર્સ — એક જ હેન્ડઓવર તારીખે સંકલિત.',
  },
  {
    slug: 'project-management',
    icon: 'ruler',
    title: 'Project Management',
    excerpt: 'End-to-end management and cost consulting for your own build.',
    body: 'PMC and cost consulting for owner-driven projects — planning, tendering, quality control and billing oversight.',
    titleGu: 'પ્રોજેક્ટ મેનેજમેન્ટ',
    excerptGu: 'તમારા પોતાના બાંધકામ માટે સંપૂર્ણ મેનેજમેન્ટ અને ખર્ચ સલાહ.',
    bodyGu:
      'માલિક દ્વારા સંચાલિત પ્રોજેક્ટ્સ માટે PMC અને ખર્ચ સલાહ — આયોજન, ટેન્ડરિંગ, ગુણવત્તા નિયંત્રણ અને બિલિંગ દેખરેખ.',
  },
  {
    slug: 'maintenance',
    icon: 'wrench',
    title: 'Maintenance',
    excerpt: 'Ongoing upkeep and annual maintenance contracts to protect your asset.',
    body: 'Preventive and reactive maintenance, plus annual maintenance contracts for residential and commercial properties.',
    titleGu: 'જાળવણી',
    excerptGu: 'તમારી મિલકતનું રક્ષણ કરવા સતત જાળવણી અને વાર્ષિક જાળવણી કરાર.',
    bodyGu: 'રહેણાંક અને વ્યાવસાયિક પ્રોપર્ટી માટે નિવારક અને તાત્કાલિક જાળવણી, તેમજ વાર્ષિક જાળવણી કરાર.',
  },
]

export const serviceCategories = ['All', 'Residential', 'Commercial', 'Renovation'] as const
