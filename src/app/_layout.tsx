import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'

import { AnimatedSplashOverlay } from '@/components/animated-icon'
import { SiteHeader } from '@/components/site-header'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { LanguageProvider } from '@/i18n/language-provider'

SplashScreen.preventAutoHideAsync()

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular: require('@/assets/fonts/Inter_400Regular.ttf'),
    Inter_500Medium: require('@/assets/fonts/Inter_500Medium.ttf'),
    Inter_600SemiBold: require('@/assets/fonts/Inter_600SemiBold.ttf'),
    Inter_700Bold: require('@/assets/fonts/Inter_700Bold.ttf'),
    SplineSans_400Regular: require('@/assets/fonts/SplineSans_400Regular.ttf'),
    SplineSans_500Medium: require('@/assets/fonts/SplineSans_500Medium.ttf'),
    SplineSans_600SemiBold: require('@/assets/fonts/SplineSans_600SemiBold.ttf'),
    SplineSans_700Bold: require('@/assets/fonts/SplineSans_700Bold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync()
  }, [fontError, fontsLoaded])

  if (!fontsLoaded && !fontError) return null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LanguageProvider>
        <AnimatedSplashOverlay />
        <View style={styles.root}>
          <Stack screenOptions={{ header: () => <SiteHeader />, headerShadowVisible: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="about" />
            <Stack.Screen name="contact" />
            <Stack.Screen name="projects" />
            <Stack.Screen name="quote" />
            <Stack.Screen name="services" />
          </Stack>
          <MobileBottomNav />
        </View>
      </LanguageProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({ root: { flex: 1 } })
