import { CheckCircle2, ShieldCheck } from 'lucide-react-native'
import { router, type Href } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { CTABand } from '@/components/cta-band'
import { PhotoPlaceholder } from '@/components/photo-placeholder'
import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { SiteFooter } from '@/components/site-footer'
import { StatCard } from '@/components/stat-card'
import { company, stats } from '@/data/company'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

export default function AboutScreen() {
  const theme = useTheme()
  const { copy, language } = useLanguage()
  return (
    <>
      <Seo title={copy.about.seoTitle} description={copy.about.seoDescription} />
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.surfacePage, paddingBottom: 62 }}>
        <View style={[styles.hero, { backgroundColor: theme.colors.bandBg }]}>
          <View style={styles.container}>
            <SectionHeading
              invert
              eyebrow={copy.about.eyebrow}
              title={copy.about.title}
              lead={copy.about.heroLead
                .replace('{since}', String(company.since))
                .replace('{region}', company.region)}
            />
          </View>
        </View>
        <View style={[styles.stats, { backgroundColor: theme.colors.bandDeep }]}>
          <View style={[styles.container, styles.statsGrid]}>
            {stats.map(({ labelGu, ...stat }) => (
              <StatCard invert key={stat.label} {...stat} label={language === 'gu' ? labelGu : stat.label} />
            ))}
          </View>
        </View>
        <View style={[styles.section, styles.container]}>
          <View style={styles.story}>
            <View style={styles.storyCopy}>
              <SectionHeading
                eyebrow={copy.about.approachEyebrow}
                title={copy.about.approachTitle}
                lead={copy.about.approachLead}
              />
              <Text
                style={{
                  color: theme.colors.textBody,
                  fontFamily: theme.fonts.body,
                  fontSize: 16,
                  lineHeight: 25,
                }}
              >
                {copy.about.story}
              </Text>
            </View>
            <PhotoPlaceholder label={copy.about.photo} style={styles.photo} />
          </View>
        </View>
        <View style={[styles.raised, { backgroundColor: theme.colors.surfaceRaised }]}>
          <View style={[styles.section, styles.container]}>
            <SectionHeading eyebrow={copy.about.valuesEyebrow} title={copy.about.valuesTitle} />
            <View style={styles.values}>
              {copy.about.values.map((value) => (
                <View
                  key={value.title}
                  style={[
                    styles.value,
                    { backgroundColor: theme.colors.surfaceCard, borderColor: theme.colors.border },
                  ]}
                >
                  <ShieldCheck color={theme.colors.accentPress} size={26} />
                  <Text
                    style={{
                      color: theme.colors.textStrong,
                      fontFamily: theme.fonts.displayBold,
                      fontSize: 20,
                    }}
                  >
                    {value.title}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textMuted,
                      fontFamily: theme.fonts.body,
                      fontSize: 16,
                      lineHeight: 24,
                    }}
                  >
                    {value.body}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={[styles.section, styles.container]}>
          <View style={styles.assurance}>
            <CheckCircle2 color={theme.colors.success} size={23} />
            <Text
              style={{
                color: theme.colors.textBody,
                flex: 1,
                fontFamily: theme.fonts.bodyMedium,
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              {copy.about.assurance}
            </Text>
          </View>
          <CTABand
            title={copy.about.ctaTitle}
            lead={copy.about.ctaLead}
            onAction={() => router.push('/quote' as Href)}
          />
        </View>
        <SiteFooter />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { alignSelf: 'center', maxWidth: 1200, paddingHorizontal: 24, width: '100%' },
  hero: { paddingVertical: 80 },
  stats: { paddingVertical: 34 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 28, justifyContent: 'space-between' },
  section: { gap: 36, paddingVertical: 72 },
  story: { flexDirection: 'row', flexWrap: 'wrap', gap: 40 },
  storyCopy: { flex: 1, gap: 24, minWidth: 280 },
  photo: { flex: 1, minHeight: 320, minWidth: 280 },
  raised: {},
  values: { flexDirection: 'row', flexWrap: 'wrap', margin: -6 },
  value: { borderRadius: 16, borderWidth: 1, flex: 1, gap: 14, margin: 6, minWidth: 240, padding: 24 },
  assurance: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, maxWidth: 680 },
})
