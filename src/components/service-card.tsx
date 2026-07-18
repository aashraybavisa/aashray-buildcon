import { ArrowUpRight, Building2, Hammer, Home, LayoutPanelTop, Ruler, Wrench, type LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/theme';

const icons: Record<string, LucideIcon> = { home: Home, 'building-2': Building2, hammer: Hammer, layout: LayoutPanelTop, ruler: Ruler, wrench: Wrench };
type ServiceCardProps = { icon: string; title: string; excerpt: string; meta?: string; onPress?: () => void };

export function ServiceCard({ icon, title, excerpt, meta = 'Explore', onPress }: ServiceCardProps) {
  const theme = useTheme();
  const Icon = icons[icon] ?? Hammer;
  return <Pressable accessibilityRole="button" accessibilityLabel={`${meta} ${title}`} onPress={onPress} style={({ pressed }) => [styles.card, { backgroundColor: theme.colors.surfaceCard, borderColor: pressed ? theme.colors.accentBorder : theme.colors.border }, theme.shadows.sm, pressed && styles.pressed]}>
    <View style={[styles.icon, { backgroundColor: theme.colors.accentSoft }]}><Icon color={theme.colors.accentPress} size={25} strokeWidth={2} /></View>
    <Text style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold, fontSize: 20 }}>{title}</Text>
    <Text style={[styles.excerpt, { color: theme.colors.textMuted, fontFamily: theme.fonts.body }]}>{excerpt}</Text>
    <View style={styles.more}><Text style={{ color: theme.colors.accentPress, fontFamily: theme.fonts.displaySemibold, fontSize: 14 }}>{meta}</Text><ArrowUpRight color={theme.colors.accentPress} size={16} /></View>
  </Pressable>;
}
const styles = StyleSheet.create({ card: { borderRadius: 16, borderWidth: 1, gap: 12, minHeight: 255, padding: 24 }, icon: { alignItems: 'center', borderRadius: 10, height: 52, justifyContent: 'center', width: 52 }, excerpt: { flex: 1, fontSize: 16, lineHeight: 24 }, more: { alignItems: 'center', flexDirection: 'row', gap: 4 }, pressed: { transform: [{ translateY: -2 }] } });
