const WEBSITE_ID = '10832e37-7cb8-4886-baa7-f83f5706da8f'
const HOSTNAME = 'aashraybavisa.github.io'
const SCRIPT_ID = 'pr-status-umami'
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id']

type Payload = Record<string, unknown> & { url?: string; referrer?: string }
type Tracker = { track: (event?: string, data?: Record<string, string | number>) => Promise<unknown> }
type AnalyticsWindow = Window & {
  umami?: Tracker
  prStatusBeforeSend?: (type: string, payload: Payload) => Payload | false
}

export type PREvent = 'linkedin_click' | 'scroll_depth' | 'engaged_visit' | 'page_preferences'

function isPRPath(path: string) {
  return /^\/aashray-buildcon\/pr-status(?:\.html|\/)?$/.test(path)
}

export function canTrackPRPage() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    window.location.hostname === HOSTNAME &&
    isPRPath(window.location.pathname)
  )
}

/** Restrict the loaded tracker to this page, even after client-side navigation. */
export function filterPRPayload(type: string, payload: Payload): Payload | false {
  if (!canTrackPRPage() || type === 'identify' || !payload.url) return false
  try {
    const url = new URL(payload.url, window.location.origin)
    if (url.hostname !== HOSTNAME || !isPRPath(url.pathname)) return false
    const campaign = new URLSearchParams()
    campaignKeys.forEach((key) => {
      const value = url.searchParams.get(key)
      if (value) campaign.set(key, value)
    })
    url.search = campaign.toString()
    url.hash = ''
    let referrer = ''
    if (payload.referrer) {
      const source = new URL(payload.referrer, window.location.origin)
      referrer = source.origin === url.origin ? `${source.origin}${source.pathname}` : source.origin
    }
    const { id: _id, ...anonymousPayload } = payload
    return { ...anonymousPayload, url: `${url.pathname}${url.search}`, referrer, title: 'PR Status' }
  } catch {
    return false
  }
}

let initialization: Promise<boolean> | undefined

export function initializePRAnalytics(): Promise<boolean> {
  if (!canTrackPRPage()) return Promise.resolve(false)
  if (initialization) return initialization
  const browser = window as AnalyticsWindow
  browser.prStatusBeforeSend = filterPRPayload
  initialization = new Promise((resolve) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://cloud.umami.is/script.js'
    script.defer = true
    script.dataset.websiteId = WEBSITE_ID
    script.dataset.domains = HOSTNAME
    script.dataset.autoPageview = 'false'
    script.dataset.beforeSend = 'prStatusBeforeSend'
    script.dataset.doNotTrack = 'true'
    script.dataset.excludeHash = 'true'
    script.dataset.performance = 'true'
    script.dataset.tag = 'pr-status'
    script.onload = () => resolve(Boolean(browser.umami))
    // Blocked analytics must never interrupt rendering or navigation.
    script.onerror = () => resolve(false)
    document.head.appendChild(script)
  })
  return initialization
}

export async function trackPRPageview() {
  if ((await initializePRAnalytics()) && canTrackPRPage()) {
    await (window as AnalyticsWindow).umami?.track()
  }
}

export async function trackPREvent(event: PREvent, data?: Record<string, string | number>) {
  if ((await initializePRAnalytics()) && canTrackPRPage()) {
    await (window as AnalyticsWindow).umami?.track(event, data)
  }
}
