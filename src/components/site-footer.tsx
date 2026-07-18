import { Phone } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { Logo } from '@/components/logo'
import { company } from '@/data/company'
import { useTheme } from '@/theme/theme'

/** Footer content is kept as a component so every future marketing screen shares one source. */
export function SiteFooter() {
  const theme = useTheme()
  return (
    <View style={[styles.footer, { backgroundColor: theme.colors.bandDeep }]}>
      <View style={styles.content}>
        <Logo inverse />
        <Text
          style={{
            color: theme.colors.bandTextMuted,
            fontFamily: theme.fonts.body,
            fontSize: 14,
            lineHeight: 21,
          }}
        >
          Building Rajkot’s future with clear quotes, dependable teams, and snag-free handovers.
        </Text>
        <View style={styles.contact}>
          <Phone color={theme.colors.accent} size={16} />
          <Text style={{ color: theme.colors.bandText, fontFamily: theme.fonts.bodySemibold, fontSize: 14 }}>
            {company.phone}
          </Text>
        </View>
        <Text style={{ color: theme.colors.bandTextFaint, fontFamily: theme.fonts.body, fontSize: 12 }}>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  footer: { paddingHorizontal: 24, paddingVertical: 48 },
  content: { gap: 18, marginHorizontal: 'auto', maxWidth: 1200, width: '100%' },
  contact: { alignItems: 'center', flexDirection: 'row', gap: 8 },
})
