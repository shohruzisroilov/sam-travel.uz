'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const HIDE_ON = ['/contact', '/yevropa/register']

export default function MobileStickyCTA() {
	const pathname = usePathname()
	const { t } = useLanguage()
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 400)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	if (HIDE_ON.some(p => pathname?.startsWith(p))) return null

	return (
		<div
			className={`md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pb-3 pt-2 transition-all duration-300 ${
				visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
			}`}
			aria-hidden={!visible}
		>
			<div className='flex gap-2 rounded-2xl bg-white/95 backdrop-blur-lg border border-gray-200/70 shadow-md p-2'>
				<a
					href='tel:+998555205537'
					className='flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand transition-colors'
				>
					<Phone className='w-4 h-4' />
					{t('phone')}
				</a>
				<Link
					href='/contact'
					className='flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3 text-sm font-semibold text-white'
				>
					<MessageCircle className='w-4 h-4' />
					{t('contactUs')}
				</Link>
			</div>
		</div>
	)
}
