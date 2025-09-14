'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DestinationCardProps {
	title: string
	description: string
	image: string
	price?: string
	rating?: number
	href?: string
}

export default function DestinationCard({
	title,
	description,
	image,
	href = 'https://www.instagram.com/samtraveluz/',
}: DestinationCardProps) {
	const { t } = useLanguage()
	return (
		<div className='bg-white rounded-xl shadow-[0_0_5px_0_rgba(0,0,0,0.1),0_0_1px_0_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:-translate-y-2 group'>
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
					<h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
				</div>

				<p className='text-gray-600 mb-4 leading-relaxed line-clamp-2 h-[3rem]'>
					{description}
				</p>

				<div className='flex items-center justify-between '>
					<Link
						href={href}
						target='_blank'
						rel='noopener noreferrer'
						className='bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:from-orange-500 hover:to-orange-600 hover:scale-105'
					>
						{t('learnMore')}
					</Link>
				</div>
			</div>
		</div>
	)
}
