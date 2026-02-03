'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// --- Custom hook for scroll ---
const useScroll = (threshold = 100) => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > threshold)
		window.addEventListener('scroll', handleScroll)
		handleScroll()
		return () => window.removeEventListener('scroll', handleScroll)
	}, [threshold])

	return isScrolled
}

// --- Language Switcher Component ---
const LanguageSwitcher = ({ language, setLanguage, isScrolled }: any) => {
	const [isOpen, setIsOpen] = useState(false)
	const languages = [
		{ code: 'en', label: 'EN' },
		{ code: 'uz', label: 'UZ' },
		{ code: 'ru', label: 'RU' },
		{ code: 'de', label: 'DE' },
		{ code: 'fr', label: 'FR' },
	]

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
					isScrolled
						? 'text-gray-700 hover:text-orange-500'
						: 'text-white hover:text-orange-300'
				}`}
			>
				<Globe className='w-5 h-5' />
				<span className='text-base'>{language.toUpperCase()}</span>
			</button>

			{isOpen && (
				<div className='absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg border border-gray-200'>
					{languages.map(lang => (
						<button
							key={lang.code}
							onClick={() => {
								setLanguage(lang.code)
								setIsOpen(false)
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
	)
}

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const { language, setLanguage, t } = useLanguage()
	const isScrolled = useScroll(100)

	const navigation = [
		{ name: t('home'), href: '/' },
		// { name: t('about'), href: '/about' },
		{ name: t('destinations'), href: '/destinations' },
		{ name: t('contact'), href: '/contact' },
	]

	const getLinkClasses = (path: string) =>
		`px-4 py-3 rounded-md font-medium transition-colors duration-200 text-base ${
			pathname === path
				? 'text-[#f97316]'
				: isScrolled
				? 'text-gray-700 hover:text-orange-500'
				: 'text-white hover:text-orange-300'
		}`

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
				isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
			}`}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-20'>
					{/* Logo */}
					<Link href='/'>
						<Image
							src='/images/logo.png'
							alt='SamTravel Logo'
							width={60}
							height={60}
						/>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-10'>
						{navigation.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className={getLinkClasses(item.href)}
							>
								{item.name}
							</Link>
						))}
						<LanguageSwitcher
							language={language}
							setLanguage={setLanguage}
							isScrolled={isScrolled}
						/>
					</div>

					{/* Mobile Hamburger + Language */}
					<div className='flex items-center space-x-2 md:hidden'>
						<LanguageSwitcher
							language={language}
							setLanguage={setLanguage}
							isScrolled={isScrolled}
						/>

						<button
							onClick={() => setIsOpen(!isOpen)}
							className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
								isScrolled
									? 'text-gray-700 hover:text-orange-500'
									: 'text-white hover:text-orange-300'
							}`}
						>
							{isOpen ? (
								<X className='w-6 h-6' />
							) : (
								<Menu className='w-6 h-6' />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation Links */}
				{isOpen && (
					<div className='md:hidden border-t border-gray-200 bg-white'>
						<div className='px-2 pt-2 pb-3 sm:px-3'>
							{navigation.map(item => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={`block px-4 py-3 rounded-md font-medium transition-colors duration-200 ${
										pathname === item.href
											? 'text-[#f97316]'
											: 'text-gray-700 hover:text-orange-500'
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
