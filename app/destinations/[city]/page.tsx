'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
	ArrowLeft,
	MapPin,
	Clock,
	Users,
	Star,
	Calendar,
	Camera,
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CityPage() {
	const params = useParams()
	const { t } = useLanguage()
	const [activeTab, setActiveTab] = useState('overview')

	// Mock data - in real app this would come from API/database
	const cityData = {
		samarkand: {
			name: t('samarkand'),
			description: t('samarkandDesc'),
			heroImage:
				'https://images.pexels.com/photos/16894590/pexels-photo-16894590.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
			rating: 4.8,
			highlights: [
				'Registan Square',
				'Shah-i-Zinda Necropolis',
				'Bibi-Khanym Mosque',
				'Ulugh Beg Observatory',
			],
			tours: [
				{
					name: 'Full Day City Tour',
					duration: '8 hours',
					price: '$89',
					includes: ['Guide', 'Transport', 'Lunch'],
				},
				{
					name: 'Historical Sites Tour',
					duration: '6 hours',
					price: '$69',
					includes: ['Guide', 'Entrance Fees'],
				},
			],
			gallery: [
				'https://images.pexels.com/photos/16894590/pexels-photo-16894590.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
				'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
				'https://images.pexels.com/photos/2884842/pexels-photo-2884842.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
			],
		},
		// Add more cities as needed
	}

	const city = cityData[params.city as keyof typeof cityData]

	if (!city) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-800 mb-4'>
						City not found
					</h1>
					<Link
						href='/destinations'
						className='text-orange-500 hover:text-orange-600'
					>
						Back to destinations
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative h-96 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center'
					style={{ backgroundImage: `url(${city.heroImage})` }}
				>
					<div className='absolute inset-0 bg-black/40' />
				</div>

				<div className='relative z-10 h-full flex items-center'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
						<Link
							href='/destinations'
							className='inline-flex items-center space-x-2 text-white mb-6 hover:text-orange-300 transition-colors'
						>
							<ArrowLeft className='w-5 h-5' />
							<span>Back to Destinations</span>
						</Link>

						<h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
							{city.name}
						</h1>
						<div className='flex items-center space-x-4 text-white'>
							<div className='flex items-center space-x-1'>
								<Star className='w-5 h-5 text-yellow-400 fill-current' />
								<span className='text-lg'>{city.rating}</span>
							</div>
							<div className='flex items-center space-x-1'>
								<MapPin className='w-5 h-5' />
								<span>Uzbekistan</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Navigation Tabs */}
			<section className='bg-white border-b border-gray-200 sticky top-16 z-40'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<nav className='flex space-x-8'>
						{[
							{ id: 'overview', label: 'Overview' },
							{ id: 'tours', label: 'Tours' },
							{ id: 'gallery', label: 'Gallery' },
						].map(tab => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
									activeTab === tab.id
										? 'border-orange-500 text-orange-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								{tab.label}
							</button>
						))}
					</nav>
				</div>
			</section>

			{/* Content */}
			<section className='py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{activeTab === 'overview' && (
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
							<div className='lg:col-span-2'>
								<h2 className='text-3xl font-bold text-gray-800 mb-6'>
									About {city.name}
								</h2>
								<p className='text-lg text-gray-600 leading-relaxed mb-8'>
									{city.description}. This ancient city offers visitors a unique
									glimpse into the rich history and culture of Central Asia.
									With its stunning Islamic architecture, bustling bazaars, and
									warm hospitality, it's a destination that leaves lasting
									memories.
								</p>

								<h3 className='text-2xl font-semibold text-gray-800 mb-4'>
									Must-See Highlights
								</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									{city.highlights.map((highlight, index) => (
										<div
											key={index}
											className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg'
										>
											<div className='w-2 h-2 bg-orange-500 rounded-full' />
											<span className='text-gray-700'>{highlight}</span>
										</div>
									))}
								</div>
							</div>

							<div className='lg:col-span-1'>
								<div className='bg-white rounded-xl shadow-lg p-6 sticky top-32'>
									<h3 className='text-xl font-semibold text-gray-800 mb-4'>
										Quick Facts
									</h3>
									<div className='space-y-4'>
										<div className='flex items-center justify-between'>
											<span className='text-gray-600'>Best time to visit</span>
											<span className='font-medium'>Apr - Oct</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='text-gray-600'>Average temperature</span>
											<span className='font-medium'>25°C</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='text-gray-600'>Language</span>
											<span className='font-medium'>Uzbek, Russian</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='text-gray-600'>Currency</span>
											<span className='font-medium'>UZS</span>
										</div>
									</div>

									<button className='w-full mt-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200'>
										Plan Your Visit
									</button>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'tours' && (
						<div>
							<h2 className='text-3xl font-bold text-gray-800 mb-8'>
								Available Tours
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
								{city.tours.map((tour, index) => (
									<div
										key={index}
										className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow'
									>
										<h3 className='text-xl font-semibold text-gray-800 mb-4'>
											{tour.name}
										</h3>
										<div className='space-y-3 mb-6'>
											<div className='flex items-center space-x-2 text-gray-600'>
												<Clock className='w-4 h-4' />
												<span>{tour.duration}</span>
											</div>
											<div className='flex items-center space-x-2 text-gray-600'>
												<Users className='w-4 h-4' />
												<span>Includes: {tour.includes.join(', ')}</span>
											</div>
										</div>
										<div className='flex items-center justify-between'>
											<div className='text-2xl font-bold text-orange-500'>
												{tour.price}
											</div>
											<button className='bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-200'>
												Book Now
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === 'gallery' && (
						<div>
							<h2 className='text-3xl font-bold text-gray-800 mb-8'>
								Photo Gallery
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{city.gallery.map((image, index) => (
									<div
										key={index}
										className='relative group overflow-hidden rounded-xl shadow-lg'
									>
										<img
											src={image}
											alt={`${city.name} ${index + 1}`}
											className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300'
										/>
										<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
											<Camera className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}
