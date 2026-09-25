import { pageMetadata, seoText } from '@/lib/seo'

export const metadata = pageMetadata({
	title: `${seoText.contactTitle} | SamTravel`,
	description: seoText.contactSubtitle,
	path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
	return children
}
