'use client'

import { Translations, useLanguage } from '@/contexts/LanguageContext'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface DestinationCardProps {
	slug: string
	title: keyof Translations
	description: keyof Translations
	image: string
}

export default function DestinationCard({
	slug,
	title,
	description,
	image,
}: DestinationCardProps) {
	
	const { t } = useLanguage()

	return (
		<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 group'>
			{/* Image Section */}
			<div className='relative h-48 overflow-hidden'>
				<Image
					src={image}
					alt={title}
					fill
					className='object-cover transition-transform duration-300 group-hover:scale-110'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					priority
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
			</div>

			{/* Content */}
			<div className='p-6'>
				<div className='flex items-center space-x-1 text-orange-500 mb-2'>
					<MapPin className='w-4 h-4' />
					<h3 className='text-lg font-semibold text-gray-800'>{t(title)}</h3>
				</div>

				<p className='text-gray-600 mb-4 leading-relaxed line-clamp-2 h-[3rem]'>
					{t(description)}
				</p>

				<Link
					href={`/destinations/${slug}`}
					className='inline-block bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:from-orange-500 hover:to-orange-600 hover:scale-105'
				>
					{t('learnMore')}
				</Link>
			</div>
		</div>
	)
}
