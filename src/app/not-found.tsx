import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center px-4 bg-cream'>
			<div className='max-w-md text-center'>
				<p className='text-brand text-sm font-semibold tracking-[0.3em] mb-2'>404</p>
				<h1 className='text-3xl font-bold text-ink mb-4'>Sahifa topilmadi</h1>
				<p className='text-ink-soft mb-6'>
					Siz qidirayotgan sahifa mavjud emas yoki ko‘chirilgan.
				</p>
				<Link
					href='/'
					className='inline-flex items-center px-6 py-3 rounded-xl bg-brand-gradient text-white font-semibold shadow-brand transition-transform hover:scale-[1.03]'
				>
					Bosh sahifaga qaytish
				</Link>
			</div>
		</div>
	)
}
