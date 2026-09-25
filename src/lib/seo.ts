import type { Metadata } from 'next'
import uz from '@/locales/uz.json'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sam-travel.uz'
export const OG_IMAGE = '/images/hero-image1.jpg'

type PageSeo = {
	title: string
	description: string
	path: string
	image?: string
}

export function pageMetadata({ title, description, path, image = OG_IMAGE }: PageSeo): Metadata {
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			title,
			description,
			url: path,
			siteName: 'SamTravel',
			images: [{ url: image, alt: title }],
			locale: 'uz_UZ',
			type: 'website',
		},
		twitter: { card: 'summary_large_image', title, description, images: [image] },
	}
}

// Server components can't use the client-side language context, so SEO text uses the default (uz) locale.
export const seoText = uz
