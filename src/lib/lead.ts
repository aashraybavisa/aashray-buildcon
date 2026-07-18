export type Lead = {
  form: 'quote' | 'contact'
  name: string
  email?: string
  phone?: string
  project?: string
  message?: string
}

export class LeadDeliveryNotConfiguredError extends Error {
  constructor() {
    super('Lead delivery is not configured')
  }
}

/** Sends JSON to the approved form-service or serverless endpoint configured at build time. */
export async function sendLead(lead: Lead) {
  const endpoint = process.env.EXPO_PUBLIC_LEAD_ENDPOINT
  if (!endpoint) throw new LeadDeliveryNotConfiguredError()

  const isGoogleAppsScript = endpoint.includes('script.google.com/macros/')
  const response = await fetch(endpoint, {
    method: 'POST',
    // A simple request avoids a CORS preflight when the receiver is a Google Apps Script web app.
    headers: { 'Content-Type': 'text/plain;charset=utf-8', Accept: 'application/json' },
    body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
    // Apps Script web apps do not reliably expose CORS response headers. The POST still reaches doPost(e),
    // but browsers intentionally hide the response body, so it cannot be inspected client-side.
    mode: isGoogleAppsScript ? 'no-cors' : undefined,
  })

  if (isGoogleAppsScript && response.type === 'opaque') return

  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null
  if (!response.ok || result?.ok === false) throw new Error('Unable to send your request right now')
}
