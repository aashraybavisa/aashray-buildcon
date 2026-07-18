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
import { useTheme } from '@/theme/theme'

const values = [
  {
    title: 'Clear commitments',
    body: 'Detailed scopes, real schedules, and early answers when conditions change.',
  },
  {
    title: 'Care for the site',
    body: 'Safety-first teams who keep the site organised and respect the people around it.',
  },
  {
    title: 'Quality that lasts',
    body: 'Thoughtful materials, verified workmanship, and a snag-free handover standard.',
  },
]

export default function AboutScreen() {
  const theme = useTheme()
  return (
    <>
      <Seo
        title="About"
        description="Learn about Aashray Buildcon’s approach to dependable, safety-first construction in Rajkot and Saurashtra."
      />
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.surfacePage, paddingBottom: 62 }}>
        <View style={[styles.hero, { backgroundColor: theme.colors.bandBg }]}>
          <View style={styles.container}>
            <SectionHeading
              invert
              eyebrow="About Aashray Buildcon"
              title="Local builders with a long view."
              lead={`Since ${company.since}, we’ve helped families and businesses across ${company.region} turn ambitious plans into dependable places.`}
            />
          </View>
        </View>
        <View style={[styles.stats, { backgroundColor: theme.colors.bandDeep }]}>
          <View style={[styles.container, styles.statsGrid]}>
            {stats.map((stat) => (
              <StatCard invert key={stat.label} {...stat} />
            ))}
          </View>
        </View>
        <View style={[styles.section, styles.container]}>
          <View style={styles.story}>
            <View style={styles.storyCopy}>
              <SectionHeading
                eyebrow="Our approach"
                title="Build with confidence, not guesswork."
                lead="A successful project is more than a finished structure. It is a process clients can understand, trust, and feel proud to recommend."
              />
              <Text
                style={{
                  color: theme.colors.textBody,
                  fontFamily: theme.fonts.body,
                  fontSize: 16,
                  lineHeight: 25,
                }}
              >
                We coordinate the people, materials, approvals, and site work that make a project move. You
                get one accountable team, regular progress updates, and a clear line of communication from the
                first conversation to handover.
              </Text>
            </View>
            <PhotoPlaceholder label="Aashray Buildcon team" style={styles.photo} />
          </View>
        </View>
        <View style={[styles.raised, { backgroundColor: theme.colors.surfaceRaised }]}>
          <View style={[styles.section, styles.container]}>
            <SectionHeading eyebrow="What guides us" title="Standards you can see on site." />
            <View style={styles.values}>
              {values.map((value) => (
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
              Licensed teams, project documentation, and site-level safety checks are part of every
              engagement.
            </Text>
          </View>
          <CTABand
            title="Let’s build something that lasts."
            lead="Bring us your brief and we’ll help you move forward with clarity."
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
