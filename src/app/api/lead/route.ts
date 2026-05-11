import { NextResponse } from 'next/server'
import { validateLead } from '@/lib/validation'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	const ip = getClientIp(request)
	const { allowed, retryAfter } = rateLimit(`lead:${ip}`, 5, 60_000)
	if (!allowed) {
		return NextResponse.json(
			{ error: 'Too many requests' },
			{ status: 429, headers: { 'Retry-After': String(retryAfter) } },
		)
	}

	const endpoint = process.env.BITRIX_WEBHOOK_URL
	if (!endpoint) {
		return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
	}

	const parsed = validateLead(body)
	if (!parsed.ok) {
		return NextResponse.json({ error: parsed.error }, { status: 400 })
	}

	const payload = {
		fields: {
			TITLE: 'website classic',
			NAME: parsed.data.name,
			PHONE: [{ VALUE: parsed.data.phone, VALUE_TYPE: 'WORK' }],
			SOURCE_ID: 'WEB',
			ASSIGNED_BY_ID: Number(process.env.BITRIX_ASSIGNED_BY_ID ?? 11),
		},
		params: { REGISTER_SONET_EVENT: 'Y' },
	}

	try {
		const res = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})

		const result = await res.json()

		if (!res.ok || result.error) {
			return NextResponse.json({ error: 'Lead creation failed' }, { status: 502 })
		}

		return NextResponse.json({ success: true, lead: result.result })
	} catch {
		return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
	}
}
