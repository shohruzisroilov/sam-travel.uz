'use client'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

interface AOSProviderProps {
	children: React.ReactNode
}

export default function AOSProvider({ children }: AOSProviderProps) {
	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-in-out',
			once: true,
			offset: 100,
		})

		const refreshAOS = () => {
			AOS.refresh()
		}

		window.addEventListener('load', refreshAOS)

		return () => {
			window.removeEventListener('load', refreshAOS)
		}
	}, [])

	return <>{children}</>
}
