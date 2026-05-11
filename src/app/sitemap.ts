import type { MetadataRoute } from 'next'
import { DESTINATIONS } from '@/constants/destinations'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sam-travel.uz'

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()
	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
		{ url: `${BASE_URL}/destinations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
		{ url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
		{ url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
		{ url: `${BASE_URL}/yevropa`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
	]

	const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.map(d => ({
		url: `${BASE_URL}/destinations/${d.key}`,
		lastModified: now,
		changeFrequency: 'monthly',
		priority: 0.7,
	}))

	return [...staticRoutes, ...destinationRoutes]
}
