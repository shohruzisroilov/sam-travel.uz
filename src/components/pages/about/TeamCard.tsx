'use client'

import Image from 'next/image'

interface TeamCardProps {
	image: string
	name: string
	role: string
	description: string
}

const TeamCard = ({ image, name, role, description }: TeamCardProps) => {
	return (
		<div className='h-[450px] border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-72'>
			<div className='h-64 overflow-hidden'>
				<Image
					src={image}
					alt={name}
					className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
					width={400}
					height={400}
				/>
			</div>
			<div className='p-6'>
				<h3 className='text-xl font-semibold text-gray-800 mb-2'>{name}</h3>
				<p className='text-orange-500 font-medium mb-4'>{role}</p>
				<p className='text-gray-600 leading-relaxed'>{description}</p>
			</div>
		</div>
	)
}

export default TeamCard
