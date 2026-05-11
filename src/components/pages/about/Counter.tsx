'use client'

import { useEffect, useState } from 'react'
import { animate, useMotionValue } from 'framer-motion'

interface CounterProps {
	from?: number
	to: number
	duration?: number
	suffix?: string
	start?: boolean
}

export default function Counter({
	from = 0,
	to,
	duration = 3,
	suffix = '',
	start = false,
}: CounterProps) {
	const count = useMotionValue(from)
	const [value, setValue] = useState(from)

	useEffect(() => {
		if (!start) return

		const controls = animate(count, to, {
			duration,
			onUpdate: latest => setValue(Math.floor(latest)),
		})
		return controls.stop
	}, [start, to, duration, count])

	return (
		<span>
			{value}
			{suffix}
		</span>
	)
}
