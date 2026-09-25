import { pageMetadata, seoText } from '@/lib/seo'

export const metadata = pageMetadata({
	title: `${seoText.destinationsTitle} | SamTravel`,
	description: seoText.destinationsSubtitle,
	path: '/destinations',
})

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
	return children
}
