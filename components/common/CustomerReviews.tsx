'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import ReviewCard from './ReviewCard'

export default function CustomerReviews() {
	const customerReviews = [
		{
			name: 'Shohruh Isroilov',
			location: 'Tashkent, Uzbekistan',
			rating: 5,
			review:
				'Ajoyib tajriba! Sayohat mukammal tashkil etilgan va yo‘lboshchi juda bilimdon edi. Ushbu agentlikni tavsiya qilaman.',
			image:
				'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'O‘zbekistan Bo‘ylab Sayohat',
		},
		{
			name: 'Nilufar Tursunova',
			location: 'Samarkand, Uzbekistan',
			rating: 5,
			review:
				'Unutilmas sayohat! Har bir detal e’tiborga olingan. Mehmonxonalar a’lo darajada va taomlar juda mazali.',
			image:
				'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'Madaniyat va Tarix Turizmi',
		},
		{
			name: 'Alisher Karimov',
			location: 'Bukhara, Uzbekistan',
			rating: 4,
			review:
				'Jamoa juda professional va xizmatlar a’lo. Me’morchilik bo‘yicha ekskursiya juda qiziqarli va puxta rejalashtirilgan.',
			image:
				'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'Me’morchilik va Tarix Ekskursiyasi',
		},
		{
			name: 'Dilshod Mamatov',
			location: 'Toshkent, Uzbekistan',
			rating: 4,
			review:
				'Juda yoqimli tajriba, barcha narsalar tartibli va oson boshqariladi. Albatta yana buyurtma beraman.',
			image:
				'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'Shahar Bo‘ylab Ekskursiya',
		},
		{
			name: 'Gulnora Abdurahmonova',
			location: 'Fergana, Uzbekistan',
			rating: 4,
			review:
				'Juda yoqimli xizmatlar va mehmonxonalar qulay edi. Sayohat tashkilotchilari bilan ishlash rohatli bo‘ldi.',
			image:
				'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
			tour: 'Tabiat va Madaniyat Turizmi',
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

				<Swiper
					modules={[Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					loop
					breakpoints={{
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
				>
					{customerReviews.map((review, i) => (
						<SwiperSlide key={i}>
							<ReviewCard {...review} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	)
}
