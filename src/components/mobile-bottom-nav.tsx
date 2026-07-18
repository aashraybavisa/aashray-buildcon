import { Building2, FileText, Home } from 'lucide-react-native'
import { router, usePathname, type Href } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useResponsive } from '@/hooks/use-responsive'
import { useTheme } from '@/theme/theme'

const tabs = [
  { label: 'Home', path: '/', Icon: Home },
  { label: 'Work', path: '/projects', Icon: Building2 },
  { label: 'Quote', path: '/quote', Icon: FileText },
] as const

/** Fixed app-style navigation for narrow screens; desktop uses the header CTAs instead. */
export function MobileBottomNav() {
  const theme = useTheme()
  const { isNarrow } = useResponsive()
  const pathname = usePathname()
  if (!isNarrow) return null
  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: theme.colors.surfaceCard, borderTopColor: theme.colors.border },
        theme.shadows.md,
      ]}
    >
      {tabs.map(({ label, path, Icon }) => {
        const active = pathname === path
        const color = active ? theme.colors.accentPress : theme.colors.textMuted
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            key={path}
            onPress={() => router.replace(path as Href)}
            style={styles.tab}
          >
            <Icon color={color} size={20} strokeWidth={active ? 2.5 : 2} />
            <Text style={{ color, fontFamily: theme.fonts.bodySemibold, fontSize: 11 }}>{label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  bar: { bottom: 0, borderTopWidth: 1, flexDirection: 'row', left: 0, position: 'absolute', right: 0 },
  tab: { alignItems: 'center', flex: 1, gap: 4, justifyContent: 'center', minHeight: 62, paddingTop: 6 },
})
