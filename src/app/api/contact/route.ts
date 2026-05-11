import { NextResponse } from 'next/server'
import { escapeMarkdown, validateContact } from '@/lib/validation'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	const ip = getClientIp(request)
	const { allowed, retryAfter } = rateLimit(`contact:${ip}`, 5, 60_000)
	if (!allowed) {
		return NextResponse.json(
			{ error: 'Too many requests' },
			{ status: 429, headers: { 'Retry-After': String(retryAfter) } },
		)
	}

	const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
	const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
	if (!token || !chatId) {
		return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
	}

	const parsed = validateContact(body)
	if (!parsed.ok) {
		return NextResponse.json({ error: parsed.error }, { status: 400 })
	}

	if (parsed.data.hp) {
		// Honeypot triggered — pretend success to avoid signalling bots
		return NextResponse.json({ success: true })
	}

	const text =
		`*New message from website*\n\n` +
		`*Name:* ${escapeMarkdown(parsed.data.name)}\n` +
		`*Phone:* ${escapeMarkdown(parsed.data.phone)}\n` +
		`*Message:* ${escapeMarkdown(parsed.data.message)}`

	try {
		const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: 'MarkdownV2',
				disable_web_page_preview: true,
			}),
		})

		if (!res.ok) {
			return NextResponse.json({ error: 'Delivery failed' }, { status: 502 })
		}

		return NextResponse.json({ success: true })
	} catch {
		return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
	}
}
