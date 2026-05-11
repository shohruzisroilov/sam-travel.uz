import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<div className='max-w-md text-center'>
				<p className='text-orange-500 text-sm font-semibold mb-2'>404</p>
				<h1 className='text-3xl font-bold mb-4'>Page not found</h1>
				<p className='text-gray-600 mb-6'>
					The page you are looking for does not exist.
				</p>
				<Link
					href='/'
					className='inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold'
				>
					Go home
				</Link>
			</div>
		</div>
	)
}
