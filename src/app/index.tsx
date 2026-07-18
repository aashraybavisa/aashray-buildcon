import { ArrowRight, Check, ShieldCheck } from 'lucide-react-native'
import { router, type Href } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { CTABand } from '@/components/cta-band'
import { ProcessStep } from '@/components/process-step'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { ServiceCard } from '@/components/service-card'
import { SiteFooter } from '@/components/site-footer'
import { StatCard } from '@/components/stat-card'
import { TestimonialCard } from '@/components/testimonial-card'
import { processSteps, stats } from '@/data/company'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { useResponsive } from '@/hooks/use-responsive'
import { useLanguage } from '@/i18n/language-provider'
import { useTheme } from '@/theme/theme'

export default function HomeScreen() {
  const theme = useTheme()
  const { copy, language } = useLanguage()
  const { isDesktop, isNarrow } = useResponsive()
  const serviceColumns = isDesktop ? 3 : isNarrow ? 1 : 2
  // Expo Router's generated route declarations update on the next dev-server start.
  const quoteRoute = '/quote' as Href
  const projectsRoute = '/projects' as Href

  return (
    <>
      <Seo title={copy.home.seoTitle} description={copy.home.seoDescription} structuredData />
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.colors.surfacePage, paddingBottom: 62 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.colors.bandBg }]}>
          <View style={[styles.heroOrb, { backgroundColor: theme.colors.accent }]} />
          <View style={styles.container}>
            <Text
              style={[styles.eyebrow, { color: theme.colors.accent, fontFamily: theme.fonts.bodySemibold }]}
            >
              {copy.home.location}
            </Text>
            <Text
              style={[
                styles.heroTitle,
                { color: theme.colors.bandText, fontFamily: theme.fonts.displayBold },
              ]}
            >
              {copy.home.title}
            </Text>
            <Text
              style={[styles.heroLead, { color: theme.colors.bandTextMuted, fontFamily: theme.fonts.body }]}
            >
              {copy.home.lead}
            </Text>
            <View style={styles.heroActions}>
              <Button
                size="lg"
                onPress={() => router.push(quoteRoute)}
                iconRight={<ArrowRight color={theme.colors.textOnAccent} size={19} />}
              >
                {copy.common.quote}
              </Button>
              <Button size="lg" variant="inverse" onPress={() => router.push(projectsRoute)}>
                {copy.home.projects}
              </Button>
            </View>
          </View>
        </View>

        <View style={[styles.statsBand, { backgroundColor: theme.colors.bandDeep }]}>
          <View style={[styles.container, styles.statsGrid]}>
            {stats.map(({ labelGu, ...stat }) => (
              <StatCard invert key={stat.label} {...stat} label={language === 'gu' ? labelGu : stat.label} />
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.container]}>
          <SectionHeading
            eyebrow={copy.home.servicesEyebrow}
            title={copy.home.servicesTitle}
            lead={copy.home.servicesLead}
          />
          <View style={styles.grid}>
            {services.map(({ titleGu, excerptGu, bodyGu, ...service }) => (
              <View key={service.slug} style={{ width: `${100 / serviceColumns}%`, padding: 6 }}>
                <ServiceCard
                  {...service}
                  title={language === 'gu' ? titleGu : service.title}
                  excerpt={language === 'gu' ? excerptGu : service.excerpt}
                  onPress={() => {}}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.raisedSection, { backgroundColor: theme.colors.surfaceRaised }]}>
          <View style={[styles.section, styles.container]}>
            <SectionHeading
              eyebrow={copy.home.projectsEyebrow}
              title={copy.home.projectsTitle}
              lead={copy.home.projectsLead}
            />
            <View style={styles.grid}>
              {projects.slice(0, 3).map((project) => (
                <View key={project.slug} style={{ flex: 1, minWidth: 220, padding: 6 }}>
                  <ProjectCard project={project} onPress={() => router.push(projectsRoute)} />
                </View>
              ))}
            </View>
            <Button
              variant="ghost"
              onPress={() => router.push(projectsRoute)}
              iconRight={<ArrowRight color={theme.colors.accentPress} size={17} />}
            >
              {copy.home.allProjects}
            </Button>
          </View>
        </View>

        <View style={[styles.section, styles.container]}>
          <SectionHeading
            eyebrow={copy.home.processEyebrow}
            title={copy.home.processTitle}
            lead={copy.home.processLead}
          />
          <View style={[styles.processGrid, isDesktop && styles.processGridWide]}>
            {processSteps.map((step, index) => (
              <View key={step.n} style={styles.processItem}>
                <ProcessStep
                  step={step.n}
                  title={language === 'gu' ? step.titleGu : step.title}
                  last={index === processSteps.length - 1}
                >
                  {language === 'gu' ? step.descGu : step.desc}
                </ProcessStep>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.raisedSection, { backgroundColor: theme.colors.surfaceRaised }]}>
          <View style={[styles.section, styles.container]}>
            <SectionHeading eyebrow={copy.home.testimonialsEyebrow} title={copy.home.testimonialsTitle} />
            <View style={styles.grid}>
              {testimonials.map((testimonial) => (
                <View key={testimonial.name} style={{ flex: 1, minWidth: 230, padding: 6 }}>
                  <TestimonialCard {...testimonial} />
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.container]}>
          <CTABand
            title={copy.home.ctaTitle}
            lead={copy.home.ctaLead}
            onAction={() => router.push(quoteRoute)}
          />
        </View>
        <View
          style={[
            styles.trust,
            { backgroundColor: theme.colors.surfacePage, borderTopColor: theme.colors.border },
          ]}
        >
          <ShieldCheck color={theme.colors.success} size={22} />
          <Text style={{ color: theme.colors.textBody, fontFamily: theme.fonts.bodyMedium }}>
            {copy.home.trust}
          </Text>
          <Check color={theme.colors.accentPress} size={20} />
        </View>
        <SiteFooter />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { alignSelf: 'center', maxWidth: 1200, paddingHorizontal: 24, width: '100%' },
  hero: { overflow: 'hidden', paddingVertical: 92, position: 'relative' },
  heroOrb: {
    borderRadius: 999,
    height: 460,
    opacity: 0.12,
    position: 'absolute',
    right: -170,
    top: -230,
    width: 460,
  },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, marginBottom: 14 },
  heroTitle: { fontSize: 50, letterSpacing: -1.4, lineHeight: 56, maxWidth: 700 },
  heroLead: { fontSize: 19, lineHeight: 29, marginTop: 20, maxWidth: 610 },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 32 },
  statsBand: { paddingVertical: 34 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 28, justifyContent: 'space-between' },
  section: { gap: 36, paddingVertical: 72 },
  raisedSection: {},
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  processGrid: { gap: 4 },
  processGridWide: { flexDirection: 'row' },
  processItem: { flex: 1, minWidth: 220 },
  trust: {
    alignItems: 'center',
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 22,
  },
})
