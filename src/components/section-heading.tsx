import { StyleSheet, Text, View } from 'react-native'

import { Eyebrow } from '@/components/badge'
import { useTheme } from '@/theme/theme'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  invert?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  invert = false,
}: SectionHeadingProps) {
  const theme = useTheme()
  const textAlign = align
  return (
    <View style={[styles.root, align === 'center' && styles.center]}>
      {eyebrow && <Eyebrow inverse={invert}>{eyebrow}</Eyebrow>}
      <Text
        style={[
          styles.title,
          {
            color: invert ? theme.colors.bandText : theme.colors.textStrong,
            fontFamily: theme.fonts.displayBold,
            textAlign,
          },
        ]}
      >
        {title}
      </Text>
      {lead && (
        <Text
          style={[
            styles.lead,
            {
              color: invert ? theme.colors.bandTextMuted : theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              textAlign,
            },
          ]}
        >
          {lead}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { gap: 12, maxWidth: 720 },
  center: { alignItems: 'center', alignSelf: 'center' },
  title: { fontSize: 30, letterSpacing: -0.7, lineHeight: 37 },
  lead: { fontSize: 18, lineHeight: 28, marginTop: 4 },
})
