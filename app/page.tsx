'use client'

import Link from 'next/link'
import { ArrowRight, Users, DollarSign, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import DestinationCard from '@/components/common/DestinationCard'
import CustomerReviews from '@/components/common/CustomerReviews'
import FAQ from '@/components/common/FAQ'

const FEATURES = [
	{
		icon: Users,
		key: 'expertGuides' as const,
		desc: 'expertGuidesDesc' as const,
	},
	{
		icon: DollarSign,
		key: 'bestPrices' as const,
		desc: 'bestPricesDesc' as const,
	},
	{ icon: Shield, key: 'safeTravel' as const, desc: 'safeTravelDesc' as const },
] as const

const DESTINATIONS = [
	{
		key: 'samarkand' as const,
		desc: 'samarkandDesc' as const,
		image: '/images/destinations/samarkand.jpg',
		rating: 4.8,
	},
	{
		key: 'bukhara' as const,
		desc: 'bukharaDesc' as const,
		image: '/images/destinations/bukhara.jpg',
		rating: 4.9,
	},
	{
		key: 'khiva' as const,
		desc: 'khivaDesc' as const,
		image: '/images/destinations/khiva.jpg',
		rating: 4.7,
	},
] as const

export default function Home() {
	const { t } = useLanguage()

	return (
		<>
			{/* Hero Section */}
			<section className='relative h-screen flex items-center justify-center overflow-hidden'>
				<div
					className='absolute inset-0 z-0 bg-cover bg-center'
					style={{ backgroundImage: "url('/images/hero-image.jpeg')" }}
				>
					<div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/30' />
				</div>

				<div className='relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl'>
					<h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
						{t('heroTitle')}
					</h1>
					<p className='text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed'>
						{t('heroSubtitle')}
					</p>
					<Link
						href='/destinations'
						className='inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-orange-500 hover:to-orange-600'
					>
						<span>{t('exploreButton')}</span>
						<ArrowRight className='w-5 h-5' />
					</Link>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							{t('whyChooseUs')}
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto' />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{FEATURES.map(({ icon: Icon, key, desc }, i) => (
							<div
								key={i}
								className='bg-white p-8 rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.05)] text-center hover:shadow-sm transition-shadow duration-300'
							>
								<div className='w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
									<Icon className='w-8 h-8 text-white' />
								</div>
								<h3 className='text-xl font-semibold text-gray-800 mb-4'>
									{t(key)}
								</h3>
								<p className='text-gray-600 leading-relaxed'>{t(desc)}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Destinations */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							{t('popularDestinations')}
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{t('destinationsSubtitle')}
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{DESTINATIONS.map(({ key, desc, image, rating }, i) => (
							<DestinationCard
								key={i}
								title={t(key)}
								description={t(desc)}
								image={image}
								rating={rating}
							/>
						))}
					</div>

					<div className='text-center mt-12'>
						<Link
							href='/destinations'
							className='inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 hover:from-orange-500 hover:to-orange-600'
						>
							<span>
								{t('viewAll')} {t('destinations')}
							</span>
							<ArrowRight className='w-5 h-5' />
						</Link>
					</div>
				</div>
			</section>

			{/* Imported sections */}
			<CustomerReviews />
			<FAQ />

			{/* Contact Call to Action */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl shadow-lg p-10 md:p-16 text-center text-white relative overflow-hidden'>
						<h2 className='text-4xl font-bold mb-4 relative z-10'>
							{t('getInTouch')}
						</h2>
						<p className='text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto relative z-10'>
							{t('contactDesc')}
						</p>

						<Link
							href='/contact'
							className='inline-flex items-center space-x-2 bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold transition-transform duration-200 hover:scale-105'
						>
							<span>{t('contactUs')}</span>
							<ArrowRight className='w-5 h-5' />
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
