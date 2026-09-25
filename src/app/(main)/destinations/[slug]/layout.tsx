import type { Metadata } from 'next'
import { DESTINATIONS } from '@/constants/destinations'
import { pageMetadata, seoText } from '@/lib/seo'

type Params = Promise<{ slug: string }>

// Only the known destinations exist; any other slug is a real 404
export const dynamicParams = false

export function generateStaticParams() {
	return DESTINATIONS.map(d => ({ slug: d.key }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { slug } = await params
	const destination = DESTINATIONS.find(d => d.key === slug)
	if (!destination) return {}
	return pageMetadata({
		title: `${seoText[destination.title]} | SamTravel`,
		description: seoText[destination.description],
		path: `/destinations/${destination.key}`,
		image: destination.mainImage,
	})
}

export default function DestinationLayout({ children }: { children: React.ReactNode }) {
	return children
}
