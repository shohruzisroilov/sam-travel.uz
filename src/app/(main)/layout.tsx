import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

import Footer from '@/components/layout/Footer'
import MobileStickyCTA from '@/components/layout/MobileStickyCTA'
import Navigation from '@/components/layout/Navigation'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Script from 'next/script'
import { OG_IMAGE, SITE_URL } from '@/lib/seo'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap',
})

const seoContent = {
	uz: {
		title: 'SamTravel - Yevropa sari yangi sarguzasht | TravelAgent',
		description:
			'🌍 SamTravel bilan Yevropaga ishonchli sayohat: viza, turpaketlar va individual xizmatlar. ✈️ Orzu qilmang – biz bilan boshlang!',
	},
	en: {
		title: 'SamTravel - New Adventures to Europe | TravelAgent',
		description:
			'🌍 Trusted travel to Europe with SamTravel: visas, packages, and personalized experiences. ✈️ Don’t just dream – start with us!',
	},
	ru: {
		title: 'SamTravel - Новые приключения в Европе | TravelAgent',
		description:
			'🌍 Путешествуйте в Европу с SamTravel: визы, турпакеты и индивидуальные услуги. ✈️ Не мечтайте – начинайте с нами!',
	},
}

export const metadata: Metadata = {
	title: seoContent.uz.title,
	description: seoContent.uz.description,
	keywords: [
		'SamTravel',
		'Yevropa sayohati',
		'Travel to Europe',
		'Путешествие в Европу',
		'Turpaketlar',
		'Viza xizmatlari',
		'TravelAgent',
		'Sayohat agentligi',
	],
	openGraph: {
		title: seoContent.uz.title,
		description: seoContent.uz.description,
		url: 'https://sam-travel.uz',
		siteName: 'SamTravel',
		images: [{ url: OG_IMAGE, alt: 'SamTravel' }],
		locale: 'uz_UZ',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: seoContent.uz.title,
		description: seoContent.uz.description,
		images: [OG_IMAGE],
	},
	alternates: {
		canonical: 'https://sam-travel.uz',
		languages: {
			'x-default': 'https://sam-travel.uz',
		},
	},
	verification: {
		google: 'LXxYKX5RI-jD0o5vJGHAAGOsJb70yykn1WsOh8jDbvw',
	},
	authors: [{ name: 'SamTravel Team', url: 'https://sam-travel.uz' }],
	creator: 'SamTravel',
	publisher: 'SamTravel',
	metadataBase: new URL(SITE_URL),
	category: 'travel',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
}

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'TravelAgency',
	name: 'SamTravel',
	url: SITE_URL,
	logo: `${SITE_URL}/images/logo.png`,
	image: `${SITE_URL}${OG_IMAGE}`,
	telephone: '+998555205537',
	email: 'info@sam-travel.uz',
	address: [
		{
			'@type': 'PostalAddress',
			streetAddress: 'Sharof Rashidov 99A',
			addressLocality: 'Tashkent',
			addressCountry: 'UZ',
		},
		{
			'@type': 'PostalAddress',
			streetAddress: 'Mahmud Koshgariy 66',
			addressLocality: 'Samarkand',
			addressCountry: 'UZ',
		},
	],
	sameAs: ['https://t.me/samtravel_uz', 'https://www.instagram.com/samtraveluz/'],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='uz' className={inter.variable}>
			<body className='antialiased bg-cream font-sans text-ink'>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{/* Google Analytics */}
				<Script
					src='https://www.googletagmanager.com/gtag/js?id=G-E5Y4HECMZ0'
					strategy='afterInteractive'
				/>
				<Script id='google-analytics' strategy='afterInteractive'>
					{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-E5Y4HECMZ0');
    `}
				</Script>
				<LanguageProvider>
					<div className='min-h-screen flex flex-col'>
						<Navigation />
						<main className='flex-grow'>{children}</main>
						<Footer />
					</div>
					<MobileStickyCTA />
				</LanguageProvider>
			</body>
		</html>
	)
}
