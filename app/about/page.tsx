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
import Image from 'next/image'
import TeamCard from '@/components/sections/TeamCard'
import Counter from '@/components/ui/Counter'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const stats = [
	{ label: 'Happy Clients', value: 5320, suffix: '+' },
	{ label: 'Destinations', value: 55, suffix: '+' },
	{ label: 'Years Experience', value: 11, suffix: '+' },
	{ label: 'Expert Guides', value: 170, suffix: '+' },
]

const licenses = [
	{
		title: 'Tourism License',
		id: 'License #TL-2019-001234',
		extra: 'Valid until 2025',
		icon: FileText,
	},
	{
		title: 'Safety Certificate',
		id: 'Certificate #SC-2023-5678',
		extra: 'ISO 9001:2015 Certified',
		icon: Shield,
	},
	{
		title: 'Business Registration',
		id: 'Registration #BR-2019-9012',
		extra: 'Chamber of Commerce Member',
		icon: Building,
	},
]

const team = [
	{
		name: 'Sarah Johnson',
		role: 'Founder & CEO',
		image:
			'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
		description: 'Travel enthusiast with over 15 years of experience.',
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
	{
		name: 'Emma Rodriguez',
		role: 'Cultural Expert',
		image:
			'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
		description:
			'Specialist in cultural immersion and authentic local experiences.',
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
	{
		name: 'Bobur Tursunov',
		role: 'Marketing Director',
		image:
			'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
		description: 'Specialist in digital marketing and brand development',
	},
]

export default function About() {
	const { t } = useLanguage()
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative py-20 bg-gradient-to-r from-orange-400 to-orange-500 text-center'>
				<h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
					{t('aboutTitle')}
				</h1>
				<div className='w-24 h-1 bg-white mx-auto' />
			</section>

			{/* About Content */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4'>
					<div>
						<p className='text-lg text-gray-600 leading-relaxed mb-8'>
							{t('aboutDescription')}
						</p>
						<div className='space-y-8'>
							{[
								{ icon: Heart, title: t('ourMission'), text: t('missionText') },
								{ icon: Globe, title: t('ourVision'), text: t('visionText') },
							].map((item, i) => (
								<div key={i}>
									<h3 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2'>
										<item.icon className='w-6 h-6 text-orange-500' />
										<span>{item.title}</span>
									</h3>
									<p className='text-gray-600 leading-relaxed'>{item.text}</p>
								</div>
							))}
						</div>
					</div>
					<div className='relative'>
						<Image
							src='/images/about-image.jpg'
							alt='Travel team'
							className='rounded-lg shadow-xl w-full h-auto'
							width={400}
							height={400}
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-lg' />
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className='py-20 bg-gray-50' ref={ref}>
				<div className='max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 px-4'>
					{stats.map(stat => (
						<div key={stat.label} className='text-center'>
							<div className='text-4xl font-bold text-orange-500 mb-2'>
								<Counter
									to={stat.value}
									suffix={stat.suffix}
									start={isInView}
								/>
							</div>
							<div className='text-gray-600 font-medium'>{stat.label}</div>
						</div>
					))}
				</div>
			</section>

			{/* Licenses */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						{t('companyLicenses')}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{licenses.map(lic => (
							<div
								key={lic.title}
								className='bg-white p-8 rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.05)] text-center'
							>
								<div className='w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
									<lic.icon className='w-8 h-8 text-white' />
								</div>
								<h3 className='text-xl font-semibold text-gray-800 mb-4'>
									{lic.title}
								</h3>
								<p className='text-gray-600'>{lic.id}</p>
								<p className='text-sm text-gray-500 mt-2'>{lic.extra}</p>
							</div>
						))}
					</div>

					<p className='text-lg text-gray-600 max-w-3xl mx-auto mt-12'>
						{t('licenseText')}
					</p>
				</div>
			</section>

			{/* Management */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						{t('managementStructure')}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
					<p className='text-xl text-gray-600 max-w-3xl mx-auto mb-12'>
						{t('managementStructureDesc')}
					</p>

					<div className='relative'>
						<Swiper
							modules={[Navigation, Autoplay]}
							spaceBetween={30}
							slidesPerView={1}
							navigation={{
								prevEl: '.custom-prev',
								nextEl: '.custom-next',
							}}
							autoplay={{ delay: 4000 }}
							breakpoints={{
								0: { slidesPerView: 1 },
								640: { slidesPerView: 2 },
								768: { slidesPerView: 3 },
								1024: { slidesPerView: 4 },
							}}
						>
							{team.map(member => (
								<SwiperSlide key={member.name}>
									<TeamCard {...member} />
								</SwiperSlide>
							))}
						</Swiper>

						{/* Custom Buttons */}
						<button
							className='custom-prev absolute top-1/2 -translate-y-1/2 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10
  left-2 xl:left-[-40px]'
						>
							‹
						</button>
						<button
							className='custom-next absolute top-1/2 -translate-y-1/2 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10
  right-2 xl:right-[-40px]'
						>
							›
						</button>
					</div>
				</div>
			</section>

			{/* Team */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						{t('ourTeam')}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />
					<p className='text-xl text-gray-600 max-w-3xl mx-auto mb-12'>
						{t('ourTeamDesc')}
					</p>

					<div className='relative'>
						<Swiper
							modules={[Navigation, Autoplay]}
							spaceBetween={30}
							slidesPerView={1}
							navigation={{
								prevEl: '.team-prev',
								nextEl: '.team-next',
							}}
							autoplay={{ delay: 4000 }}
							breakpoints={{
								0: { slidesPerView: 1 },
								640: { slidesPerView: 2 },
								768: { slidesPerView: 3 },
								1024: { slidesPerView: 4 },
							}}
						>
							{team.map(member => (
								<SwiperSlide key={member.name}>
									<TeamCard {...member} />
								</SwiperSlide>
							))}
						</Swiper>

						{/* Custom Buttons */}
						<button className='team-prev absolute top-1/2 -translate-y-1/2 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 left-2 xl:left-[-40px]'>
							‹
						</button>
						<button className='team-next absolute top-1/2 -translate-y-1/2 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 right-2 xl:right-[-40px]'>
							›
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}
