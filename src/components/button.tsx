import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '@/theme/theme'

type ButtonProps = {
  children: ReactNode
  onPress?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  accessibilityLabel?: string
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  block,
  disabled,
  iconLeft,
  iconRight,
  accessibilityLabel,
}: ButtonProps) {
  const theme = useTheme()
  const variants = {
    primary: {
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
      color: theme.colors.textOnAccent,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.borderStrong,
      color: theme.colors.textStrong,
    },
    ghost: { backgroundColor: 'transparent', borderColor: 'transparent', color: theme.colors.accentPress },
    inverse: {
      backgroundColor: theme.colors.bandText,
      borderColor: theme.colors.bandText,
      color: theme.colors.bandDeep,
    },
  } as const
  const sizes = { sm: [8, 14, 14], md: [12, 22, 16], lg: [16, 30, 18] } as const
  const [vertical, horizontal, fontSize] = sizes[size]
  const tone = variants[variant]

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: tone.backgroundColor,
          borderColor: tone.borderColor,
          paddingHorizontal: horizontal,
          paddingVertical: vertical,
          opacity: disabled ? 0.5 : 1,
          width: block ? '100%' : undefined,
        },
        variant === 'primary' && theme.shadows.accent,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={styles.contents}>
        {iconLeft}
        <Text
          style={{
            color: tone.color,
            fontFamily: theme.fonts.displaySemibold,
            fontSize,
            lineHeight: Math.round(fontSize * 1.2),
          }}
        >
          {children}
        </Text>
        {iconRight}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
  },
  contents: { alignItems: 'center', flexDirection: 'row', gap: 8, justifyContent: 'center' },
  pressed: { transform: [{ translateY: 1 }] },
})
