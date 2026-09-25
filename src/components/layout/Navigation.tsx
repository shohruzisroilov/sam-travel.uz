'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type Language = 'en' | 'uz' | 'ru' | 'de' | 'fr'

interface LanguageSwitcherProps {
	language: Language
	setLanguage: (lang: Language) => void
	isScrolled: boolean
}

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
const LANGUAGES: { code: Language; label: string }[] = [
	{ code: 'en', label: 'EN' },
	{ code: 'uz', label: 'UZ' },
	{ code: 'ru', label: 'RU' },
	{ code: 'de', label: 'DE' },
	{ code: 'fr', label: 'FR' },
]

const LanguageSwitcher = ({ language, setLanguage, isScrolled }: LanguageSwitcherProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!isOpen) return
		const onDocClick = (e: MouseEvent) => {
			if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false)
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false)
		}
		document.addEventListener('mousedown', onDocClick)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('mousedown', onDocClick)
			document.removeEventListener('keydown', onKey)
		}
	}, [isOpen])

	return (
		<div ref={containerRef} className='relative'>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				aria-label='Change language'
				className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
					isScrolled
						? 'text-gray-700 hover:text-brand'
						: 'text-white hover:text-brand-from'
				}`}
			>
				<Globe className='w-5 h-5' aria-hidden='true' />
				<span className='text-base'>{language.toUpperCase()}</span>
			</button>

			{isOpen && (
				<div
					role='listbox'
					className='absolute right-0 mt-2 w-24 bg-white rounded-md border border-gray-200'
				>
					{LANGUAGES.map(lang => (
						<button
							key={lang.code}
							type='button'
							role='option'
							aria-selected={language === lang.code}
							onClick={() => {
								setLanguage(lang.code)
								setIsOpen(false)
							}}
							className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
								language === lang.code
									? 'bg-brand-muted text-brand'
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

	// Close the mobile menu whenever the route changes
	useEffect(() => {
		setIsOpen(false)
	}, [pathname])

	const navigation = [
		{ name: t('home'), href: '/' },
		// { name: t('about'), href: '/about' },
		{ name: t('destinations'), href: '/destinations' },
		{ name: t('contact'), href: '/contact' },
	]

	const getLinkClasses = (path: string) =>
		`relative px-4 py-3 font-medium transition-colors duration-200 text-base ${
			pathname === path
				? 'text-brand after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:bg-brand-gradient after:rounded-full'
				: isScrolled
				? 'text-gray-700 hover:text-brand'
				: 'text-white hover:text-brand-from'
		}`

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
				isScrolled || isOpen ? 'bg-white border-b border-gray-200' : 'bg-transparent'
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
							isScrolled={isScrolled || isOpen}
						/>

						<button
							onClick={() => setIsOpen(!isOpen)}
							className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
								isScrolled
									? 'text-gray-700 hover:text-brand'
									: 'text-white hover:text-brand-from'
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
											? 'text-brand bg-brand-muted'
											: 'text-gray-700 hover:text-brand'
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
