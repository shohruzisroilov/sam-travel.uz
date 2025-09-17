'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

import { useLanguage } from '@/contexts/LanguageContext'

import { stats, team } from '@/constants/about'
import Counter from '@/components/pages/about/Counter'
import TeamCard from '@/components/pages/about/TeamCard'
import Image from 'next/image'

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

			{/* Team */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						{t('ourTeam')}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />

					<div className='flex justify-center'>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
							{team.map(member => (
								<TeamCard key={member.image} {...member} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Licenses */}
			<section className='py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						{t('licenses')}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6' />

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center'>
						<Image
							src='/images/license1.jpg'
							alt='License 1'
							width={500}
							height={400}
							className='rounded-xl shadow-md object-contain'
						/>
						<Image
							src='/images/license2.jpg'
							alt='License 2'
							width={500}
							height={400}
							className='rounded-xl shadow-md object-contain'
						/>
					</div>
				</div>
			</section>
		</div>
	)
}
