import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/theme';

export function StatCard({ value, suffix = '', label, invert = false }: { value: string; suffix?: string; label: string; invert?: boolean }) {
  const theme = useTheme();
  return <View style={styles.root}><View style={styles.valueRow}><Text style={[styles.value, { color: invert ? theme.colors.bandText : theme.colors.textStrong, fontFamily: theme.fonts.displayBold }]}>{value}</Text>{suffix ? <Text style={[styles.suffix, { color: theme.colors.accent, fontFamily: theme.fonts.displayBold }]}>{suffix}</Text> : null}</View><Text style={{ color: invert ? theme.colors.bandTextMuted : theme.colors.textMuted, fontFamily: theme.fonts.bodyMedium, fontSize: 14 }}>{label}</Text></View>;
}
const styles = StyleSheet.create({ root: { gap: 4 }, valueRow: { alignItems: 'baseline', flexDirection: 'row', gap: 2 }, value: { fontSize: 36, letterSpacing: -1, lineHeight: 40 }, suffix: { fontSize: 22 } });
