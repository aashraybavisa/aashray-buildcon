import Head from 'expo-router/head'

import { company } from '@/data/company'

type SeoProps = {
  title: string
  description: string
  noIndex?: boolean
  structuredData?: boolean
}

/** Web-only search metadata statically rendered by Expo Router. */
export function Seo({ title, description, noIndex = false, structuredData = false }: SeoProps) {
  const fullTitle = `${title} | ${company.name}`
  const contractorSchema = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: company.name,
    description:
      'Residential, commercial, renovation, interior fit-out, and construction management in Rajkot.',
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.addressLine,
      addressLocality: company.city,
      addressRegion: 'Gujarat',
      postalCode: '360005',
      addressCountry: 'IN',
    },
    areaServed: [company.city, company.region],
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contractorSchema) }}
        />
      )}
    </Head>
  )
}
