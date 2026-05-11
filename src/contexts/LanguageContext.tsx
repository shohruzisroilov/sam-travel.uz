'use client'

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react'

type Language = 'en' | 'uz' | 'ru' | 'de' | 'fr'

const SUPPORTED: Language[] = ['en', 'uz', 'ru', 'de', 'fr']
const STORAGE_KEY = 'samtravel.lang'

import en from '@/locales/en.json'
import uz from '@/locales/uz.json'
import ru from '@/locales/ru.json'
import de from '@/locales/de.json'
import fr from '@/locales/fr.json'

export type Translations = typeof en

const translations: Record<Language, Translations> = { en, uz, ru, de, fr }

interface LanguageContextType {
	language: Language
	setLanguage: (lang: Language) => void
	t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const isLanguage = (v: unknown): v is Language =>
	typeof v === 'string' && (SUPPORTED as string[]).includes(v)

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguageState] = useState<Language>('uz')

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY)
			if (isLanguage(stored)) {
				setLanguageState(stored)
				return
			}
			const nav = window.navigator.language.slice(0, 2)
			if (isLanguage(nav)) setLanguageState(nav)
		} catch {
			/* ignore */
		}
	}, [])

	useEffect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = language
		}
	}, [language])

	const setLanguage = useCallback((lang: Language) => {
		setLanguageState(lang)
		try {
			window.localStorage.setItem(STORAGE_KEY, lang)
		} catch {
			/* ignore */
		}
	}, [])

	const t = useCallback(
		(key: keyof Translations): string => translations[language][key] || (key as string),
		[language]
	)

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	)
}

export function useLanguage() {
	const context = useContext(LanguageContext)
	if (context === undefined) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}
