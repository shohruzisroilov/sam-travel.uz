'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Autoplay } from 'swiper/modules'

import { useLanguage } from '@/contexts/LanguageContext'
import TeamCard from '@/components/common/TeamCard'
import Counter from '@/components/ui/Counter'

import { Heart, Globe } from 'lucide-react'
import { stats, licenses, team, managementTeam } from '@/constants/about'

export default function About() {
	const { t } = useLanguage()
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section
				className='relative py-40 bg-center bg-cover text-center'
				style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
			>
				<div className='absolute inset-0 bg-black/60' />
				<div className='relative z-10 max-w-3xl mx-auto px-4'>
					<h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
						{t('aboutTitle')}
					</h1>
					<p className='text-lg md:text-xl text-gray-200 leading-relaxed mb-8'>
						{t('aboutHeroDesc')}
					</p>
					<div className='w-24 h-1 bg-white mx-auto' />
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

			{/* Management */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						{t('managementStructure')}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />

					<div className='relative'>
						<Swiper
							modules={[Navigation, Autoplay]}
							spaceBetween={30}
							slidesPerView={1}
							navigation={{
								prevEl: '.management-prev',
								nextEl: '.management-next',
							}}
							autoplay={{ delay: 4000 }}
							breakpoints={{
								640: { slidesPerView: 2 },
								768: { slidesPerView: 3 },
								1024: { slidesPerView: 4 },
							}}
						>
							{managementTeam.map(member => (
								<SwiperSlide key={member.name}>
									<TeamCard {...member} />
								</SwiperSlide>
							))}
						</Swiper>

						{/* RESPONSIVE BUTTONS */}
						<button className='management-prev absolute top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 transition text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 left-2 xl:-left-6 2xl:-left-10'>
							‹
						</button>
						<button className='management-next absolute top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 transition text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 right-2 xl:-right-6 2xl:-right-10'>
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

						{/* RESPONSIVE BUTTONS */}
						<button className='team-prev absolute top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 transition text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 left-2 xl:-left-6 2xl:-left-10'>
							‹
						</button>
						<button className='team-next absolute top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 transition text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 right-2 xl:-right-6 2xl:-right-10'>
							›
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}
