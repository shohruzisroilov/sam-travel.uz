'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import DestinationCard from '@/components/sections/DestinationCard'

export default function Destinations() {
	const { t } = useLanguage()
	const [searchTerm, setSearchTerm] = useState('')

	const destinations = [
		{
			title: t('samarkand'),
			description: t('samarkandDesc'),
			image:
				'https://images.pexels.com/photos/16894590/pexels-photo-16894590.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			price: '$299',
			rating: 4.8,
			category: 'historical',
		},
		{
			title: t('bukhara'),
			description: t('bukharaDesc'),
			image:
				'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			price: '$279',
			rating: 4.9,
			category: 'historical',
		},
		{
			title: t('khiva'),
			description: t('khivaDesc'),
			image:
				'https://images.pexels.com/photos/2884842/pexels-photo-2884842.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			price: '$259',
			rating: 4.7,
			category: 'historical',
		},
		{
			title: t('tashkent'),
			description: t('tashkentDesc'),
			image:
				'https://images.pexels.com/photos/3889847/pexels-photo-3889847.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			price: '$199',
			rating: 4.6,
			category: 'modern',
		},
		{
			title: t('paris'),
			description: t('parisDesc'),
			image:
				'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			price: '$899',
			rating: 4.9,
			category: 'international',
		},
		{
			title: t('tokyo'),
			description: t('tokyoDesc'),
			image:
				'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			price: '$1299',
			rating: 4.8,
			category: 'international',
		},
	]

	const filteredDestinations = destinations.filter(
		destination =>
			destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			destination.description.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative py-20 bg-gradient-to-r from-orange-400 to-orange-500'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
							{t('destinationsTitle')}
						</h1>
						<p className='text-xl text-orange-100 mb-8'>
							{t('destinationsSubtitle')}
						</p>
						<div className='w-24 h-1 bg-white mx-auto' />
					</div>
				</div>
			</section>

			{/* Search Section */}
			<section className='py-12 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-md mx-auto'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
							<input
								type='text'
								placeholder='Search destinations...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Destinations Grid */}
			<section className='py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{filteredDestinations.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{filteredDestinations.map((destination, index) => (
								<DestinationCard
									key={index}
									title={destination.title}
									description={destination.description}
									image={destination.image}
									price={destination.price}
									rating={destination.rating}
								/>
							))}
						</div>
					) : (
						<div className='text-center py-20'>
							<MapPin className='w-16 h-16 text-gray-400 mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-gray-600 mb-2'>
								No destinations found
							</h3>
							<p className='text-gray-500'>
								Try searching for a different destination
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Call to Action */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl font-bold text-gray-800 mb-4'>
						Can't Find Your Dream Destination?
					</h2>
					<p className='text-xl text-gray-600 mb-8'>
						Let us know where you want to go, and we'll create a custom
						itinerary just for you.
					</p>
					<a
						href='/contact'
						className='inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200'
					>
						<span>Contact Us</span>
					</a>
				</div>
			</section>
		</div>
	)
}
