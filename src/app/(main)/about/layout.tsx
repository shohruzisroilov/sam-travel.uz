import { pageMetadata, seoText } from '@/lib/seo'

export const metadata = pageMetadata({
	title: `${seoText.aboutTitle} | SamTravel`,
	description: seoText.footerAbout,
	path: '/about',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
	return children
}
