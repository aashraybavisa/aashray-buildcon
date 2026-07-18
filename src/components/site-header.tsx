import { Menu, Phone } from 'lucide-react-native'
import { router, type Href } from 'expo-router'
import { useState } from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Logo } from '@/components/logo'
import { useResponsive } from '@/hooks/use-responsive'
import { useTheme } from '@/theme/theme'
import { company } from '@/data/company'
import { copy } from '@/data/content'

const navigation = [
  { label: copy.navigation.services, path: '/services' },
  { label: copy.navigation.projects, path: '/projects' },
  { label: copy.navigation.about, path: '/about' },
  { label: copy.navigation.contact, path: '/contact' },
] as const

/** Shared route header for marketing routes. */
export function SiteHeader() {
  const theme = useTheme()
  const { isNarrow } = useResponsive()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = (path: string) => {
    setMenuOpen(false)
    router.push(path as Href)
  }
  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: theme.colors.surfacePage, borderBottomColor: theme.colors.border },
      ]}
    >
      <View style={styles.content}>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={copy.navigation.homeLink}
          onPress={() => navigate('/')}
        >
          <Logo />
        </Pressable>
        {isNarrow ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.navigation.openMenu}
            onPress={() => setMenuOpen((open) => !open)}
            style={styles.menu}
          >
            <Menu color={theme.colors.textStrong} size={24} />
          </Pressable>
        ) : (
          <View style={styles.actions}>
            <View style={styles.desktopNav}>
              {navigation.map((item) => (
                <Pressable
                  key={item.path}
                  accessibilityRole="link"
                  onPress={() => navigate(item.path)}
                  style={styles.desktopLink}
                >
                  <Text
                    style={{ color: theme.colors.textBody, fontFamily: theme.fonts.bodyMedium, fontSize: 14 }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Button
              size="sm"
              variant="ghost"
              iconLeft={<Phone color={theme.colors.accentPress} size={15} />}
              onPress={() => Linking.openURL(company.phoneHref)}
            >
              {copy.common.callUs}
            </Button>
            <Button size="sm" onPress={() => navigate('/quote')}>
              {copy.common.quote}
            </Button>
          </View>
        )}
      </View>
      {isNarrow && menuOpen && (
        <View
          style={[
            styles.mobileMenu,
            { backgroundColor: theme.colors.surfacePage, borderTopColor: theme.colors.border },
          ]}
        >
          {[
            { label: copy.navigation.home, path: '/' },
            ...navigation,
            { label: copy.common.quote, path: '/quote' },
          ].map(({ label, path }) => {
            return (
              <Pressable
                accessibilityRole="link"
                key={label}
                onPress={() => navigate(path)}
                style={styles.mobileLink}
              >
                <Text
                  style={{
                    color: theme.colors.textStrong,
                    fontFamily: theme.fonts.displaySemibold,
                    fontSize: 17,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  bar: { borderBottomWidth: 1 },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 68,
    justifyContent: 'space-between',
    marginHorizontal: 'auto',
    maxWidth: 1200,
    paddingHorizontal: 24,
    width: '100%',
  },
  actions: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  desktopNav: { alignItems: 'center', flexDirection: 'row', gap: 4 },
  desktopLink: { paddingHorizontal: 8, paddingVertical: 10 },
  menu: { alignItems: 'center', height: 44, justifyContent: 'center', width: 44 },
  mobileMenu: { borderTopWidth: 1, paddingHorizontal: 24, paddingVertical: 8 },
  mobileLink: { paddingVertical: 14 },
})
