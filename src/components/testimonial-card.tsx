import { Star } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/theme';

type TestimonialCardProps = { quote: string; name: string; role: string; rating?: number; invert?: boolean };
export function TestimonialCard({ quote, name, role, rating = 5, invert = false }: TestimonialCardProps) {
  const theme = useTheme();
  return <View style={[styles.card, { backgroundColor: invert ? theme.colors.bandBorder : theme.colors.surfaceCard, borderColor: invert ? theme.colors.bandBorder : theme.colors.border }, !invert && theme.shadows.sm]}><View style={styles.stars}>{Array.from({ length: 5 }, (_, index) => <Star key={index} fill={index < rating ? theme.colors.accent : 'transparent'} color={theme.colors.accent} size={17} />)}</View><Text style={[styles.quote, { color: invert ? theme.colors.bandText : theme.colors.textStrong, fontFamily: theme.fonts.displayMedium }]}>“{quote}”</Text><View style={styles.person}><Text style={{ color: invert ? theme.colors.bandText : theme.colors.textStrong, fontFamily: theme.fonts.bodySemibold, fontSize: 16 }}>{name}</Text><Text style={{ color: invert ? theme.colors.bandTextMuted : theme.colors.textMuted, fontFamily: theme.fonts.body, fontSize: 14 }}>{role}</Text></View></View>;
}
const styles = StyleSheet.create({ card: { borderRadius: 16, borderWidth: 1, gap: 16, minHeight: 260, padding: 32 }, stars: { flexDirection: 'row', gap: 3 }, quote: { fontSize: 20, lineHeight: 29 }, person: { gap: 2, marginTop: 'auto' } });
