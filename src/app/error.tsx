'use client'

import { useEffect } from 'react'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			console.error(error)
		}
	}, [error])

	return (
		<div className='min-h-screen flex items-center justify-center px-4 bg-cream'>
			<div className='max-w-md text-center'>
				<h1 className='text-3xl font-bold text-ink mb-4'>Xatolik yuz berdi</h1>
				<p className='text-ink-soft mb-6'>
					Kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.
				</p>
				<button
					onClick={() => reset()}
					className='inline-flex items-center px-6 py-3 rounded-xl bg-brand-gradient text-white font-semibold shadow-brand transition-transform hover:scale-[1.03]'
				>
					Qayta urinish
				</button>
			</div>
		</div>
	)
}
