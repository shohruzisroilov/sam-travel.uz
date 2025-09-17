'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MapPin, ArrowLeft } from 'lucide-react'
import { DESTINATIONS } from '@/constants/destinations'
import { Translations, useLanguage } from '@/contexts/LanguageContext'

export default function DestinationDetailsPage() {
	const params = useParams()
	const slug = params?.slug as string
	const { t } = useLanguage()

	const destination = DESTINATIONS.find(d => d.key === slug)

	if (!destination) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
				<h2 className='text-3xl font-bold text-gray-800 mb-4'>
					{t('destinationNotFound')}
				</h2>
				<p className='text-gray-600 mb-6'>
					{t('destinationNotFoundDescription')}
				</p>
				<Link
					href='/destinations'
					className='inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-200'
				>
					<ArrowLeft className='w-4 h-4' />
					<span>{t('backToDestinations')}</span>
				</Link>
			</div>
		)
	}

	return (
		<div className='bg-white'>
			{/* Hero Section */}
			<section className='relative h-[65vh] w-full'>
				<Image
					src={destination.mainImage}
					alt={destination.title}
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 flex flex-col items-center justify-center text-center px-4'>
					<h1 className='text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-3'>
						{t(destination.title)}
					</h1>
					<div className='flex items-center gap-2 text-orange-400'>
						<MapPin className='w-5 h-5' />
						<span className='text-lg capitalize'>
							{t(destination.category)}
						</span>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className='max-w-6xl mx-auto px-4 py-12'>
				<p className='text-gray-700 text-lg leading-relaxed mb-10 text-justify'>
					{t(destination.description)}
				</p>

				{/* Gallery */}
				{destination.gallery && destination.gallery.length > 0 && (
					<div>
						<h2 className='text-2xl font-bold text-gray-900 mb-6 border-l-4 border-orange-500 pl-3'>
							{t('gallery')}
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
							{destination.gallery.map((img, idx) => (
								<div
									key={idx}
									className='relative rounded-xl overflow-hidden shadow-lg group'
								>
									<Image
										src={img}
										alt={`${destination.title} image ${idx + 1}`}
										width={600}
										height={400}
										className='object-cover w-full h-60 transform group-hover:scale-105 transition duration-300'
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</section>
		</div>
	)
}
