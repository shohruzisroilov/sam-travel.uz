'use client'

import ReviewCard from '@/components/ReviewCard'

export default function CustomerReviews() {
	const customerReviews = [
		{
			name: 'John Smith',
			location: 'USA',
			rating: 5,
			review:
				'Amazing experience! The tour was perfectly organized and our guide was incredibly knowledgeable. Highly recommend this agency.',
			image:
				'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'Silk Road Adventure',
		},
		{
			name: 'Maria Garcia',
			location: 'Spain',
			rating: 5,
			review:
				'Unforgettable journey through Uzbekistan. Every detail was taken care of. The hotels were excellent and the food was delicious.',
			image:
				'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'Cultural Heritage Tour',
		},
		{
			name: 'David Wilson',
			location: 'UK',
			rating: 4,
			review:
				'Great service and professional team. The architecture tour was fascinating and well-planned. Will definitely book again.',
			image:
				'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'Architecture & History Tour',
		},
	]

	return (
		<section className='py-20 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl font-bold mb-4'>Customer Reviews</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
					<p className='text-xl text-gray-600'>What our clients say</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{customerReviews.map((review, i) => (
						<ReviewCard key={i} {...review} />
					))}
				</div>
			</div>
		</section>
	)
}
