import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protect /admin and GET /api/contacts with Basic Auth.
// Set ADMIN_USER and ADMIN_PASS in your environment.

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	const protectedPaths = ['/admin', '/api/contacts']
	const needsAuth = protectedPaths.some(p => pathname.startsWith(p))
	if (!needsAuth) return NextResponse.next()

	const auth = req.headers.get('authorization')
	if (!auth || !auth.startsWith('Basic ')) {
		return new Response('Authentication required', {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
		})
	}

	const b64 = auth.split(' ')[1]
	const [user, pass] = Buffer.from(b64, 'base64').toString().split(':')

	const ADMIN_USER = process.env.ADMIN_USER || 'admin'
	const ADMIN_PASS = process.env.ADMIN_PASS || 'password'

	if (user === ADMIN_USER && pass === ADMIN_PASS) {
		return NextResponse.next()
	}

	return new Response('Forbidden', { status: 403 })
}

export const config = {
	matcher: ['/admin/:path*', '/api/contacts'],
}
