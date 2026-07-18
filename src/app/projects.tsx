import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Badge } from '@/components/badge'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { Seo } from '@/components/seo'
import { SiteFooter } from '@/components/site-footer'
import { type ProjectCategory, projects } from '@/data/projects'
import { useResponsive } from '@/hooks/use-responsive'
import { useTheme } from '@/theme/theme'

const categories: ('All' | ProjectCategory)[] = ['All', 'Residential', 'Commercial', 'Renovation']
export default function ProjectsScreen() {
  const theme = useTheme()
  const { isNarrow } = useResponsive()
  const [selected, setSelected] = useState<(typeof categories)[number]>('All')
  const visibleProjects =
    selected === 'All' ? projects : projects.filter((project) => project.category === selected)
  return (
    <>
      <Seo
        title="Projects"
        description="Explore Aashray Buildcon’s residential, commercial, and renovation work across Saurashtra."
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 62 }}
        style={{ backgroundColor: theme.colors.surfacePage }}
      >
        <View style={styles.container}>
          <SectionHeading
            eyebrow="Our work"
            title="Built for the way you live and work."
            lead="A selection of residential, commercial, and renewal projects across Saurashtra."
          />
          <View style={styles.filters}>
            {categories.map((category) => (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: selected === category }}
                key={category}
                onPress={() => setSelected(category)}
              >
                <Badge solid={selected === category} tone={selected === category ? 'accent' : 'neutral'}>
                  {category}
                </Badge>
              </Pressable>
            ))}
          </View>
          <View style={styles.grid}>
            {visibleProjects.map((project) => (
              <View key={project.slug} style={{ flexBasis: isNarrow ? '100%' : '50%', padding: 6 }}>
                <ProjectCard project={project} />
              </View>
            ))}
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
    gap: 32,
    maxWidth: 1200,
    paddingHorizontal: 24,
    paddingVertical: 72,
    width: '100%',
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
})
