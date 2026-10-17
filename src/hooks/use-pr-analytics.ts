import { useCallback, useEffect, useRef } from 'react'
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import { canTrackPRPage, initializePRAnalytics, trackPREvent, trackPRPageview } from '@/lib/pr-analytics'

/** The page scrolls inside a React Native ScrollView, rather than the browser window. */
export function usePRAnalytics(appearance: string, language: string) {
  const viewed = useRef(false)
  const lastPreferences = useRef('')
  const dimensions = useRef({ height: 0, contentHeight: 0, offset: 0 })
  const scrollMilestones = useRef(new Set<number>())

  const reportScroll = useCallback(() => {
    if (!canTrackPRPage() || document.visibilityState !== 'visible') return
    const { height, contentHeight, offset } = dimensions.current
    if (height <= 0 || contentHeight <= 0) return
    const percent = Math.min(100, Math.round(((offset + height) / contentHeight) * 100))
    for (const depth of [25, 50, 75, 100]) {
      if (percent >= depth && !scrollMilestones.current.has(depth)) {
        scrollMilestones.current.add(depth)
        void trackPREvent('scroll_depth', { percent: depth }).catch(() => {})
      }
    }
  }, [])

  useEffect(() => {
    if (!canTrackPRPage()) return
    let active = true
    void initializePRAnalytics()
      .then(async (ready) => {
        if (!ready || !active || viewed.current) return
        viewed.current = true
        await trackPRPageview()
        reportScroll()
      })
      .catch(() => {})

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest('a[href]')
      const href = link?.getAttribute('href')
      if (href && new URL(href, window.location.origin).hostname === 'www.linkedin.com') {
        void trackPREvent('linkedin_click').catch(() => {})
      }
    }
    let seconds = 0
    const timer = window.setInterval(() => {
      if (!canTrackPRPage() || document.visibilityState !== 'visible' || !document.hasFocus()) return
      seconds += 1
      if ([15, 30, 60, 120, 300].includes(seconds)) {
        void trackPREvent('engaged_visit', { seconds }).catch(() => {})
      }
    }, 1000)
    document.addEventListener('click', onClick, true)
    document.addEventListener('visibilitychange', reportScroll)
    return () => {
      active = false
      window.clearInterval(timer)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('visibilitychange', reportScroll)
    }
  }, [reportScroll])

  useEffect(() => {
    const preferences = `${appearance}:${language}`
    if (canTrackPRPage() && lastPreferences.current !== preferences) {
      lastPreferences.current = preferences
      void trackPREvent('page_preferences', { appearance, language }).catch(() => {})
    }
  }, [appearance, language])

  return {
    onScroll: useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
        dimensions.current = {
          offset: contentOffset.y,
          contentHeight: contentSize.height,
          height: layoutMeasurement.height,
        }
        reportScroll()
      },
      [reportScroll],
    ),
    onLayout: useCallback(
      (event: LayoutChangeEvent) => {
        dimensions.current.height = event.nativeEvent.layout.height
        reportScroll()
      },
      [reportScroll],
    ),
    onContentSizeChange: useCallback(
      (_width: number, height: number) => {
        dimensions.current.contentHeight = height
        reportScroll()
      },
      [reportScroll],
    ),
  }
}
