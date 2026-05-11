'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
	children: ReactNode
	delay?: number
	duration?: number
	distance?: number
	direction?: Direction
	once?: boolean
	className?: string
	as?: 'div' | 'section' | 'span' | 'li' | 'article'
}

const EASE = [0.22, 1, 0.36, 1] as const

function buildVariants(direction: Direction, distance: number): Variants {
	const offset = (() => {
		switch (direction) {
			case 'up': return { y: distance }
			case 'down': return { y: -distance }
			case 'left': return { x: distance }
			case 'right': return { x: -distance }
			default: return {}
		}
	})()
	return {
		hidden: { opacity: 0, ...offset },
		visible: { opacity: 1, x: 0, y: 0 },
	}
}

export default function Reveal({
	children,
	delay = 0,
	duration = 0.6,
	distance = 24,
	direction = 'up',
	once = true,
	className,
	as = 'div',
}: RevealProps) {
	const MotionTag = motion[as]
	return (
		<MotionTag
			className={className}
			initial='hidden'
			whileInView='visible'
			viewport={{ once, margin: '-80px' }}
			variants={buildVariants(direction, distance)}
			transition={{ duration, delay, ease: EASE }}
		>
			{children}
		</MotionTag>
	)
}
