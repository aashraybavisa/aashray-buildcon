import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import {
  SplineSans_400Regular,
  SplineSans_500Medium,
  SplineSans_600SemiBold,
  SplineSans_700Bold,
} from '@expo-google-fonts/spline-sans'
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'

import { AnimatedSplashOverlay } from '@/components/animated-icon'
import { SiteHeader } from '@/components/site-header'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

SplashScreen.preventAutoHideAsync()

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    SplineSans_400Regular,
    SplineSans_500Medium,
    SplineSans_600SemiBold,
    SplineSans_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync()
  }, [fontError, fontsLoaded])

  if (!fontsLoaded && !fontError) return null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <View style={styles.root}>
        <Stack screenOptions={{ header: () => <SiteHeader />, headerShadowVisible: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="about" />
          <Stack.Screen name="contact" />
          <Stack.Screen name="projects" />
          <Stack.Screen name="quote" />
          <Stack.Screen name="services" />
          <Stack.Screen name="explore" />
        </Stack>
        <MobileBottomNav />
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({ root: { flex: 1 } })
