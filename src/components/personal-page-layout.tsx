import type { ReactNode } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { useResponsive } from '@/hooks/use-responsive'
import { useTheme } from '@/theme/theme'

type Props = {
  name: string
  action: ReactNode
  children: ReactNode
}

export function PersonalPageLayout({ name, action, children }: Props) {
  const theme = useTheme()
  const { isNarrow } = useResponsive()
  const colors = theme.colors
  const accentText = colors.accentPress
  const gutter = isNarrow ? 16 : 24

  return (
    <View style={[styles.root, { backgroundColor: colors.surfaceRaised }]}>
      <View
        style={{
          backgroundColor: colors.surfacePage,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={[
            styles.column,
            styles.header,
            { paddingHorizontal: gutter, paddingVertical: isNarrow ? 12 : 20 },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                width: isNarrow ? 36 : 44,
                height: isNarrow ? 36 : 44,
                backgroundColor: colors.accentSoft,
                borderColor: colors.accentBorder,
              },
            ]}
          >
            <Text
              style={{
                color: accentText,
                fontFamily: theme.fonts.displayBold,
                fontSize: isNarrow ? 15 : 18,
              }}
            >
              AB
            </Text>
          </View>
          <Text
            accessibilityRole="header"
            numberOfLines={1}
            style={{
              flex: 1,
              color: accentText,
              fontFamily: theme.fonts.displaySemibold,
              fontSize: isNarrow ? 20 : 30,
              lineHeight: isNarrow ? 28 : 38,
            }}
          >
            {name}
          </Text>
          {action}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View
          style={[
            styles.column,
            styles.content,
            { paddingHorizontal: gutter, paddingTop: isNarrow ? 20 : 32 },
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  column: { alignSelf: 'center', maxWidth: 1040, width: '100%' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: { flexShrink: 0, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  content: { gap: 16 },
})
