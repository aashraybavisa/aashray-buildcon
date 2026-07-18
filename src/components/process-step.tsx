import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/theme';

export function ProcessStep({ step, title, children, last = false }: { step: string; title: string; children: string; last?: boolean }) {
  const theme = useTheme();
  return <View style={styles.root}><View style={styles.rail}><View style={[styles.number, { backgroundColor: theme.colors.accent }]}><Text style={{ color: theme.colors.textOnAccent, fontFamily: theme.fonts.displayBold, fontSize: 20 }}>{step}</Text></View>{!last && <View style={[styles.connector, { backgroundColor: theme.colors.border }]} />}</View><View style={[styles.content, !last && styles.withPadding]}><Text style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold, fontSize: 20 }}>{title}</Text><Text style={{ color: theme.colors.textMuted, fontFamily: theme.fonts.body, fontSize: 16, lineHeight: 24 }}>{children}</Text></View></View>;
}
const styles = StyleSheet.create({ root: { flexDirection: 'row', gap: 16 }, rail: { alignItems: 'center', width: 48 }, number: { alignItems: 'center', borderRadius: 24, height: 48, justifyContent: 'center', width: 48 }, connector: { flex: 1, marginTop: 6, minHeight: 24, width: 2 }, content: { flex: 1, gap: 6, paddingTop: 8 }, withPadding: { paddingBottom: 32 } });
