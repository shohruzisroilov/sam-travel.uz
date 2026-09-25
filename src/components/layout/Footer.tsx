'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaInstagram, FaTelegram } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
	const { t } = useLanguage()
	const currentYear = new Date().getFullYear()

	return (
		<footer className='relative bg-ink text-white overflow-hidden'>
			{/* Decorative gradient blob */}
			<div className='pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand/20 blur-3xl' />
			<div className='pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl' />

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Main */}
				<div className='pt-14 pb-12 grid grid-cols-1 md:grid-cols-12 gap-10'>
					<div className='md:col-span-5'>
						<Link href='/' className='inline-block'>
							<Image
								src='/images/logo.png'
								alt='SamTravel Logo'
								width={56}
								height={56}
								className='brightness-0 invert'
							/>
						</Link>
						<p className='text-white/70 mt-4 max-w-md leading-relaxed'>
							{t('footerAbout')}
						</p>
						<div className='flex gap-3 mt-6'>
							{[
								{
									href: 'https://t.me/samtravel_uz',
									Icon: FaTelegram,
									label: 'Telegram',
								},
								{
									href: 'https://www.instagram.com/samtraveluz/',
									Icon: FaInstagram,
									label: 'Instagram',
								},
							].map(({ href, Icon, label }) => (
								<a
									key={label}
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={label}
									className='w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-brand hover:border-brand transition-colors'
								>
									<Icon className='w-4 h-4' />
								</a>
							))}
						</div>
					</div>

					<div className='md:col-span-3'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-4'>
							{t('quickLinks')}
						</h4>
						<ul className='space-y-3'>
							{[
								{ href: '/', label: t('home') },
								{ href: '/about', label: t('about') },
								{ href: '/destinations', label: t('destinations') },
								{ href: '/contact', label: t('contact') },
							].map(item => (
								<li key={item.href}>
									<Link
										href={item.href}
										className='text-white/80 hover:text-brand transition-colors inline-flex items-center group'
									>
										<span className='w-0 group-hover:w-3 h-px bg-brand transition-all duration-300 mr-0 group-hover:mr-2' />
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='md:col-span-4'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-4'>
							{t('contactInfo')}
						</h4>
						<ul className='space-y-3 text-white/80'>
							<li>
								<a
									href='tel:+998555205537'
									className='flex items-center gap-3 hover:text-brand transition-colors'
								>
									<Phone className='w-4 h-4 shrink-0 text-brand' />
									<span>+998 55 520 55 37</span>
								</a>
							</li>
							<li>
								<a
									href='mailto:info@sam-travel.uz'
									className='flex items-center gap-3 hover:text-brand transition-colors'
								>
									<Mail className='w-4 h-4 shrink-0 text-brand' />
									<span>info@sam-travel.uz</span>
								</a>
							</li>
							<li className='flex items-start gap-3'>
								<MapPin className='w-4 h-4 shrink-0 mt-1 text-brand' />
								<span>{t('addressDes')}</span>
							</li>
							<li className='flex items-start gap-3'>
								<MapPin className='w-4 h-4 shrink-0 mt-1 text-brand' />
								<span>{t('addressDes2')}</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className='border-t border-white/10 py-6 text-center'>
					<p className='text-white/50 text-sm'>
						© {currentYear} Sam Travel. {t('allRightsReserved')}
					</p>
				</div>
			</div>
		</footer>
	)
}
