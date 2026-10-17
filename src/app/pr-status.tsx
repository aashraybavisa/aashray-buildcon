import { Clock3 } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { SiteFooter } from '@/components/site-footer'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

export default function PRStatusScreen() {
  const theme = useTheme()
  const { copy } = useLanguage()
  const content = copy.prStatus
  const bodyStyle = { color: theme.colors.textMuted, fontFamily: theme.fonts.body }

  return (
    <>
      <Seo title={content.title} description={content.description} noIndex />
      <ScrollView style={{ backgroundColor: theme.colors.surfacePage }} contentContainerStyle={styles.page}>
        <View style={styles.container}>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.heading} />
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.surfaceCard, borderColor: theme.colors.border },
            ]}
          >
            <Text style={[bodyStyle, styles.label]}>{content.statusLabel}</Text>
            <View style={[styles.status, { backgroundColor: theme.colors.accentSoft }]}>
              <Clock3 size={18} color={theme.colors.accentPress} />
              <Text style={{ color: theme.colors.accentPress, fontFamily: theme.fonts.bodySemibold }}>
                {content.status}
              </Text>
            </View>
          </View>
          <View style={[styles.timeline, { backgroundColor: theme.colors.surfaceRaised }]}>
            <Text
              style={[
                styles.timelineTitle,
                { color: theme.colors.textStrong, fontFamily: theme.fonts.displaySemibold },
              ]}
            >
              {content.updatesTitle}
            </Text>
            {content.updates.map((update, index) => (
              <View key={update.date} style={[styles.update, { borderTopColor: theme.colors.border }]}>
                <Text style={{ color: theme.colors.accentPress, fontFamily: theme.fonts.bodySemibold }}>
                  {index + 1}.
                </Text>
                <View style={styles.updateContent}>
                  <Text style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.bodySemibold }}>
                    {update.date}
                  </Text>
                  <Text style={[bodyStyle, styles.description]}>{update.detail}</Text>
                </View>
              </View>
            ))}
            <Text style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.bodySemibold }}>
              {content.points}
            </Text>
            <Text style={[bodyStyle, styles.label]}>{content.lastUpdated}</Text>
          </View>
        </View>
        <SiteFooter />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, paddingBottom: 62 },
  container: {
    alignSelf: 'center',
    gap: 32,
    maxWidth: 1000,
    paddingHorizontal: 24,
    paddingVertical: 64,
    width: '100%',
  },
  card: { borderRadius: 16, borderWidth: 1, gap: 16, padding: 24 },
  label: { fontSize: 14, lineHeight: 22 },
  status: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 12,
  },
  update: {
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 16,
    paddingTop: 20,
  },
  updateContent: { flex: 1, gap: 8 },
  timeline: { borderRadius: 16, gap: 24, padding: 24 },
  timelineTitle: { fontSize: 22 },
  description: { fontSize: 16, lineHeight: 25 },
})
