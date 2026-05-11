type GtagFn = (...args: unknown[]) => void
type FbqFn = (...args: unknown[]) => void

declare global {
	interface Window {
		gtag?: GtagFn
		fbq?: FbqFn
	}
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
	if (typeof window === 'undefined') return
	window.gtag?.('event', name, params)
}

export function trackPixel(event: string, params: Record<string, unknown> = {}): void {
	if (typeof window === 'undefined') return
	window.fbq?.('track', event, params)
}
