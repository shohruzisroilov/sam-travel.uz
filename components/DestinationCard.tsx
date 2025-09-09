'use client'

import { useState } from 'react'
import { MapPin, Star } from 'lucide-react'

interface DestinationCardProps {
	title: string
	description: string
	image: string
	price?: string
	rating?: number
}

export default function DestinationCard({
	title,
	description,
	image,
	price,
	rating,
}: DestinationCardProps) {
	const [isHovered, setIsHovered] = useState(false)

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
				{rating && (
					<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1'>
						<Star className='w-4 h-4 text-yellow-400 fill-current' />
						<span className='text-sm font-medium'>{rating}</span>
					</div>
				)}
			</div>

			<div className='p-6'>
				<div className='flex items-center space-x-1 text-orange-500 mb-2'>
					<MapPin className='w-4 h-4' />
					<h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
				</div>

				<p className='text-gray-600 mb-4 leading-relaxed'>{description}</p>

				<div className='flex items-center justify-between'>
					{price && (
						<div className='text-2xl font-bold text-orange-500'>{price}</div>
					)}
					<button className='bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105'>
						Learn More
					</button>
				</div>
			</div>
		</div>
	)
}
