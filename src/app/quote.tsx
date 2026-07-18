import { CheckCircle2 } from 'lucide-react-native'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { SectionHeading } from '@/components/section-heading'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/data/company'
import { useTheme } from '@/theme/theme'

export default function QuoteScreen() {
  const theme = useTheme()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', project: '', details: '' })
  const update = (key: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }))
  const canSubmit = Boolean(form.name.trim() && form.phone.trim() && form.project.trim())

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 62 }}
      style={{ backgroundColor: theme.colors.surfacePage }}
    >
      <View style={styles.container}>
        <SectionHeading
          eyebrow="Start a conversation"
          title="Request a clear, itemised quote."
          lead="Share the essentials and our team will arrange a site visit within one working day."
        />
        {sent ? (
          <View style={[styles.success, { backgroundColor: theme.colors.successSoft }]}>
            <CheckCircle2 color={theme.colors.success} size={32} />
            <Text
              style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold, fontSize: 22 }}
            >
              Thanks — we’ve got your request.
            </Text>
            <Text
              style={{
                color: theme.colors.textBody,
                fontFamily: theme.fonts.body,
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              We’ll call you at the number provided to discuss your project.
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.form,
              { backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border },
            ]}
          >
            <FormField
              label="Your name"
              value={form.name}
              onChangeText={update('name')}
              placeholder="Full name"
              required
              autoComplete="name"
            />
            <FormField
              label="Phone number"
              value={form.phone}
              onChangeText={update('phone')}
              placeholder="+91"
              required
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            <FormField
              label="What are you planning?"
              value={form.project}
              onChangeText={update('project')}
              placeholder="Villa, office, renovation…"
              required
            />
            <FormField
              label="Project details"
              value={form.details}
              onChangeText={update('details')}
              placeholder="Location, approximate area, timeline, and anything else that will help us prepare."
              multiline
            />
            <Button block disabled={!canSubmit} onPress={() => setSent(true)}>
              Send request
            </Button>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              This form is a local preview until lead delivery is configured. Prefer to talk now? Call{' '}
              {company.phone}.
            </Text>
          </View>
        )}
      </View>
      <SiteFooter />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: 36,
    maxWidth: 760,
    paddingHorizontal: 24,
    paddingVertical: 72,
    width: '100%',
  },
  form: { borderRadius: 16, borderWidth: 1, gap: 20, padding: 24 },
  success: { borderRadius: 16, gap: 14, padding: 28 },
})
