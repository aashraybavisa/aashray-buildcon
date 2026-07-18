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

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
  })

  if (!response.ok) throw new Error('Unable to send your request right now')
}
