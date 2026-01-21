'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

export default function Footer() {
	const { t } = useLanguage()
	const currentYear = new Date().getFullYear() // 🕒 hozirgi yilni olish

	return (
		<footer className='bg-gray-900 text-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div className='col-span-1 md:col-span-2'>
						<Link href='/'>
							<Image
								src='/images/logo.png'
								alt='SamTravel Logo'
								width={60}
								height={60}
							/>
						</Link>
						<p className='text-gray-300 mt-2 mb-4 max-w-md'>
							{t('footerAbout')}
						</p>
						<div className='flex space-x-4'>
							<a
								href='https://t.me/samtravel_uz'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
							>
								<FaTelegram className='w-5 h-5' />
							</a>
							<a
								href='https://www.instagram.com/samtraveluz/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
							>
								<FaInstagram className='w-5 h-5' />
							</a>
							<a
								href='#'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
							>
								<FaFacebook className='w-5 h-5' />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>{t('quickLinks')}</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/'
									className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
								>
									{t('home')}
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
								>
									{t('about')}
								</Link>
							</li>
							<li>
								<Link
									href='/destinations'
									className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
								>
									{t('destinations')}
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-gray-300 hover:text-orange-400 transition-colors duration-200'
								>
									{t('contact')}
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>{t('contactInfo')}</h3>
						<ul className='space-y-2'>
							<li className='flex items-center space-x-2 text-gray-300'>
								<Phone className='w-4 h-4' />
								<span>+998 55 520 55 37</span>
							</li>
							<li className='flex items-center space-x-2 text-gray-300'>
								<Mail className='w-4 h-4' />
								<span>info@sam-travel.uz</span>
							</li>
							<li className='flex items-center space-x-2 text-gray-300'>
								<MapPin className='w-4 h-4' />
								<span>Sharof Rashidov 99a, Tashkent, Uzbekistan</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className='border-t border-gray-800 mt-8 pt-8 text-center'>
					<p className='text-gray-300'>
						© {currentYear} Sam Travel. {t('allRightsReserved')}
					</p>
				</div>
			</div>
		</footer>
	)
}
