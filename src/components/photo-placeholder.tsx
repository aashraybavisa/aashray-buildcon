import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native'

import { useTheme } from '@/theme/theme'

/** A deliberate stand-in for project photography until approved photography is supplied. */
export function PhotoPlaceholder({
  label = 'Project photo',
  style,
}: {
  label?: string
  style?: StyleProp<ViewStyle>
}) {
  const theme = useTheme()
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={label}
      style={[styles.root, { backgroundColor: theme.colors.bandBg }, style]}
    >
      <View style={[styles.line, { backgroundColor: theme.colors.bandBorder }]} />
      <Text
        style={{
          color: theme.colors.bandTextFaint,
          fontFamily: theme.fonts.bodySemibold,
          fontSize: 11,
          letterSpacing: 1.3,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center', minHeight: 180, overflow: 'hidden' },
  line: { height: 1, position: 'absolute', transform: [{ rotate: '-38deg' }], width: '170%' },
})
