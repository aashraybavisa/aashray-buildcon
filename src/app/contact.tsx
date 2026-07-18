import { useState } from 'react'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { SectionHeading } from '@/components/section-heading'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/data/company'
import { useTheme } from '@/theme/theme'

export default function ContactScreen() {
  const theme = useTheme()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (field: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [field]: value }))
  const canSubmit = Boolean(form.name.trim() && form.email.trim() && form.message.trim())

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
                />
                <FormField
                  label="Email"
                  value={form.email}
                  onChangeText={update('email')}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  keyboardType="email-address"
                />
                <FormField
                  label="How can we help?"
                  value={form.message}
                  onChangeText={update('message')}
                  placeholder="Tell us a little about your enquiry."
                  required
                  multiline
                />
                <Button block disabled={!canSubmit} onPress={() => setSent(true)}>
                  Send message
                </Button>
                <Text
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  This local form will connect to lead delivery in Stage 7.
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
})
