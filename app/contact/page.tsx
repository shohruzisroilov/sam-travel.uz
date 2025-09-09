'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import ReviewCard from '@/components/ReviewCard'

export default function Contact() {
	const { t } = useLanguage()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle form submission here
		console.log('Form submitted:', formData)
		// Reset form
		setFormData({ name: '', email: '', message: '' })
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

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
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative py-20 bg-gradient-to-r from-orange-400 to-orange-500'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
							{t('contactTitle')}
						</h1>
						<p className='text-xl text-orange-100 mb-8'>
							{t('contactSubtitle')}
						</p>
						<div className='w-24 h-1 bg-white mx-auto' />
					</div>
				</div>
			</section>

			{/* Contact Form and Info */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
						{/* Contact Form */}
						<div className='bg-white rounded-xl shadow-lg p-8'>
							<h2 className='text-2xl font-semibold text-gray-800 mb-6'>
								{t('sendMessage')}
							</h2>

							<form onSubmit={handleSubmit} className='space-y-6'>
								<div>
									<label
										htmlFor='name'
										className='block text-sm font-medium text-gray-700 mb-2'
									>
										{t('name')}
									</label>
									<input
										type='text'
										id='name'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200'
										placeholder='Your full name'
									/>
								</div>

								<div>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-700 mb-2'
									>
										{t('email')}
									</label>
									<input
										type='email'
										id='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										required
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200'
										placeholder='your@email.com'
									/>
								</div>

								<div>
									<label
										htmlFor='message'
										className='block text-sm font-medium text-gray-700 mb-2'
									>
										{t('message')}
									</label>
									<textarea
										id='message'
										name='message'
										rows={5}
										value={formData.message}
										onChange={handleChange}
										required
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200'
										placeholder='Tell us about your travel plans...'
									/>
								</div>

								<button
									type='submit'
									className='w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2'
								>
									<Send className='w-5 h-5' />
									<span>{t('sendMessage')}</span>
								</button>
							</form>
						</div>

						{/* Contact Information */}
						<div className='space-y-8'>
							<div>
								<h2 className='text-2xl font-semibold text-gray-800 mb-6'>
									{t('contactInfo')}
								</h2>

								<div className='mb-8'>
									<h3 className='text-lg font-semibold text-gray-800 mb-4'>
										{t('mainOffice')}
									</h3>
									<div className='space-y-6'>
										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
												<Phone className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='font-semibold text-gray-800 mb-1'>
													{t('phone')}
												</h3>
												<p className='text-gray-600'>+998 90 123 45 67</p>
												<p className='text-gray-600'>+998 71 123 45 67</p>
											</div>
										</div>

										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
												<Mail className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='font-semibold text-gray-800 mb-1'>
													Email
												</h3>
												<p className='text-gray-600'>info@travelagent.uz</p>
												<p className='text-gray-600'>support@travelagent.uz</p>
											</div>
										</div>

										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
												<MapPin className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='font-semibold text-gray-800 mb-1'>
													{t('address')}
												</h3>
												<p className='text-gray-600'>Amir Temur Avenue 42</p>
												<p className='text-gray-600'>
													Tashkent 100084, Uzbekistan
												</p>
											</div>
										</div>

										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
												<Clock className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='font-semibold text-gray-800 mb-1'>
													Business Hours
												</h3>
												<p className='text-gray-600'>
													Mon - Fri: 9:00 AM - 6:00 PM
												</p>
												<p className='text-gray-600'>
													Sat - Sun: 10:00 AM - 4:00 PM
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Branch Office */}
								<div>
									<h3 className='text-lg font-semibold text-gray-800 mb-4'>
										{t('branchOffice')}
									</h3>
									<div className='space-y-4'>
										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
												<Phone className='w-6 h-6 text-white' />
											</div>
											<div>
												<h4 className='font-semibold text-gray-800 mb-1'>
													{t('phone')}
												</h4>
												<p className='text-gray-600'>+998 65 224 56 78</p>
											</div>
										</div>

										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
												<MapPin className='w-6 h-6 text-white' />
											</div>
											<div>
												<h4 className='font-semibold text-gray-800 mb-1'>
													{t('address')}
												</h4>
												<p className='text-gray-600'>Registan Square 15</p>
												<p className='text-gray-600'>
													Samarkand 140100, Uzbekistan
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Google Maps */}
							<div className='space-y-6'>
								<div>
									<h3 className='text-lg font-semibold text-gray-800 mb-4'>
										{t('mainOffice')} - Tashkent
									</h3>
									<div className='rounded-xl overflow-hidden shadow-lg'>
										<iframe
											src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzU4LjIiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890'
											width='100%'
											height='250'
											style={{ border: 0 }}
											allowFullScreen
											loading='lazy'
											referrerPolicy='no-referrer-when-downgrade'
										/>
									</div>
								</div>

								<div>
									<h3 className='text-lg font-semibold text-gray-800 mb-4'>
										{t('branchOffice')} - Samarkand
									</h3>
									<div className='rounded-xl overflow-hidden shadow-lg'>
										<iframe
											src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.5!2d66.9749!3d39.6542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM5JzE1LjEiTiA2NsKwNTgnMjkuNiJF!5e0!3m2!1sen!2s!4v1234567890'
											width='100%'
											height='250'
											style={{ border: 0 }}
											allowFullScreen
											loading='lazy'
											referrerPolicy='no-referrer-when-downgrade'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Customer Reviews */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold text-gray-800 mb-4'>
							{t('customerReviews')}
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
						<p className='text-xl text-gray-600'>{t('whatClientsSay')}</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{customerReviews.map((review, index) => (
							<ReviewCard
								key={index}
								name={review.name}
								location={review.location}
								rating={review.rating}
								review={review.review}
								image={review.image}
								tour={review.tour}
							/>
						))}
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold text-gray-800 mb-4'>
							Frequently Asked Questions
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto' />
					</div>

					<div className='max-w-3xl mx-auto space-y-6'>
						{[
							{
								question: 'How far in advance should I book my trip?',
								answer:
									'We recommend booking at least 2-3 months in advance for international destinations and 3-4 weeks for domestic trips to ensure availability and better prices.',
							},
							{
								question: 'Do you provide travel insurance?',
								answer:
									'Yes, we offer comprehensive travel insurance packages that cover medical emergencies, trip cancellations, and lost luggage.',
							},
							{
								question: 'Can you arrange custom itineraries?',
								answer:
									'Absolutely! We specialize in creating personalized travel experiences tailored to your preferences, budget, and interests.',
							},
							{
								question: 'What payment methods do you accept?',
								answer:
									'We accept all major credit cards, bank transfers, and offer flexible payment plans for larger bookings.',
							},
						].map((faq, index) => (
							<div key={index} className='bg-white rounded-lg shadow-md p-6'>
								<h3 className='font-semibold text-gray-800 mb-3'>
									{faq.question}
								</h3>
								<p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
