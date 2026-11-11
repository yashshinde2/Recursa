import { NextResponse } from 'next/server'

const NEEDS = new Set(['SaaS', 'Web', 'Mobile', 'IoT', 'Not sure'])
const BUDGETS = new Set(['Under $5k', '$5k–$15k', '$15k–$50k', '$50k+'])
const TIMELINES = new Set([
  'As soon as possible',
  'In 1–3 months',
  'In 3–6 months',
  'Just exploring',
])

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ error: 'A project brief is required.' }, { status: 400 })
  }

  const body = payload as Record<string, unknown>
  const need = isString(body.need) ? body.need.trim() : ''
  const budget = isString(body.budget) ? body.budget.trim() : ''
  const timeline = isString(body.timeline) ? body.timeline.trim() : ''
  const name = isString(body.name) ? body.name.trim() : ''
  const email = isString(body.email) ? body.email.trim() : ''
  const message = isString(body.message) ? body.message.trim() : ''

  if (!NEEDS.has(need) || !BUDGETS.has(budget) || !TIMELINES.has(timeline)) {
    return NextResponse.json({ error: 'Choose a valid option for need, budget, and timeline.' }, { status: 400 })
  }
  if (!name || name.length > 100) {
    return NextResponse.json({ error: 'Name is required and must be 100 characters or fewer.' }, { status: 400 })
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }
  if (!message || message.length > 3000) {
    return NextResponse.json({ error: 'Message is required and must be 3,000 characters or fewer.' }, { status: 400 })
  }

  // TODO: Send the validated project brief through the configured email provider.
  return NextResponse.json({ success: true })
}
