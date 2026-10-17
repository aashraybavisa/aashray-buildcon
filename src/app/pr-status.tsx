import Head from 'expo-router/head'
import { Check, Clock3, FileText } from 'lucide-react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { ExternalLink } from '@/components/external-link'
import { PersonalPageLayout } from '@/components/personal-page-layout'

import { useResponsive } from '@/hooks/use-responsive'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

export default function PRStatusScreen() {
  const theme = useTheme()
  const { isNarrow } = useResponsive()
  const { copy } = useLanguage()
  const content = copy.prStatus
  const colors = theme.colors
  const dateAccent = colors.accentPress
  const isLight = theme.scheme === 'light'
  const heroBackground = isLight ? colors.surfaceCard : colors.bandDeep
  const heroBorder = isLight ? colors.border : colors.bandBorder
  const heroText = isLight ? colors.textStrong : colors.bandText
  const heroAccent = colors.accentPress
  const reviewText = isLight ? '#216E3B' : '#A4E8BE'
  const muted = { color: colors.textMuted, fontFamily: theme.fonts.body }

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

      <PersonalPageLayout
        name={content.eyebrow}
        action={
          <ExternalLink href="https://www.linkedin.com/in/aashray-bavisa/" asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Aashray Bavisa on LinkedIn"
              style={({ pressed }) => [
                styles.linkedinLink,
                { backgroundColor: pressed ? colors.accentSoft : 'transparent' },
              ]}
            >
              <Svg width={26} height={26} viewBox="0 0 24 24" aria-hidden={true}>
                <Rect width={24} height={24} rx={3} fill="#0A66C2" />
                <Circle cx={6} cy={6} r={1.7} fill="#FFFFFF" />
                <Rect x={4.5} y={9} width={3} height={10.5} fill="#FFFFFF" />
                <Path
                  d="M10 9h3v1.4c.7-1.1 1.7-1.7 3.1-1.7 2.7 0 3.9 1.7 3.9 4.7v6.1h-3v-5.7c0-1.6-.5-2.5-1.8-2.5s-2.2 1-2.2 2.5v5.7h-3Z"
                  fill="#FFFFFF"
                />
              </Svg>
            </Pressable>
          </ExternalLink>
        }
      >
        <View
          style={[
            styles.hero,
            theme.shadows.md,
            {
              backgroundColor: heroBackground,
              borderColor: heroBorder,
              padding: isNarrow ? 24 : 32,
            },
          ]}
        >
          <View pointerEvents="none" style={[styles.orbit, { borderColor: heroBorder }]} />
          <View pointerEvents="none" style={[styles.orbitInner, { borderColor: heroBorder }]} />
          <View style={styles.heroTop}>
            <View style={styles.heroLabel}>
              <FileText size={16} color={heroAccent} />
              <Text
                style={{
                  color: heroAccent,
                  fontFamily: theme.fonts.bodySemibold,
                  fontSize: 15,
                  lineHeight: 22,
                  letterSpacing: 1.6,
                }}
              >
                {content.category}
              </Text>
            </View>
            <View
              style={{ width: 52, height: 30, flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}
            >
              <Svg width={52} height={52} style={{ flexShrink: 0 }} viewBox="0 0 24 24" aria-hidden={true}>
                <Path
                  d="M12 1 14 5.5 16 4.5 15 10.5 19 7.5 20 10 23 9 22 14 24 15 15 18 16 21 12.7 20.5 12.7 24 11.3 24 11.3 20.5 8 21 9 18 0 15 2 14 1 9 4 10 5 7.5 9 10.5 8 4.5 10 5.5Z"
                  fill={colors.accentPress}
                />
              </Svg>
            </View>
          </View>
          <Text
            accessibilityRole="header"
            style={[
              styles.heroTitle,
              {
                color: heroText,
                fontFamily: theme.fonts.displaySemibold,
                fontSize: isNarrow ? 24 : 32,
                lineHeight: isNarrow ? 34 : 44,
              },
            ]}
          >
            {content.heading}
          </Text>
          <View
            style={[
              styles.reviewPill,
              isLight && { backgroundColor: colors.successSoft, borderColor: '#BDDCC8' },
            ]}
          >
            <Clock3 size={18} color={reviewText} strokeWidth={1.8} />
            <Text
              style={{
                color: reviewText,
                fontFamily: theme.fonts.bodySemibold,
                fontSize: 15,
                lineHeight: 22,
              }}
            >
              {content.status}
            </Text>
          </View>
          <View style={[styles.scoreRow, { borderTopColor: heroBorder }]}>
            <View style={[styles.scoreAccent, { backgroundColor: colors.accentPress }]} />
            <Text
              style={{
                color: heroText,
                fontFamily: theme.fonts.displaySemibold,
                fontSize: isNarrow ? 20 : 24,
                lineHeight: 32,
              }}
            >
              {content.points}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.timeline,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.border,
              padding: isNarrow ? 24 : 32,
            },
          ]}
        >
          <View style={[styles.timelineHeader, { borderBottomColor: colors.border }]}>
            <View style={styles.timelineLabel}>
              <View style={[styles.headingMarker, { backgroundColor: colors.accentPress }]} />
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.textStrong,
                  fontFamily: theme.fonts.displaySemibold,
                  fontSize: isNarrow ? 20 : 24,
                  lineHeight: 32,
                }}
              >
                {content.updatesTitle}
              </Text>
            </View>
          </View>
          <View style={styles.entries}>
            {content.updates.map((update, index) => (
              <View key={update.date} style={styles.entry}>
                <View style={styles.rail}>
                  <View
                    style={[
                      styles.node,
                      {
                        backgroundColor: index === 0 ? colors.accentPress : colors.successSoft,
                        borderColor: index === 0 ? colors.accentPress : colors.border,
                      },
                    ]}
                  >
                    <Check
                      size={16}
                      color={index === 0 ? (isLight ? '#FFFFFF' : colors.textOnAccent) : colors.success}
                      strokeWidth={2.5}
                    />
                  </View>
                  {index < content.updates.length - 1 && (
                    <View style={[styles.connector, { backgroundColor: colors.border }]} />
                  )}
                </View>
                <View style={[styles.entryContent, index === content.updates.length - 1 && styles.lastEntry]}>
                  <Text
                    style={{
                      color: index === 0 ? dateAccent : colors.textMuted,
                      fontFamily: theme.fonts.bodySemibold,
                      fontSize: 13,
                      lineHeight: 22,
                    }}
                  >
                    {update.date}
                  </Text>
                  <Text
                    style={{
                      color: colors.textStrong,
                      fontFamily: theme.fonts.bodyMedium,
                      fontSize: isNarrow ? 16 : 18,
                      lineHeight: 28,
                    }}
                  >
                    {update.detail}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.lastUpdated}>
          <Clock3 size={14} color={colors.textMuted} />
          <Text style={[styles.updatedText, muted]}>{content.lastUpdated}</Text>
        </View>
      </PersonalPageLayout>
    </>
  )
}

const styles = StyleSheet.create({
  linkedinLink: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  reviewPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(164, 232, 190, 0.25)',
    backgroundColor: 'rgba(46, 158, 91, 0.15)',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hero: { borderRadius: 24, borderWidth: 1, overflow: 'hidden', gap: 24 },
  orbit: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderWidth: 1,
    borderRadius: 160,
    right: -130,
    top: -120,
  },
  orbitInner: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderWidth: 1,
    borderRadius: 120,
    right: -90,
    top: -80,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  heroLabel: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  heroTitle: { maxWidth: 720, letterSpacing: -0.5 },
  scoreRow: {
    borderTopWidth: 1,
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  scoreAccent: { width: 4, height: 26, borderRadius: 2 },
  timeline: { borderWidth: 1, borderRadius: 24 },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  timelineLabel: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  headingMarker: { height: 22, width: 4, borderRadius: 2 },
  entries: { paddingTop: 28 },
  entry: { flexDirection: 'row', gap: 18 },
  rail: { width: 32, alignItems: 'center' },
  node: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: { width: 1, flex: 1, minHeight: 24 },
  entryContent: { flex: 1, gap: 6, paddingBottom: 32, paddingTop: 3 },
  lastEntry: { paddingBottom: 0 },
  lastUpdated: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', paddingHorizontal: 4 },
  updatedText: { fontSize: 12, lineHeight: 18, flex: 1 },
})
