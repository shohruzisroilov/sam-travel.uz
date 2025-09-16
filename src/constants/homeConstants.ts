import { Users, DollarSign, Shield } from 'lucide-react'

export const FEATURES = [
	{
		icon: Users,
		key: 'expertGuides' as const,
		desc: 'expertGuidesDesc' as const,
	},
	{
		icon: DollarSign,
		key: 'bestPrices' as const,
		desc: 'bestPricesDesc' as const,
	},
	{
		icon: Shield,
		key: 'safeTravel' as const,
		desc: 'safeTravelDesc' as const,
	},
] as const

export const HERO_SLIDES = [
	{
		image: '/images/hero-image1.jpg',
		titleKey: 'heroTitle' as const,
		subKey: 'heroSubtitle' as const,
	},
	{
		image: '/images/hero-image2.jpg',
		titleKey: 'heroTitle' as const,
		subKey: 'heroSubtitle' as const,
	},
	{
		image: '/images/hero-image3.jpg',
		titleKey: 'heroTitle' as const,
		subKey: 'heroTitle' as const,
	},
] as const
