import { Menu, Phone } from 'lucide-react-native';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Logo } from '@/components/logo';
import { useResponsive } from '@/hooks/use-responsive';
import { useTheme } from '@/theme/theme';

/** Shared route header. Navigation destinations are added alongside their route screens. */
export function SiteHeader() {
  const theme = useTheme();
  const { isNarrow } = useResponsive();
  return <View style={[styles.bar, { backgroundColor: theme.colors.surfacePage, borderBottomColor: theme.colors.border }]}><View style={styles.content}><Pressable accessibilityRole="link" accessibilityLabel="Aashray Buildcon home" onPress={() => router.replace('/')}><Logo /></Pressable>{isNarrow ? <Pressable accessibilityRole="button" accessibilityLabel="Open menu" style={styles.menu}><Menu color={theme.colors.textStrong} size={24} /></Pressable> : <View style={styles.actions}><Button size="sm" variant="ghost" iconLeft={<Phone color={theme.colors.accentPress} size={15} />} onPress={() => {}}>Call Us</Button><Button size="sm" onPress={() => {}}>Request a Quote</Button></View>}</View></View>;
}
const styles = StyleSheet.create({ bar: { borderBottomWidth: 1 }, content: { alignItems: 'center', flexDirection: 'row', height: 68, justifyContent: 'space-between', marginHorizontal: 'auto', maxWidth: 1200, paddingHorizontal: 24, width: '100%' }, actions: { alignItems: 'center', flexDirection: 'row', gap: 8 }, menu: { alignItems: 'center', height: 44, justifyContent: 'center', width: 44 } });
