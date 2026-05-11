'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

import { useLanguage } from '@/contexts/LanguageContext'
import { stats } from '@/constants/about'
import Counter from '@/components/pages/about/Counter'
import Reveal from '@/components/common/Reveal'

export default function About() {
	const { t } = useLanguage()
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<div className='min-h-screen bg-cream'>
			{/* Hero */}
			<section
				className='relative min-h-[60vh] flex items-center justify-center bg-center bg-cover'
				style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
			>
				<div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/80' />
				<div className='relative z-10 max-w-4xl mx-auto px-4 py-32 text-center text-white'>
					<Reveal direction='down' distance={16}>
						<p className='text-sm font-semibold uppercase tracking-[0.3em] text-brand-from mb-4'>
							{t('about')}
						</p>
					</Reveal>
					<Reveal delay={0.1}>
						<h1 className='text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight'>
							{t('aboutTitle')}
						</h1>
					</Reveal>
				</div>
			</section>

			{/* Stats */}
			<section className='py-20 md:py-28' ref={ref}>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'>
						{stats.map((stat, i) => (
							<Reveal key={stat.label} delay={i * 0.08}>
								<div className='text-center md:text-left'>
									<div className='text-4xl md:text-5xl font-bold text-brand mb-2 tabular-nums'>
										<Counter to={stat.value} suffix={stat.suffix} start={isInView} />
									</div>
									<div className='text-ink-soft font-medium tracking-wide'>
										{stat.label}
									</div>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
