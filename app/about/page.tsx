'use client'

import {
	Users,
	Globe,
	Award,
	Heart,
	FileText,
	Building,
	Shield,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import TourCard from '@/components/TourCard'

export default function About() {
	const { t } = useLanguage()

	const stats = [
		{ label: 'Happy Clients', value: '5,000+' },
		{ label: 'Destinations', value: '50+' },
		{ label: 'Years Experience', value: '10+' },
		{ label: 'Expert Guides', value: '100+' },
	]

	const team = [
		{
			name: 'Sarah Johnson',
			role: 'Founder & CEO',
			image:
				'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
			description:
				'Travel enthusiast with over 15 years of experience in creating unforgettable journeys.',
		},
		{
			name: 'Michael Chen',
			role: 'Head of Operations',
			image:
				'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
			description:
				'Expert in logistics and ensuring every trip runs smoothly from start to finish.',
		},
		{
			name: 'Emma Rodriguez',
			role: 'Cultural Expert',
			image:
				'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
			description:
				'Specialist in cultural immersion and authentic local experiences.',
		},
	]

	const managementTeam = [
		{
			name: 'Akmal Karimov',
			role: 'CEO & Founder',
			image:
				'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
			description: 'Over 15 years of experience in tourism industry',
		},
		{
			name: 'Dilnoza Rashidova',
			role: 'Operations Director',
			image:
				'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
			description: 'Expert in tour operations and customer service',
		},
		{
			name: 'Bobur Tursunov',
			role: 'Marketing Director',
			image:
				'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
			description: 'Specialist in digital marketing and brand development',
		},
	]

	const previousTours = [
		{
			title: 'Silk Road Adventure 2023',
			description: 'Complete journey through historical Silk Road cities',
			image:
				'https://images.pexels.com/photos/16894590/pexels-photo-16894590.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			duration: '7 days',
			price: '$899',
			includes: ['Guide', 'Transport', 'Hotels', 'Meals'],
			participants: 25,
		},
		{
			title: 'Cultural Heritage Tour 2023',
			description: 'Deep dive into Uzbek culture and traditions',
			image:
				'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			duration: '5 days',
			price: '$599',
			includes: ['Guide', 'Transport', 'Cultural Activities'],
			participants: 18,
		},
		{
			title: 'Architecture & History Tour 2023',
			description: 'Explore magnificent Islamic architecture',
			image:
				'https://images.pexels.com/photos/2884842/pexels-photo-2884842.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
			duration: '4 days',
			price: '$449',
			includes: ['Guide', 'Transport', 'Museum Tickets'],
			participants: 20,
		},
	]
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative py-20 bg-gradient-to-r from-orange-400 to-orange-500'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
							{t('aboutTitle')}
						</h1>
						<div className='w-24 h-1 bg-white mx-auto' />
					</div>
				</div>
			</section>

			{/* About Content */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<p className='text-lg text-gray-600 leading-relaxed mb-8'>
								{t('aboutDescription')}
							</p>

							<div className='space-y-8'>
								<div>
									<h3 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2'>
										<Heart className='w-6 h-6 text-orange-500' />
										<span>{t('ourMission')}</span>
									</h3>
									<p className='text-gray-600 leading-relaxed'>
										{t('missionText')}
									</p>
								</div>

								<div>
									<h3 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2'>
										<Globe className='w-6 h-6 text-orange-500' />
										<span>{t('ourVision')}</span>
									</h3>
									<p className='text-gray-600 leading-relaxed'>
										{t('visionText')}
									</p>
								</div>
							</div>
						</div>

						<div className='relative'>
							<img
								src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
								alt='Travel team'
								className='rounded-lg shadow-xl w-full h-auto'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-lg' />
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
						{stats.map((stat, index) => (
							<div key={index} className='text-center'>
								<div className='text-4xl font-bold text-orange-500 mb-2'>
									{stat.value}
								</div>
								<div className='text-gray-600 font-medium'>{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Company Licenses */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							{t('companyLicenses')}
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='bg-white p-8 rounded-xl shadow-lg text-center'>
							<div className='w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
								<FileText className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold text-gray-800 mb-4'>
								Tourism License
							</h3>
							<p className='text-gray-600'>License #TL-2019-001234</p>
							<p className='text-sm text-gray-500 mt-2'>Valid until 2025</p>
						</div>

						<div className='bg-white p-8 rounded-xl shadow-lg text-center'>
							<div className='w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
								<Shield className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold text-gray-800 mb-4'>
								Safety Certificate
							</h3>
							<p className='text-gray-600'>Certificate #SC-2023-5678</p>
							<p className='text-sm text-gray-500 mt-2'>
								ISO 9001:2015 Certified
							</p>
						</div>

						<div className='bg-white p-8 rounded-xl shadow-lg text-center'>
							<div className='w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
								<Building className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold text-gray-800 mb-4'>
								Business Registration
							</h3>
							<p className='text-gray-600'>Registration #BR-2019-9012</p>
							<p className='text-sm text-gray-500 mt-2'>
								Chamber of Commerce Member
							</p>
						</div>
					</div>

					<div className='text-center mt-12'>
						<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
							{t('licenseText')}
						</p>
					</div>
				</div>
			</section>

			{/* Management Structure */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							{t('managementStructure')}
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Meet our experienced leadership team
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{managementTeam.map((member, index) => (
							<div
								key={index}
								className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
							>
								<div className='h-64 overflow-hidden'>
									<img
										src={member.image}
										alt={member.name}
										className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
									/>
								</div>
								<div className='p-6'>
									<h3 className='text-xl font-semibold text-gray-800 mb-2'>
										{member.name}
									</h3>
									<p className='text-orange-500 font-medium mb-4'>
										{member.role}
									</p>
									<p className='text-gray-600 leading-relaxed'>
										{member.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							{t('ourTeam')}
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Our dedicated staff members who make every journey special
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{team.map((member, index) => (
							<div
								key={index}
								className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
							>
								<div className='h-64 overflow-hidden'>
									<img
										src={member.image}
										alt={member.name}
										className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
									/>
								</div>
								<div className='p-6'>
									<h3 className='text-xl font-semibold text-gray-800 mb-2'>
										{member.name}
									</h3>
									<p className='text-orange-500 font-medium mb-4'>
										{member.role}
									</p>
									<p className='text-gray-600 leading-relaxed'>
										{member.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Previous Tours */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							{t('previousToursSection')}
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Some of our successful tours from the past year
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{previousTours.map((tour, index) => (
							<TourCard
								key={index}
								title={tour.title}
								description={tour.description}
								image={tour.image}
								duration={tour.duration}
								price={tour.price}
								includes={tour.includes}
								participants={tour.participants}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
