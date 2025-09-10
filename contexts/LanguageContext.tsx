'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'uz' | 'ru' | 'de' | 'fr'

import en from '@/locales/en.json'
import uz from '@/locales/uz.json'
import ru from '@/locales/ru.json'
import de from '@/locales/de.json'
import fr from '@/locales/fr.json'

type Translations = typeof en

const translations: Record<Language, Translations> = { en, uz, ru, de, fr }

interface LanguageContextType {
	language: Language
	setLanguage: (lang: Language) => void
	t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguage] = useState<Language>('en')

	const t = (key: keyof Translations): string => {
		return translations[language][key] || key
	}

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
