export type Testimonial = {
  quote: string
  name: string
  role: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'They delivered our showroom two weeks early and spotless. Transparent quotes, weekly updates, zero surprises.',
    name: 'Rakesh Mehta',
    role: 'Owner, Mehta Motors',
    rating: 5,
  },
  {
    quote:
      'Our villa came out exactly like the 3D views. The team was professional and the site was always clean and safe.',
    name: 'Priya Shah',
    role: 'Homeowner, Kalavad Road',
    rating: 5,
  },
  {
    quote:
      'Fixed pricing meant no budget shocks. Handover was snag-free and the warranty support has been prompt.',
    name: 'Nikhil Patel',
    role: 'Director, Aditya Group',
    rating: 5,
  },
]
