import { ArrowLeft, ArrowRight, Check } from 'lucide-react-native'
import { router, useLocalSearchParams, type Href } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { CTABand } from '@/components/cta-band'
import { PhotoPlaceholder } from '@/components/photo-placeholder'
import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { SiteFooter } from '@/components/site-footer'
import { services } from '@/data/services'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }))
}

export default function ServiceDetailScreen() {
  const theme = useTheme()
  const { copy, language } = useLanguage()
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const service = services.find((item) => item.slug === slug)

  if (!service) {
    return (
      <View style={[styles.notFound, { backgroundColor: theme.colors.surfacePage }]}>
        <Text style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold, fontSize: 26 }}>
          {copy.services.notFound}
        </Text>
        <Button onPress={() => router.replace('/services' as Href)}>{copy.services.backToServices}</Button>
      </View>
    )
  }

  return (
    <>
      <Seo
        title={language === 'gu' ? service.titleGu : service.title}
        description={language === 'gu' ? service.excerptGu : service.excerpt}
      />
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.surfacePage, paddingBottom: 62 }}>
        <View style={styles.container}>
          <Button
            size="sm"
            variant="ghost"
            onPress={() => router.back()}
            iconLeft={<ArrowLeft color={theme.colors.accentPress} size={17} />}
          >
            {copy.services.allServices}
          </Button>
          <View style={styles.hero}>
            <View style={styles.copy}>
              <SectionHeading
                eyebrow={copy.services.detailEyebrow}
                title={language === 'gu' ? service.titleGu : service.title}
                lead={language === 'gu' ? service.bodyGu : service.body}
              />
              <Button
                onPress={() => router.push('/quote' as Href)}
                iconRight={<ArrowRight color={theme.colors.textOnAccent} size={17} />}
              >
                {copy.common.quote}
              </Button>
            </View>
            <PhotoPlaceholder
              label={language === 'gu' ? service.titleGu : service.title}
              style={styles.photo}
            />
          </View>
          <View
            style={[
              styles.included,
              { backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border },
            ]}
          >
            <Text
              style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold, fontSize: 22 }}
            >
              {copy.services.includedTitle}
            </Text>
            {copy.services.inclusions.map((inclusion) => (
              <View key={inclusion} style={styles.inclusion}>
                <Check color={theme.colors.success} size={18} />
                <Text
                  style={{
                    color: theme.colors.textBody,
                    flex: 1,
                    fontFamily: theme.fonts.body,
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                >
                  {inclusion}
                </Text>
              </View>
            ))}
          </View>
          <CTABand
            title={copy.services.detailCtaTitle}
            lead={copy.services.detailCtaLead}
            onAction={() => router.push('/quote' as Href)}
          />
        </View>
        <SiteFooter />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: 42,
    maxWidth: 1200,
    paddingHorizontal: 24,
    paddingVertical: 48,
    width: '100%',
  },
  hero: { flexDirection: 'row', flexWrap: 'wrap', gap: 32 },
  copy: { flex: 1, gap: 28, minWidth: 280 },
  photo: { flex: 1, minHeight: 300, minWidth: 280 },
  included: { borderRadius: 16, borderWidth: 1, gap: 16, padding: 28 },
  inclusion: { alignItems: 'flex-start', flexDirection: 'row', gap: 10 },
  notFound: { alignItems: 'center', flex: 1, gap: 20, justifyContent: 'center', padding: 24 },
})
