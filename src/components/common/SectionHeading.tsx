interface SectionHeadingProps {
	eyebrow?: string
	title: string
	subtitle?: string
	align?: 'center' | 'left'
	className?: string
}

export default function SectionHeading({
	eyebrow,
	title,
	subtitle,
	align = 'center',
	className = '',
}: SectionHeadingProps) {
	const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
	return (
		<div className={`mb-12 md:mb-16 max-w-3xl ${alignClass} ${className}`}>
			{eyebrow && (
				<p className='text-sm font-semibold tracking-[0.2em] uppercase text-brand mb-3'>
					{eyebrow}
				</p>
			)}
			<h2 className='text-3xl md:text-4xl font-bold text-ink leading-tight'>
				{title}
			</h2>
			{subtitle && (
				<p className='mt-4 text-base md:text-lg text-gray-600 leading-relaxed'>
					{subtitle}
				</p>
			)}
			<div
				className={`mt-5 h-1 w-20 rounded-full bg-brand-gradient ${
					align === 'center' ? 'mx-auto' : ''
				}`}
			/>
		</div>
	)
}
