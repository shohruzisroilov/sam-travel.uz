'use client'

import { Translations, useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface DestinationCardProps {
	slug: string
	title: keyof Translations
	description: keyof Translations
	image: string
	priority?: boolean
}

export default function DestinationCard({
	slug,
	title,
	description,
	image,
	priority = false,
}: DestinationCardProps) {
	const { t } = useLanguage()

	return (
		<Link
			href={`/destinations/${slug}`}
			className='group relative block overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200/70 transition-all duration-500 hover:-translate-y-1 hover:ring-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand'
		>
			{/* Image */}
			<div className='relative aspect-[4/3] overflow-hidden'>
				<Image
					src={image}
					alt={t(title)}
					fill
					className='object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					priority={priority}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />

				{/* Title on image */}
				<h3 className='absolute inset-x-5 bottom-4 text-2xl font-bold text-white drop-shadow-md'>
					{t(title)}
				</h3>
			</div>

			{/* Body */}
			<div className='p-5'>
				<p className='line-clamp-2 min-h-[3rem] text-sm leading-relaxed text-gray-600'>
					{t(description)}
				</p>

				<div className='mt-4 flex items-center justify-between'>
					<span className='inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-transform duration-300 group-hover:translate-x-1'>
						{t('learnMore')}
						<ArrowRight className='h-4 w-4' />
					</span>
				</div>
			</div>
		</Link>
	)
}
