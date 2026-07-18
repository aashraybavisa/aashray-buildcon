import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

type LanguageSwitchProps = { mobile?: boolean }

/** Compact English/Gujarati toggle shared by the header and mobile menu. */
export function LanguageSwitch({ mobile = false }: LanguageSwitchProps) {
  const theme = useTheme()
  const { copy, language, setLanguage } = useLanguage()
  const isGujarati = language === 'gu'

  return (
    <Pressable
      accessibilityLabel={isGujarati ? copy.language.switchToEnglish : copy.language.switchToGujarati}
      accessibilityRole="switch"
      accessibilityState={{ checked: isGujarati }}
      onPress={() => setLanguage(isGujarati ? 'en' : 'gu')}
      style={[styles.root, mobile && styles.rootMobile]}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border },
        ]}
      >
        <Text style={[styles.option, styles.optionEnglish, { color: theme.colors.textMuted }]}>
          {copy.language.englishShort}
        </Text>
        <Text style={[styles.option, styles.optionGujarati, { color: theme.colors.textMuted }]}>
          {copy.language.gujaratiShort}
        </Text>
        <View
          style={[
            styles.thumb,
            { backgroundColor: theme.colors.accent },
            isGujarati ? styles.thumbOn : styles.thumbOff,
          ]}
        >
          <Text style={[styles.thumbText, { color: theme.colors.textOnAccent }]}>
            {isGujarati ? copy.language.gujaratiShort : copy.language.englishShort}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', flexDirection: 'row', gap: 6, minHeight: 32 },
  rootMobile: { alignSelf: 'flex-start', marginTop: 8 },
  track: { borderRadius: 10, borderWidth: 1, height: 20, position: 'relative', width: 66 },
  option: {
    fontFamily: 'Inter_700Bold',
    fontSize: 8,
    fontWeight: '800',
    height: 18,
    lineHeight: 18,
    position: 'absolute',
    top: 0,
  },
  optionEnglish: { left: 7 },
  optionGujarati: { right: 7 },
  thumb: {
    alignItems: 'center',
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    top: 2,
    width: 31,
  },
  thumbText: { fontFamily: 'Inter_700Bold', fontSize: 8, fontWeight: '800' },
  thumbOff: { left: 2 },
  thumbOn: { right: 2 },
})
