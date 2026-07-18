import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Badge } from '@/components/badge'
import { PhotoPlaceholder } from '@/components/photo-placeholder'
import { type Project } from '@/data/projects'
import { useTheme } from '@/theme/theme'

export function ProjectCard({ project, onPress }: { project: Project; onPress?: () => void }) {
  const theme = useTheme()
  const tone =
    project.category === 'Commercial' ? 'info' : project.category === 'Renovation' ? 'success' : 'accent'
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${project.title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.colors.surfaceCard, borderColor: theme.colors.border },
        theme.shadows.sm,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.cover}>
        <PhotoPlaceholder label={project.title} style={styles.placeholder} />
        <View style={styles.badge}>
          <Badge tone={tone}>{project.category}</Badge>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={{ color: theme.colors.textStrong, fontFamily: theme.fonts.displayBold, fontSize: 20 }}>
          {project.title}
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fonts.body, fontSize: 14 }}>
          {project.location} · {project.year}
        </Text>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  cover: { aspectRatio: 4 / 3, position: 'relative' },
  placeholder: { height: '100%', minHeight: undefined },
  badge: { left: 12, position: 'absolute', top: 12 },
  body: { gap: 8, padding: 20 },
  pressed: { transform: [{ translateY: -2 }] },
})
