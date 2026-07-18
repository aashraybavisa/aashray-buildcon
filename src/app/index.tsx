import { ArrowRight, Check, ShieldCheck } from 'lucide-react-native'
import { router, type Href } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { CTABand } from '@/components/cta-band'
import { ProcessStep } from '@/components/process-step'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { SiteFooter } from '@/components/site-footer'
import { StatCard } from '@/components/stat-card'
import { TestimonialCard } from '@/components/testimonial-card'
import { processSteps, stats } from '@/data/company'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { useResponsive } from '@/hooks/use-responsive'
import { useTheme } from '@/theme/theme'

export default function HomeScreen() {
  const theme = useTheme()
  const { isDesktop, isNarrow } = useResponsive()
  const serviceColumns = isDesktop ? 3 : isNarrow ? 1 : 2
  // Expo Router's generated route declarations update on the next dev-server start.
  const quoteRoute = '/quote' as Href
  const projectsRoute = '/projects' as Href

  return (
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
            RAJKOT · GUJARAT
          </Text>
          <Text
            style={[styles.heroTitle, { color: theme.colors.bandText, fontFamily: theme.fonts.displayBold }]}
          >
            Building Rajkot’s future, one project at a time.
          </Text>
          <Text
            style={[styles.heroLead, { color: theme.colors.bandTextMuted, fontFamily: theme.fonts.body }]}
          >
            Clear quotes. Accountable teams. Quality construction delivered on time and on budget.
          </Text>
          <View style={styles.heroActions}>
            <Button
              size="lg"
              onPress={() => router.push(quoteRoute)}
              iconRight={<ArrowRight color={theme.colors.textOnAccent} size={19} />}
            >
              Request a Quote
            </Button>
            <Button size="lg" variant="inverse" onPress={() => router.push(projectsRoute)}>
              View Projects
            </Button>
          </View>
        </View>
      </View>

      <View style={[styles.statsBand, { backgroundColor: theme.colors.bandDeep }]}>
        <View style={[styles.container, styles.statsGrid]}>
          {stats.map((stat) => (
            <StatCard invert key={stat.label} {...stat} />
          ))}
        </View>
      </View>

      <View style={[styles.section, styles.container]}>
        <SectionHeading
          eyebrow="What we build"
          title="Built around your brief."
          lead="One accountable team from first site visit to final handover."
        />
        <View style={styles.grid}>
          {services.map((service) => (
            <View key={service.slug} style={{ width: `${100 / serviceColumns}%`, padding: 6 }}>
              <ServiceCard {...service} onPress={() => {}} />
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.raisedSection, { backgroundColor: theme.colors.surfaceRaised }]}>
        <View style={[styles.section, styles.container]}>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects that stand the test of time."
            lead="From custom homes to commercial spaces, every build is planned for the details that matter."
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
            See all projects
          </Button>
        </View>
      </View>

      <View style={[styles.section, styles.container]}>
        <SectionHeading
          eyebrow="How we work"
          title="A better way to build."
          lead="Our four-step process keeps the work visible, decisions clear, and the schedule moving."
        />
        <View style={[styles.processGrid, isDesktop && styles.processGridWide]}>
          {processSteps.map((step, index) => (
            <View key={step.n} style={styles.processItem}>
              <ProcessStep step={step.n} title={step.title} last={index === processSteps.length - 1}>
                {step.desc}
              </ProcessStep>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.raisedSection, { backgroundColor: theme.colors.surfaceRaised }]}>
        <View style={[styles.section, styles.container]}>
          <SectionHeading eyebrow="Client stories" title="The handover is only the beginning." />
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
          title="Ready to start your project?"
          lead="Tell us what you’re planning. We’ll arrange a site visit and a clear, itemised quote."
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
          Licensed teams · Weekly progress updates · Snag-free handover
        </Text>
        <Check color={theme.colors.accentPress} size={20} />
      </View>
      <SiteFooter />
    </ScrollView>
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
