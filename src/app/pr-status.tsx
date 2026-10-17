import { Clock3 } from 'lucide-react-native'
import Head from 'expo-router/head'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { useResponsive } from '@/hooks/use-responsive'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

export default function PRStatusScreen() {
  const theme = useTheme()
  const { isNarrow } = useResponsive()
  const { copy } = useLanguage()
  const content = copy.prStatus
  const bodyStyle = { color: theme.colors.textMuted, fontFamily: theme.fonts.body }

  return (
    <>
      <Head>
        <title>{content.eyebrow}</title>
        <meta name="description" content={content.description} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={content.eyebrow} />
        <meta property="og:description" content={content.description} />
        <meta property="og:type" content="website" />
      </Head>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.surfacePage, borderBottomColor: theme.colors.border },
        ]}
      >
        <View style={[styles.headerContent, { paddingVertical: isNarrow ? 28 : 48 }]}>
          <View style={[styles.pageHeading, { borderBottomColor: theme.colors.borderStrong }]}>
            <Text
              accessibilityRole="header"
              style={[
                styles.personalHeading,
                {
                  color: theme.colors.accentPress,
                  fontFamily: theme.fonts.displaySemibold,
                  fontSize: isNarrow ? 24 : 30,
                  lineHeight: isNarrow ? 32 : 40,
                },
              ]}
            >
              {content.eyebrow}
            </Text>
          </View>
          <View style={styles.summary}>
            <Text
              accessibilityRole="header"
              style={[styles.title, { color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold }]}
            >
              {content.title}
            </Text>
            <View style={[styles.status, { backgroundColor: theme.colors.successSoft }]}>
              <Clock3 size={18} color={theme.colors.success} />
              <Text style={{ color: theme.colors.success, fontFamily: theme.fonts.bodySemibold }}>
                {content.status}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: theme.colors.textStrong,
              fontFamily: theme.fonts.bodySemibold,
              fontSize: isNarrow ? 20 : 22,
              lineHeight: isNarrow ? 30 : 34,
            }}
          >
            {`${content.heading} | ${content.points}`}
          </Text>
          <Text style={[bodyStyle, styles.label]}>{content.lastUpdated}</Text>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: theme.colors.surfacePage }} contentContainerStyle={styles.page}>
        <View style={[styles.container, { paddingVertical: isNarrow ? 24 : 40 }]}>
          <View
            style={[
              styles.timeline,
              { backgroundColor: theme.colors.surfaceRaised, padding: isNarrow ? 24 : 32 },
            ]}
          >
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
                <Text
                  style={[
                    styles.updateNumber,
                    { color: theme.colors.accentPress, fontFamily: theme.fonts.bodySemibold },
                  ]}
                >
                  {index + 1}.
                </Text>
                <View style={styles.updateContent}>
                  <Text
                    style={[
                      styles.date,
                      { color: theme.colors.textStrong, fontFamily: theme.fonts.bodySemibold },
                    ]}
                  >
                    {update.date}
                  </Text>
                  <Text style={[bodyStyle, styles.description]}>{update.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, paddingBottom: 32 },
  header: { borderBottomWidth: 1 },
  headerContent: { alignSelf: 'center', gap: 20, maxWidth: 960, paddingHorizontal: 24, width: '100%' },
  personalHeading: { letterSpacing: 0.3 },
  pageHeading: { borderBottomWidth: 1, paddingBottom: 24, marginBottom: 8 },
  summary: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', columnGap: 20, rowGap: 12 },
  title: { fontSize: 30, letterSpacing: -0.7, lineHeight: 37 },
  container: {
    alignSelf: 'center',
    gap: 32,
    maxWidth: 960,
    paddingHorizontal: 24,
    width: '100%',
  },
  label: { fontSize: 14, lineHeight: 22 },
  status: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  update: {
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 16,
    paddingTop: 24,
  },
  updateNumber: { minWidth: 20, fontSize: 16, lineHeight: 24 },
  date: { fontSize: 16, lineHeight: 24 },
  updateContent: { flex: 1, gap: 10 },
  timeline: { borderRadius: 16, gap: 24 },
  timelineTitle: { fontSize: 22, lineHeight: 30, marginBottom: 8 },
  description: { fontSize: 16, lineHeight: 25 },
})
