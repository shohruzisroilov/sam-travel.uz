'use client'

import { useState } from 'react'
import { Calendar, Users, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TourCardProps {
	title: string
	description: string
	image: string
	duration: string
	price: string
	includes: string[]
	participants: number
}

export default function TourCard({
	title,
	description,
	image,
	duration,
	price,
	includes,
	participants,
}: TourCardProps) {
	const [isHovered, setIsHovered] = useState(false)
	const { t } = useLanguage()

	return (
		<div
			className='bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='relative overflow-hidden h-48'>
				<img
					src={image}
					alt={title}
					className={`w-full h-full object-cover transition-transform duration-300 ${
						isHovered ? 'scale-110' : 'scale-100'
					}`}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
				<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1'>
					<Users className='w-4 h-4 text-orange-500' />
					<span className='text-sm font-medium'>{participants}</span>
				</div>
			</div>

			<div className='p-6'>
				<div className='flex items-center space-x-1 text-orange-500 mb-2'>
					<MapPin className='w-4 h-4' />
					<h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
				</div>

				<p className='text-gray-600 mb-4 leading-relaxed'>{description}</p>

				<div className='flex items-center space-x-4 mb-4 text-sm text-gray-500'>
					<div className='flex items-center space-x-1'>
						<Clock className='w-4 h-4' />
						<span>{duration}</span>
					</div>
					<div className='flex items-center space-x-1'>
						<Calendar className='w-4 h-4' />
						<span>
							{t('includes')}: {includes.join(', ')}
						</span>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='text-2xl font-bold text-orange-500'>{price}</div>
					<button className='bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105'>
						{t('bookNow')}
					</button>
				</div>
			</div>
		</div>
	)
}
