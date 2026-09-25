type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, limit = 5, windowMs = 60_000): { allowed: boolean; retryAfter: number } {
	const now = Date.now()
	if (buckets.size > 10_000) {
		for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k)
	}
	const bucket = buckets.get(key)
	if (!bucket || bucket.resetAt < now) {
		buckets.set(key, { count: 1, resetAt: now + windowMs })
		return { allowed: true, retryAfter: 0 }
	}
	if (bucket.count >= limit) {
		return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
	}
	bucket.count += 1
	return { allowed: true, retryAfter: 0 }
}

export function getClientIp(req: Request): string {
	const fwd = req.headers.get('x-forwarded-for')
	if (fwd) return fwd.split(',')[0].trim()
	return req.headers.get('x-real-ip') ?? 'unknown'
}
