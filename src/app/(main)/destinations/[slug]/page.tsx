'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MapPin, ArrowLeft, Maximize2 } from 'lucide-react'
import { DESTINATIONS } from '@/constants/destinations'
import { useLanguage } from '@/contexts/LanguageContext'
import Reveal from '@/components/common/Reveal'
import ImageLightbox from '@/components/common/ImageLightbox'

export default function DestinationDetailsPage() {
	const params = useParams()
	const slug = params?.slug as string
	const { t } = useLanguage()
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const destination = DESTINATIONS.find(d => d.key === slug)

	if (!destination) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cream'>
				<h2 className='text-2xl font-bold text-ink mb-4'>
					{t('destinationNotFound')}
				</h2>
				<p className='text-ink-soft mb-6'>{t('destinationNotFoundDescription')}</p>
				<Link
					href='/destinations'
					className='inline-flex items-center gap-2 bg-brand-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-brand hover:scale-[1.03] transition-transform'
				>
					<ArrowLeft className='w-4 h-4' />
					<span>{t('backToDestinations')}</span>
				</Link>
			</div>
		)
	}

	return (
		<article className='bg-cream'>
			{/* Hero */}
			<section className='relative h-[70vh] min-h-[500px] w-full flex items-center justify-center'>
				<Image
					src={destination.mainImage}
					alt={t(destination.title)}
					fill
					className='object-cover'
					priority
					sizes='100vw'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85' />

				<div className='absolute top-24 left-4 sm:left-6 lg:left-8 z-10'>
					<Reveal direction='down' distance={12}>
						<Link
							href='/destinations'
							className='inline-flex items-center gap-2 text-white/80 hover:text-white text-sm group bg-black/30 backdrop-blur-sm rounded-full px-4 py-2'
						>
							<ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
							<span>{t('backToDestinations')}</span>
						</Link>
					</Reveal>
				</div>

				<div className='relative z-10 flex flex-col items-center w-full text-center text-white px-4'>
					<Reveal delay={0.1}>
						<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-semibold uppercase tracking-wider mb-5'>
							<MapPin className='w-3.5 h-3.5 text-brand-from' />
							{t(destination.category)}
						</div>
					</Reveal>
					<Reveal delay={0.2}>
						<h1 className='text-4xl md:text-6xl font-bold leading-[1.1] max-w-4xl tracking-tight'>
							{t(destination.title)}
						</h1>
					</Reveal>
				</div>
			</section>

			{/* Content */}
			<section className='py-16 md:py-24'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<Reveal>
						<p className='text-xl md:text-2xl text-ink leading-relaxed mb-8'>
							{t(destination.description)}
						</p>
					</Reveal>
					<Reveal delay={0.1}>
						<div className='h-px bg-gradient-to-r from-brand/40 via-ink/10 to-transparent my-8' />
					</Reveal>
				</div>

				{/* Gallery */}
				{destination.gallery && destination.gallery.length > 0 && (
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12'>
						<Reveal>
							<div className='flex items-baseline justify-between mb-8'>
								<h2 className='text-2xl md:text-3xl font-bold text-ink'>
									{t('gallery')}
								</h2>
								<div className='h-px flex-1 bg-ink/10 ml-6' />
							</div>
						</Reveal>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
							{destination.gallery.map((img, idx) => (
								<Reveal key={idx} delay={(idx % 6) * 0.05}>
									<button
										type='button'
										onClick={() => setOpenIndex(idx)}
										aria-label={`Open image ${idx + 1}`}
										className={`relative w-full overflow-hidden rounded-2xl group cursor-zoom-in ring-1 ring-ink/5 hover:ring-brand/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand transition ${
											idx === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto sm:h-full' : 'aspect-[4/3]'
										}`}
									>
										<Image
											src={img}
											alt={`${t(destination.title)} ${idx + 1}`}
											fill
											className='object-cover transition-transform duration-700 group-hover:scale-105'
											sizes='(max-width: 768px) 100vw, 33vw'
										/>
										<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors' />
										<span className='absolute bottom-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-white/90 text-ink opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300'>
											<Maximize2 className='w-4 h-4' />
										</span>
									</button>
								</Reveal>
							))}
						</div>
					</div>
				)}
			</section>

			{destination.gallery && openIndex !== null && (
				<ImageLightbox
					images={[...destination.gallery]}
					index={openIndex}
					alt={t(destination.title)}
					onClose={() => setOpenIndex(null)}
					onChange={setOpenIndex}
				/>
			)}
		</article>
	)
}
