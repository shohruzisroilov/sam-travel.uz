import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'TravelAgent - Your Gateway to Amazing Destinations',
	description:
		'Discover amazing destinations with our expert travel guides. Professional travel agency offering personalized experiences worldwide.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
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
