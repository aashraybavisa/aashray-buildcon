import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';

import { useTheme } from '@/theme/theme';

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoComplete?: 'name' | 'email' | 'tel' | 'off';
};

/** Labelled native text control with an accessible error/hint treatment. */
export function FormField({ label, value, onChangeText, placeholder, hint, error, required, multiline, keyboardType, autoComplete }: FormFieldProps) {
  const theme = useTheme();
  const message = error ?? hint;
  return <View style={styles.root}><Text style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.bodySemibold, fontSize: 14 }}>{label}{required && <Text style={{ color: theme.colors.danger }}> *</Text>}</Text><TextInput accessibilityLabel={label} accessibilityHint={message} autoComplete={autoComplete} keyboardType={keyboardType} multiline={multiline} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={theme.colors.textMuted} style={[styles.input, { backgroundColor: theme.colors.surfaceCard, borderColor: error ? theme.colors.danger : theme.colors.borderStrong, color: theme.colors.textStrong, fontFamily: theme.fonts.body }, multiline && styles.multiline]} value={value} /></View>;
}
const styles = StyleSheet.create({ root: { gap: 8 }, input: { borderRadius: 10, borderWidth: 1, fontSize: 16, minHeight: 48, paddingHorizontal: 14, paddingVertical: 12 }, multiline: { minHeight: 112, textAlignVertical: 'top' } });
