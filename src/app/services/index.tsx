import { ArrowRight } from 'lucide-react-native'
import { router, type Href } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Button } from '@/components/button'
import { CTABand } from '@/components/cta-band'
import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { ServiceCard } from '@/components/service-card'
import { SiteFooter } from '@/components/site-footer'
import { services } from '@/data/services'
import { useResponsive } from '@/hooks/use-responsive'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

export default function ServicesScreen() {
  const theme = useTheme()
  const { copy, language } = useLanguage()
  const { isDesktop, isNarrow } = useResponsive()
  const columns = isDesktop ? 3 : isNarrow ? 1 : 2

  return (
    <>
      <Seo title={copy.services.seoTitle} description={copy.services.seoDescription} />
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.colors.surfacePage, paddingBottom: 62 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.colors.surfaceRaised }]}>
          <View style={styles.container}>
            <SectionHeading
              eyebrow={copy.services.eyebrow}
              title={copy.services.title}
              lead={copy.services.lead}
            />
          </View>
        </View>
        <View style={[styles.section, styles.container]}>
          <View style={styles.grid}>
            {services.map(({ titleGu, excerptGu, bodyGu, ...service }) => (
              <View key={service.slug} style={{ padding: 6, width: `${100 / columns}%` }}>
                <ServiceCard
                  {...service}
                  title={language === 'gu' ? titleGu : service.title}
                  excerpt={language === 'gu' ? excerptGu : service.excerpt}
                  meta={copy.services.view}
                  onPress={() => router.push(`/services/${service.slug}` as Href)}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, styles.container]}>
          <CTABand
            title={copy.services.ctaTitle}
            lead={copy.services.ctaLead}
            onAction={() => router.push('/quote' as Href)}
          />
          <Button
            variant="ghost"
            onPress={() => router.push('/projects' as Href)}
            iconRight={<ArrowRight color={theme.colors.accentPress} size={17} />}
          >
            {copy.services.workLink}
          </Button>
        </View>
        <SiteFooter />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { alignSelf: 'center', maxWidth: 1200, paddingHorizontal: 24, width: '100%' },
  hero: { paddingVertical: 72 },
  section: { gap: 30, paddingVertical: 72 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
})
