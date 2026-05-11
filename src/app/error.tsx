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
		<div className='min-h-screen flex items-center justify-center px-4'>
			<div className='max-w-md text-center'>
				<h1 className='text-3xl font-bold mb-4'>Something went wrong</h1>
				<p className='text-gray-600 mb-6'>
					An unexpected error occurred. Please try again.
				</p>
				<button
					onClick={() => reset()}
					className='inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold'
				>
					Try again
				</button>
			</div>
		</div>
	)
}
