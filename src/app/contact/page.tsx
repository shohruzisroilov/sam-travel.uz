'use client'

import * as React from 'react'
import { useState } from 'react'
import { Phone, MapPin, Clock, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { Value as E164Number } from 'react-phone-number-input'
import { PhoneNumberInput } from '../../components/pages/contact/PhoneNumberInput'

export default function Contact() {
	const { t } = useLanguage()

	const [formData, setFormData] = useState<{
		name: string
		message: string
		tel?: E164Number
	}>({
		name: '',
		message: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Form submitted:', formData)
		setFormData({ name: '', message: '', tel: undefined })
	}

	const contactInfo = [
		{
			icon: <Phone className='w-6 h-6 text-white' />,
			title: t('phone'),
			lines: ['+998 90 167 37 44', '+998 66 233 12 96'],
		},
		{
			icon: <MapPin className='w-6 h-6 text-white' />,
			title: t('address'),
			lines: ["Shayhontohur ko'chasi", 'Tashkent, Uzbekistan'],
		},
		{
			icon: <Clock className='w-6 h-6 text-white' />,
			title: 'Business Hours',
			lines: ['Mon - Fri: 9:00 - 18:00', 'Sat - Sun: 10:00 - 16:00'],
		},
	]

	const maps = [
		{
			title: `${t('mainOffice')} - Tashkent`,
			src: 'https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d12279699.68253075!2d69.2912128!3d41.28768!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzU1LjgiTiA2OcKwMTUnNDkuMCJF!5e0!3m2!1suz!2s!4v1757525883059!5m2!1suz!2s',
		},
		{
			title: `${t('branchOffice')} - Samarkand`,
			src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1554015.6308099083!2d66.42802687616248!3d40.4711327222789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bf1d8fdeb89%3A0xae5a5169d41df098!2sSamTravel!5e0!3m2!1suz!2s!4v1757525964248!5m2!1suz!2s',
		},
	]

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section
				className='relative py-40 bg-center bg-cover text-center'
				style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
			>
				<div className='absolute inset-0 bg-black/60' />
				<div className='relative z-10 max-w-3xl mx-auto px-4'>
					<h1 className='text-3xl md:text-5xl font-bold text-white mb-4'>
						{t('contactTitle')}
					</h1>
					<p className='text-lg md:text-xl text-gray-200 mb-6 md:mb-8'>
						{t('contactSubtitle')}
					</p>
					<div className='w-20 h-1 bg-white mx-auto' />
				</div>
			</section>

			{/* Contact Form + Info */}
			<section className='py-16 sm:py-20'>
				<div className='max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>
					{/* Form */}
					<div className='bg-white rounded-xl shadow-sm p-6'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-6'>
							{t('sendMessage')}
						</h2>

						<form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
							<Input
								id='name'
								name='name'
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
								}
								placeholder={t('yourName')}
								className='h-12 px-4 focus:outline-none focus:ring-0 placeholder:text-gray-400'
								required
							/>

							<PhoneNumberInput
								value={formData.tel}
								onChange={val => setFormData({ ...formData, tel: val })}
								required
							/>

							<Textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={e =>
									setFormData({ ...formData, message: e.target.value })
								}
								placeholder={t('yourMessage')}
								className='min-h-[100px] px-4 py-3 focus:outline-none focus:ring-0 placeholder:text-gray-400'
								required
							/>

							<Button
								type='submit'
								className='w-full bg-[rgb(247,162,31)] hover:bg-[rgb(230,145,20)] text-white font-semibold flex items-center justify-center'
							>
								<Send className='w-5 h-5 mr-2' />
								{t('sendMessage')}
							</Button>
						</form>
					</div>

					{/* Contact Info + Maps */}
					<div>
						<h2 className='text-2xl font-semibold text-gray-800 mb-6'>
							{t('contactInfo')}
						</h2>
						<div className='space-y-6 mb-8'>
							{contactInfo.map((item, i) => (
								<div key={i} className='flex items-start space-x-4'>
									<div className='w-12 h-12 shrink-0 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
										{item.icon}
									</div>
									<div>
										<h3 className='font-semibold mb-1'>{item.title}</h3>
										{item.lines.map((line, j) => (
											<p key={j} className='text-gray-600 text-sm md:text-base'>
												{line}
											</p>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Maps */}
				<div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4'>
					{maps.map((map, i) => (
						<div key={i}>
							<h3 className='text-lg font-semibold mb-4'>{map.title}</h3>
							<div className='rounded-xl overflow-hidden shadow-md h-[250px] sm:h-[350px]'>
								<iframe
									src={map.src}
									width='100%'
									height='100%'
									style={{ border: 0 }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
								/>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
