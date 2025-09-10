'use client'

import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

interface ReviewCardProps {
	name: string
	location: string
	rating: number
	review: string
	image: string
	tour: string
}

export default function ReviewCard({
	name,
	location,
	rating,
	review,
	image,
	tour,
}: ReviewCardProps) {
	return (
		<div className='min-h-[230px] bg-white rounded-2xl  hover:shadow-md transition-all duration-300 p-6 transform hover:-translate-y-1 cursor-pointer'>
			{/* Header */}
			<div className='flex items-center mb-5'>
				<Image
					src={image}
					alt={name}
					width={48}
					height={48}
					className='w-12 h-12 rounded-full object-cover mr-4'
				/>
				<div>
					<h4 className='font-semibold text-gray-800'>{name}</h4>
					<p className='text-sm text-gray-500'>{location}</p>
				</div>
				<div className='ml-auto flex items-center space-x-1'>
					{Array.from({ length: 5 }, (_, i) => (
						<Star
							key={i}
							className={`w-4 h-4 ${
								i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
							}`}
						/>
					))}
				</div>
			</div>

			{/* Review */}
			<div className='relative'>
				<Quote className='absolute -top-3 -left-2 w-10 h-10 text-orange-200 opacity-50' />
				<p className='text-gray-600 leading-relaxed pl-6 line-clamp-4'>
					{review}
				</p>
			</div>
		</div>
	)
}
