'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Script from 'next/script'
import InstagramEmbed from './InstagramEmbed'
import { useLanguage } from '@/contexts/LanguageContext'

export default function InstagramSlider() {
	const { t } = useLanguage()

	const instagramVideos = [
		'https://www.instagram.com/reel/DMk1syOtj3b/?utm_source=ig_embed&utm_campaign=loading',
		'https://www.instagram.com/reel/DNTKrwmKznJ/?utm_source=ig_embed&utm_campaign=loading',
		'https://www.instagram.com/reel/DNI2RKfqqVD/?utm_source=ig_embed&utm_campaign=loading',
		'https://www.instagram.com/reel/DNSAeeGKUhg/?utm_source=ig_embed&utm_campaign=loading',
		'https://www.instagram.com/reel/DOJPxVrDC2i/?utm_source=ig_embed&utm_campaign=loading',
		'https://www.instagram.com/reel/DNI2RKfqqVD/?utm_source=ig_embed&utm_campaign=loading',
	]

	return (
		<section className='py-20 bg-gray-50'>
			<div className='max-w-6xl mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl font-bold mb-4'>{t('instagramTitle')}</h2>
					<div className='w-24 h-1 bg-[rgb(247,162,31)] mx-auto mb-6 rounded-full' />
					<p className='text-lg text-gray-600'>{t('instagramSubtitle')}</p>
				</div>

				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={30}
					slidesPerView={1}
					loop
					navigation
					breakpoints={{
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className='custom-swiper'
				>
					{instagramVideos.map((url, i) => (
						<SwiperSlide key={i}>
							<InstagramEmbed permalink={url} />
						</SwiperSlide>
					))}
				</Swiper>

				<Script
					src='https://www.instagram.com/embed.js'
					strategy='lazyOnload'
					onLoad={() => {
						if ((window as any).instgrm) {
							;(window as any).instgrm.Embeds.process()
						}
					}}
				/>
			</div>

			<style jsx global>{`
				.custom-swiper .swiper-pagination-bullet {
					background: rgba(247, 162, 31, 0.4);
				}
				.custom-swiper .swiper-pagination-bullet-active {
					background: rgb(247, 162, 31);
				}
				.custom-swiper .swiper-button-next,
				.custom-swiper .swiper-button-prev {
					color: rgb(247, 162, 31);
				}
			`}</style>
		</section>
	)
}
