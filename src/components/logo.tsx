import { Image, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme/theme';

type LogoProps = {
  compact?: boolean;
  inverse?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Brand mark with an optional wordmark. The supplied SVG stays sharp on web and native. */
export function Logo({ compact = false, inverse = false, style }: LogoProps) {
  const theme = useTheme();
  const wordmarkColor = inverse ? theme.colors.bandText : theme.colors.textStrong;

  return (
    <View accessibilityRole="image" accessibilityLabel="Aashray Buildcon" style={[styles.root, style]}>
      <Image source={require('@/assets/brand/logo-tile.svg')} style={styles.mark} />
      {!compact && (
        <View>
          <Text style={[styles.name, { color: wordmarkColor, fontFamily: theme.fonts.displayBold }]}>Aashray</Text>
          <Text style={[styles.tagline, { color: inverse ? theme.colors.bandTextMuted : theme.colors.textMuted, fontFamily: theme.fonts.bodySemibold }]}>BUILDCON</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  mark: { height: 40, width: 40 },
  name: { fontSize: 21, letterSpacing: -0.6, lineHeight: 22 },
  tagline: { fontSize: 9, letterSpacing: 2, lineHeight: 13 },
});
