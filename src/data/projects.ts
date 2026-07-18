export type ProjectCategory = 'Residential' | 'Commercial' | 'Renovation';

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  scope: string;
  result: string;
};

export const projects: Project[] = [
  { slug: 'kalavad-road-villa', title: 'Kalavad Road Villa', category: 'Residential', location: 'Rajkot', year: 2024, scope: '5BHK luxury villa, 6,200 sq-ft', result: 'Delivered in 14 months, snag-free handover.' },
  { slug: 'crystal-mall-fit-out', title: 'Crystal Mall Fit-out', category: 'Commercial', location: 'Rajkot', year: 2023, scope: 'Retail fit-out across 3 floors', result: 'Opened two weeks ahead of schedule.' },
  { slug: 'heritage-bungalow', title: 'Heritage Bungalow', category: 'Renovation', location: 'Jamnagar', year: 2023, scope: 'Structural restoration + modern interiors', result: 'Preserved facade, fully modernised interior.' },
  { slug: 'skyline-residency', title: 'Skyline Residency', category: 'Residential', location: 'Rajkot', year: 2024, scope: '48-unit apartment complex', result: 'RERA-compliant, delivered on budget.' },
  { slug: 'aditya-corporate-park', title: 'Aditya Corporate Park', category: 'Commercial', location: 'Morbi', year: 2022, scope: '40,000 sq-ft corporate office', result: 'LEED-aligned MEP, zero lost-time incidents.' },
  { slug: 'riverside-farmhouse', title: 'Riverside Farmhouse', category: 'Renovation', location: 'Gondal', year: 2022, scope: 'Farmhouse remodel + landscaping', result: 'Full makeover completed in 8 months.' },
];

export const featuredProjects = projects.slice(0, 3);
