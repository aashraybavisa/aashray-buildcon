import { ArrowRight } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

type CTABandProps = { title: string; lead?: string; actionLabel?: string; onAction?: () => void }
export function CTABand({ title, lead, actionLabel, onAction }: CTABandProps) {
  const theme = useTheme()
  const { copy } = useLanguage()
  return (
    <View style={[styles.band, { backgroundColor: theme.colors.bandBg }]}>
      <View style={[styles.orb, { backgroundColor: theme.colors.accent }]} />
      <View style={styles.copy}>
        <Text
          style={{
            color: theme.colors.bandText,
            fontFamily: theme.fonts.displayBold,
            fontSize: 36,
            letterSpacing: -0.8,
            lineHeight: 42,
          }}
        >
          {title}
        </Text>
        {lead && (
          <Text
            style={{
              color: theme.colors.bandTextMuted,
              fontFamily: theme.fonts.body,
              fontSize: 18,
              lineHeight: 28,
            }}
          >
            {lead}
          </Text>
        )}
      </View>
      <Button onPress={onAction} iconRight={<ArrowRight color={theme.colors.textOnAccent} size={18} />}>
        {actionLabel ?? copy.common.quote}
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  band: { borderRadius: 24, gap: 24, overflow: 'hidden', padding: 48, position: 'relative' },
  orb: {
    borderRadius: 999,
    height: 220,
    opacity: 0.12,
    position: 'absolute',
    right: -45,
    top: -45,
    width: 220,
  },
  copy: { gap: 12, maxWidth: 590 },
})
