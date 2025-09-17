'use client'

import { useState, useMemo } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import DestinationCard from '@/components/common/DestinationCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/constants/categories'
import { DESTINATIONS } from '@/constants/destinations'

export default function Destinations() {
	const { t } = useLanguage()
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')

	const categories = useMemo(
		() =>
			CATEGORIES.map(c => ({
				...c,
				label: t(c.i18nKey) || c.fallback,
			})),
		[t]
	)

	// filterlangan destinatsiyalar
	const filteredDestinations = useMemo(
		() =>
			DESTINATIONS.filter(d => {
				const matchesSearch =
					d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					d.description.toLowerCase().includes(searchTerm.toLowerCase())

				const matchesCategory =
					selectedCategory === 'all' || d.category === selectedCategory

				return matchesSearch && matchesCategory
			}),
		[searchTerm, selectedCategory]
	)

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section
				className='relative py-40 bg-center bg-cover text-center'
				style={{
					backgroundImage: "url('/images/destinations-hero.jpg')",
				}}
			>
				<div className='absolute inset-0 bg-black/60' />

				<div className='relative z-10 max-w-4xl mx-auto px-4'>
					<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
						{t('destinationsTitle')}
					</h1>
					<div className='w-24 h-1 bg-white mx-auto' />
				</div>
			</section>

			{/* Search + Category Filter */}
			<section className='py-12 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-3xl mx-auto space-y-6'>
						{/* Search Input */}
						<div className='relative flex-1'>
							<Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(247,162,31)]' />
							<Input
								type='text'
								placeholder={t('searchPlaceholder') || 'Search destinations...'}
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='pl-12 h-12 rounded-full border-2 border-[rgb(247,162,31)] 
									focus-visible:ring-0 shadow-sm'
							/>
						</div>

						{/* Category Buttons */}
						<div className='flex flex-wrap gap-2 justify-center'>
							{categories.map(cat => {
								const isActive = selectedCategory === cat.key
								return (
									<Button
										key={cat.key}
										onClick={() => setSelectedCategory(cat.key)}
										className={`capitalize px-5 py-2 rounded-full transition-all duration-200 
											${
												isActive
													? 'bg-[rgb(247,162,31)] text-white shadow-md hover:bg-[rgb(220,140,20)]'
													: 'border border-[rgb(247,162,31)] text-[rgb(247,162,31)] hover:bg-[rgb(247,162,31)] hover:text-white'
											} 
										`}
										variant='ghost'
									>
										{cat.label}
									</Button>
								)
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Destinations Grid */}
			<section className='py-6'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{filteredDestinations.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{filteredDestinations.map(destination => (
								<DestinationCard
									key={destination.key}
									slug={destination.key}
									title={destination.title}
									description={destination.description}
									image={destination.mainImage}
								/>
							))}
						</div>
					) : (
						<div className='text-center py-20'>
							<MapPin className='w-16 h-16 text-gray-400 mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-gray-600 mb-2'>
								{t('noResultsTitle') || 'No destinations found'}
							</h3>
							<p className='text-gray-500'>
								{t('noResultsSubtitle') ||
									'Try searching for a different destination'}
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Call to Action */}
			<section className='py-20 bg-gray-50 text-center'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold text-gray-800 mb-4'>
						{t('ctaTitle') || "Can't Find Your Dream Destination?"}
					</h2>
					<p className='text-xl text-gray-600 mb-8'>
						{t('ctaSubtitle') ||
							"We'll create a custom itinerary just for you."}
					</p>
					<a
						href='/contact'
						className='inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200'
					>
						<span>{t('contactUs') || 'Contact Us'}</span>
					</a>
				</div>
			</section>
		</div>
	)
}
