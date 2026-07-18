import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/theme';

type BadgeProps = { children: ReactNode; tone?: 'neutral' | 'accent' | 'success' | 'danger' | 'info'; solid?: boolean; iconLeft?: ReactNode };

export function Badge({ children, tone = 'neutral', solid = false, iconLeft }: BadgeProps) {
  const theme = useTheme();
  const tones = {
    neutral: solid ? [theme.colors.textBody, theme.colors.textInverse] : [theme.colors.surfaceSunken, theme.colors.textBody],
    accent: solid ? [theme.colors.accent, theme.colors.textOnAccent] : [theme.colors.accentSoft, theme.colors.accentPress],
    success: solid ? [theme.colors.success, theme.colors.textInverse] : [theme.colors.successSoft, theme.colors.success],
    danger: solid ? [theme.colors.danger, theme.colors.textInverse] : [theme.colors.dangerSoft, theme.colors.danger],
    info: solid ? [theme.colors.info, theme.colors.textInverse] : [theme.colors.infoSoft, theme.colors.info],
  } as const;
  const [backgroundColor, color] = tones[tone];
  return <View style={[styles.badge, { backgroundColor }]}>{iconLeft}<Text style={{ color, fontFamily: theme.fonts.bodySemibold, fontSize: 12 }}>{children}</Text></View>;
}

export function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  const theme = useTheme();
  return <Text style={[styles.eyebrow, { color: inverse ? theme.colors.accent : theme.colors.accentPress, fontFamily: theme.fonts.bodySemibold }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  badge: { alignItems: 'center', alignSelf: 'flex-start', borderRadius: 999, flexDirection: 'row', gap: 5, paddingHorizontal: 10, paddingVertical: 4 },
  eyebrow: { fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' },
});
