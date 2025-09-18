import { Translations } from '@/contexts/LanguageContext'

interface Destination {
	key: string
	title: keyof Translations
	description: keyof Translations
	category: keyof Translations
	mainImage: string
	gallery?: string[]
}

export const DESTINATIONS: Destination[] = [
	{
		key: 'vienna',
		title: 'viennaDestinationsTitle',
		description: 'viennaDestinationsSubtitle',
		mainImage: '/images/destinations/vienna.jpg',
		category: 'historical',
		gallery: [
			'/images/destinations/vienna1.jpg',
			'/images/destinations/vienna2.jpg',
			'/images/destinations/vienna3.jpg',
			'/images/destinations/vienna4.jpg',
			'/images/destinations/vienna5.jpg',
		],
	},
	{
		key: 'zurich',
		title: 'zurichDestinationsTitle',
		description: 'zurichDestinationsSubtitle',
		mainImage: '/images/destinations/zurich.png',
		category: 'modern',
		gallery: [
			'/images/destinations/zurich1.jpg',
			'/images/destinations/zurich2.jpg',
			'/images/destinations/zurich3.png',
			'/images/destinations/zurich4.png',
		],
	},
	{
		key: 'interlaken',
		title: 'interlakenDestinationsTitle',
		description: 'interlakenDestinationsSubtitle',
		mainImage: '/images/destinations/interlaken.jpg',
		category: 'nature',
		gallery: [
			'/images/destinations/interlaken2.jpg',
			'/images/destinations/interlaken1.jpg',
			'/images/destinations/interlaken3.jpg',
			'/images/destinations/interlaken4.jpg',
			'/images/destinations/interlaken5.jpg',
		],
	},
	{
		key: 'geneva',
		title: 'genevaDestinationsTitle',
		description: 'genevaDestinationsSubtitle',
		mainImage: '/images/destinations/geneva.jpg',
		category: 'modern',
		gallery: [
			'/images/destinations/geneva1.jpg',
			'/images/destinations/geneva2.jpg',
			'/images/destinations/geneva3.jpg',
		],
	},
	{
		key: 'paris',
		title: 'parisDestinationsTitle',
		description: 'parisDestinationsSubtitle',
		mainImage: '/images/destinations/paris.jpg',
		category: 'romantic',
		gallery: [
			'/images/destinations/paris1.jpg',
			'/images/destinations/paris2.jpg',
			'/images/destinations/paris3.jpg',
			'/images/destinations/paris4.jpg',
			'/images/destinations/paris5.jpg',
			'/images/destinations/paris6.jpg',
		],
	},
]
