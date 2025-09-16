'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useLanguage } from '@/contexts/LanguageContext'

import { stats, team, managementTeam } from '@/constants/about'
import Counter from '@/components/pages/about/Counter'
import TeamCard from '@/components/pages/about/TeamCard'

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
				<div className='relative z-10 max-w-5xl mx-auto px-4'>
					<h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
						{t('aboutTitle')}
					</h1>
					{/* <p className='text-lg md:text-xl text-gray-200 leading-relaxed mb-8'>
						{t('aboutHeroDesc')}
					</p> */}
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

					<Swiper
						modules={[Autoplay, Navigation, Pagination]}
						spaceBetween={30}
						slidesPerView={1}
						loop
						autoplay={{ delay: 4000, disableOnInteraction: false }}
						navigation
						// pagination={{ clickable: true }}
						breakpoints={{
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
							1280: { slidesPerView: 4 },
						}}
						className='custom-swiper'
					>
						{managementTeam.map(member => (
							<SwiperSlide key={member.name}>
								<TeamCard {...member} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>

			{/* Team */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						{t('ourTeam')}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />

					<Swiper
						modules={[Autoplay, Navigation, Pagination]}
						spaceBetween={30}
						slidesPerView={1}
						loop
						autoplay={{ delay: 4000, disableOnInteraction: false }}
						navigation
						// pagination={{ clickable: true }}
						breakpoints={{
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
							1280: { slidesPerView: 4 },
						}}
						className='custom-swiper'
					>
						{team.map(member => (
							<SwiperSlide key={member.name}>
								<TeamCard {...member} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>

			{/* Swiper custom CSS */}
			<style jsx global>{`
				/* Pagination dots ranglari */
				.custom-swiper .swiper-pagination-bullet {
					background: rgba(247, 162, 31, 0.4);
				}
				.custom-swiper .swiper-pagination-bullet-active {
					background: rgb(247, 162, 31);
				}

				/* Navigation tugmalari */
				.custom-swiper .swiper-button-next,
				.custom-swiper .swiper-button-prev {
					color: rgb(247, 162, 31);
				}
			`}</style>
		</div>
	)
}
