import { CheckCircle2 } from 'lucide-react-native'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/data/company'
import { copy } from '@/data/content'
import { LeadDeliveryNotConfiguredError, sendLead } from '@/lib/lead'
import { useTheme } from '@/theme/theme'

export default function QuoteScreen() {
  const theme = useTheme()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [website, setWebsite] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', project: '', details: '' })
  const update = (key: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }))
  const submit = async () => {
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = copy.quote.errors.name
    if (form.phone.replace(/\D/g, '').length < 10) nextErrors.phone = copy.quote.errors.phone
    if (!form.project.trim()) nextErrors.project = copy.quote.errors.project
    setErrors(nextErrors)
    setSubmitError(null)
    if (Object.keys(nextErrors).length) return
    if (website) {
      setSent(true)
      return
    }

    setSending(true)
    try {
      await sendLead({
        form: 'quote',
        name: form.name.trim(),
        phone: form.phone.trim(),
        project: form.project.trim(),
        message: form.details.trim(),
      })
      setSent(true)
    } catch (error) {
      setSubmitError(
        error instanceof LeadDeliveryNotConfiguredError
          ? copy.common.configuredError
          : copy.common.deliveryError,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Seo title={copy.quote.seoTitle} description={copy.quote.seoDescription} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 62 }}
        style={{ backgroundColor: theme.colors.surfacePage }}
      >
        <View style={styles.container}>
          <SectionHeading eyebrow={copy.quote.eyebrow} title={copy.quote.title} lead={copy.quote.lead} />
          {sent ? (
            <View style={[styles.success, { backgroundColor: theme.colors.successSoft }]}>
              <CheckCircle2 color={theme.colors.success} size={32} />
              <Text
                style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold, fontSize: 22 }}
              >
                {copy.common.thankYouQuote}
              </Text>
              <Text
                style={{
                  color: theme.colors.textBody,
                  fontFamily: theme.fonts.body,
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                {copy.common.thankYouQuoteLead}
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
                label={copy.quote.fields.name}
                value={form.name}
                onChangeText={update('name')}
                placeholder={copy.quote.placeholders.name}
                required
                autoComplete="name"
                error={errors.name}
              />
              <FormField
                label={copy.quote.fields.phone}
                value={form.phone}
                onChangeText={update('phone')}
                placeholder={copy.quote.placeholders.phone}
                required
                keyboardType="phone-pad"
                autoComplete="tel"
                error={errors.phone}
              />
              <FormField
                label={copy.quote.fields.project}
                value={form.project}
                onChangeText={update('project')}
                placeholder={copy.quote.placeholders.project}
                required
                error={errors.project}
              />
              <FormField
                label={copy.quote.fields.details}
                value={form.details}
                onChangeText={update('details')}
                placeholder={copy.quote.placeholders.details}
                multiline
              />
              <TextInput
                accessibilityElementsHidden
                autoComplete="off"
                onChangeText={setWebsite}
                style={styles.honeypot}
                value={website}
              />
              {submitError && (
                <Text style={{ color: theme.colors.danger, fontFamily: theme.fonts.body, fontSize: 14 }}>
                  {submitError}
                </Text>
              )}
              <Button block disabled={sending} onPress={submit}>
                {sending ? copy.common.sending : copy.common.sendRequest}
              </Button>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.body,
                  fontSize: 12,
                  lineHeight: 18,
                }}
              >
                {copy.quote.callNote} {company.phone}.
              </Text>
            </View>
          )}
        </View>
        <SiteFooter />
      </ScrollView>
    </>
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
  honeypot: { height: 1, left: -10000, opacity: 0, position: 'absolute', width: 1 },
})
