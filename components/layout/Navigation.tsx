'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [isLangOpen, setIsLangOpen] = useState(false)
	const pathname = usePathname()
	const { language, setLanguage, t } = useLanguage()

	const navigation = [
		{ name: t('home'), href: '/' },
		{ name: t('about'), href: '/about' },
		{ name: t('destinations'), href: '/destinations' },
		{ name: t('contact'), href: '/contact' },
	]

	const languages = [
		{ code: 'en', label: 'EN' },
		{ code: 'uz', label: 'UZ' },
		{ code: 'ru', label: 'RU' },
		{ code: 'de', label: 'DE' },
		{ code: 'fr', label: 'FR' },
	]

	const isActive = (path: string) =>
		pathname === path
			? 'text-white bg-gradient-to-r from-orange-400 to-orange-500'
			: 'text-gray-700 hover:text-orange-500'

	return (
		<nav className='bg-white shadow-sm sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					{/* Logo */}
					<Link href='/' className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center'>
							<span className='text-white font-bold text-sm'>T</span>
						</div>
						<span className='font-bold text-xl text-gray-800'>SamTravel</span>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-8'>
						{navigation.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(
									item.href
								)}`}
							>
								{item.name}
							</Link>
						))}

						{/* Language Switcher */}
						<div className='relative'>
							<button
								onClick={() => setIsLangOpen(!isLangOpen)}
								className='flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-200'
							>
								<Globe className='w-4 h-4' />
								<span>{language.toUpperCase()}</span>
							</button>

							{isLangOpen && (
								<div className='absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg border border-gray-200'>
									{languages.map(lang => (
										<button
											key={lang.code}
											onClick={() => {
												setLanguage(lang.code as any)
												setIsLangOpen(false)
											}}
											className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
												language === lang.code
													? 'bg-orange-50 text-orange-600'
													: 'text-gray-700'
											}`}
										>
											{lang.label}
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500'
					>
						{isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className='md:hidden border-t border-gray-200 bg-white'>
						<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
							{navigation.map(item => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive(
										item.href
									)}`}
								>
									{item.name}
								</Link>
							))}
						</div>

						{/* Mobile Language Switcher */}
						<div className='px-3 py-2 border-t border-gray-200 flex items-center space-x-2'>
							<Globe className='w-4 h-4 text-gray-700' />
							<select
								value={language}
								onChange={e => setLanguage(e.target.value as any)}
								className='text-sm border rounded-md px-2 py-1'
							>
								{languages.map(lang => (
									<option key={lang.code} value={lang.code}>
										{lang.label}
									</option>
								))}
							</select>
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
