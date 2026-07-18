export type Service = {
  slug: string;
  icon: string; // lucide icon name (rendered via Icon component)
  title: string;
  excerpt: string;
  body: string;
};

export const services: Service[] = [
  {
    slug: 'residential',
    icon: 'home',
    title: 'Residential Construction',
    excerpt: 'Custom homes, villas and apartments built to last, from foundation to finish.',
    body: 'End-to-end residential builds — bungalows, villas and multi-storey apartments. We handle structure, MEP, finishes and landscaping under one contract.',
  },
  {
    slug: 'commercial',
    icon: 'building-2',
    title: 'Commercial Construction',
    excerpt: 'Showrooms, offices, retail and industrial sheds delivered to spec and on schedule.',
    body: 'Commercial spaces engineered for footfall and function — showrooms, corporate offices, retail and RCC/steel industrial sheds.',
  },
  {
    slug: 'renovation',
    icon: 'hammer',
    title: 'Renovation & Remodeling',
    excerpt: 'Structural upgrades and full property makeovers that modernise any space.',
    body: 'Remodels, extensions and structural strengthening. We upgrade older properties to modern standards with minimal disruption.',
  },
  {
    slug: 'interior-fit-out',
    icon: 'layout',
    title: 'Interior Fit-out',
    excerpt: 'Turnkey interiors for homes and workspaces, delivered ready to move in.',
    body: 'Turnkey interiors — false ceilings, joinery, flooring, lighting and furniture — coordinated to a single handover date.',
  },
  {
    slug: 'project-management',
    icon: 'ruler',
    title: 'Project Management',
    excerpt: 'End-to-end management and cost consulting for your own build.',
    body: 'PMC and cost consulting for owner-driven projects — planning, tendering, quality control and billing oversight.',
  },
  {
    slug: 'maintenance',
    icon: 'wrench',
    title: 'Maintenance',
    excerpt: 'Ongoing upkeep and annual maintenance contracts to protect your asset.',
    body: 'Preventive and reactive maintenance, plus annual maintenance contracts for residential and commercial properties.',
  },
];

export const serviceCategories = ['All', 'Residential', 'Commercial', 'Renovation'] as const;
