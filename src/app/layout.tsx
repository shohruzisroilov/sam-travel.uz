import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { LanguageProvider } from '@/contexts/LanguageContext'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

// Inter fontini qo'shish
const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'], // kerakli weightlar
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
		images: [
			{
				url: '/samtravel-og.jpg',
				width: 1200,
				height: 630,
				alt: 'SamTravel',
			},
		],
		locale: 'uz_UZ',
		type: 'website',
	},
	alternates: {
		canonical: 'https://sam-travel.uz',
		languages: {
			'uz-UZ': 'https://sam-travel.uz',
			'en-US': 'https://sam-travel.uz',
			'ru-RU': 'https://sam-travel.uz',
		},
	},
	verification: {
		google: 'LXxYKX5RI-jD0o5vJGHAAGOsJb70yykn1WsOh8jDbvw',
	},
	authors: [{ name: 'SamTravel Team', url: 'https://sam-travel.uz' }],
	creator: 'SamTravel',
	publisher: 'SamTravel',
	metadataBase: new URL('https://sam-travel.uz'),
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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='uz'>
			<body className={`${inter.variable} antialiased`}>
				<LanguageProvider>
					<div className='min-h-screen flex flex-col'>
						<Navigation />
						<main className='flex-grow'>{children}</main>
						<Footer />
					</div>
				</LanguageProvider>
			</body>
		</html>
	)
}
