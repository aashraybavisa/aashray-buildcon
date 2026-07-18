import { useState } from 'react'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/data/company'
import { useLanguage } from '@/i18n/language-provider'
import { LeadDeliveryNotConfiguredError, sendLead } from '@/lib/lead'
import { useTheme } from '@/theme/theme'

export default function ContactScreen() {
  const theme = useTheme()
  const { copy } = useLanguage()
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
    if (!form.name.trim()) nextErrors.name = copy.contact.errors.name
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = copy.contact.errors.email
    if (!form.message.trim()) nextErrors.message = copy.contact.errors.message
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
          ? copy.common.configuredContactError
          : copy.common.contactDeliveryError,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Seo title={copy.contact.seoTitle} description={copy.contact.seoDescription} />
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.surfacePage, paddingBottom: 62 }}>
        <View style={styles.container}>
          <SectionHeading
            eyebrow={copy.contact.eyebrow}
            title={copy.contact.title}
            lead={copy.contact.lead}
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
                  {copy.common.thankYouContact}
                </Text>
              ) : (
                <>
                  <FormField
                    label={copy.contact.fields.name}
                    value={form.name}
                    onChangeText={update('name')}
                    placeholder={copy.contact.placeholders.name}
                    required
                    autoComplete="name"
                    error={errors.name}
                  />
                  <FormField
                    label={copy.contact.fields.email}
                    value={form.email}
                    onChangeText={update('email')}
                    placeholder={copy.contact.placeholders.email}
                    required
                    autoComplete="email"
                    keyboardType="email-address"
                    error={errors.email}
                  />
                  <FormField
                    label={copy.contact.fields.message}
                    value={form.message}
                    onChangeText={update('message')}
                    placeholder={copy.contact.placeholders.message}
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
                    {sending ? copy.common.sending : copy.common.sendMessage}
                  </Button>
                  <Text
                    style={{
                      color: theme.colors.textMuted,
                      fontFamily: theme.fonts.body,
                      fontSize: 12,
                      lineHeight: 18,
                    }}
                  >
                    {copy.contact.note}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        <SiteFooter />
      </ScrollView>
    </>
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
