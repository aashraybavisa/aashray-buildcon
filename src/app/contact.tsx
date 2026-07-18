import { useState } from 'react'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { SectionHeading } from '@/components/section-heading'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/data/company'
import { LeadDeliveryNotConfiguredError, sendLead } from '@/lib/lead'
import { useTheme } from '@/theme/theme'

export default function ContactScreen() {
  const theme = useTheme()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [website, setWebsite] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (field: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [field]: value }))
  const submit = async () => {
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.message.trim()) nextErrors.message = 'Please add a short message.'
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
        form: 'contact',
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      setSent(true)
    } catch (error) {
      setSubmitError(
        error instanceof LeadDeliveryNotConfiguredError
          ? 'Lead delivery is not configured yet. Please email or call us directly.'
          : 'We could not send your message. Please try again or contact us directly.',
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.surfacePage, paddingBottom: 62 }}>
      <View style={styles.container}>
        <SectionHeading
          eyebrow="Contact"
          title="Bring us your next build."
          lead="For project enquiries, visits, and general questions, get in touch with our Rajkot team."
        />
        <View style={styles.layout}>
          <View style={styles.details}>
            {[
              [MapPin, company.addressFull],
              [Phone, company.phone],
              [Mail, company.email],
              [Clock3, company.hours],
            ].map(([Icon, detail]) => {
              const DetailIcon = Icon as typeof MapPin
              return (
                <View key={detail as string} style={styles.detail}>
                  <DetailIcon color={theme.colors.accentPress} size={21} />
                  <Text
                    style={{
                      color: theme.colors.textBody,
                      flex: 1,
                      fontFamily: theme.fonts.body,
                      fontSize: 16,
                      lineHeight: 24,
                    }}
                  >
                    {detail as string}
                  </Text>
                </View>
              )
            })}
          </View>
          <View
            style={[
              styles.form,
              { backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border },
            ]}
          >
            {sent ? (
              <Text
                style={{ color: theme.colors.success, fontFamily: theme.fonts.displayBold, fontSize: 21 }}
              >
                Thanks. We’ll be in touch shortly.
              </Text>
            ) : (
              <>
                <FormField
                  label="Your name"
                  value={form.name}
                  onChangeText={update('name')}
                  placeholder="Full name"
                  required
                  autoComplete="name"
                  error={errors.name}
                />
                <FormField
                  label="Email"
                  value={form.email}
                  onChangeText={update('email')}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  keyboardType="email-address"
                  error={errors.email}
                />
                <FormField
                  label="How can we help?"
                  value={form.message}
                  onChangeText={update('message')}
                  placeholder="Tell us a little about your enquiry."
                  required
                  multiline
                  error={errors.message}
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
                  {sending ? 'Sending…' : 'Send message'}
                </Button>
                <Text
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  We protect this form with a spam trap. You can also email or call us directly.
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
      <SiteFooter />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: 42,
    maxWidth: 1040,
    paddingHorizontal: 24,
    paddingVertical: 72,
    width: '100%',
  },
  layout: { flexDirection: 'row', flexWrap: 'wrap', gap: 32 },
  details: { flex: 1, gap: 22, minWidth: 260, paddingVertical: 12 },
  detail: { alignItems: 'flex-start', flexDirection: 'row', gap: 12 },
  form: { borderRadius: 16, borderWidth: 1, flex: 1, gap: 18, minWidth: 280, padding: 24 },
  honeypot: { height: 1, left: -10000, opacity: 0, position: 'absolute', width: 1 },
})
