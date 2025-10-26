'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

type VideoPlayerProps = {
	src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
	const { ref, inView } = useInView({
		triggerOnce: false,
		threshold: 0.1,
	})
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (inView && !isLoaded) {
			setIsLoaded(true)
		}
	}, [inView, isLoaded])

	return (
		<div ref={ref} className='flex justify-center'>
			{isLoaded ? (
				<video
					src={src}
					controls
					preload='metadata'
					className='rounded-lg shadow-lg w-full max-w-[320px] object-cover'
				/>
			) : (
				<div className='rounded-lg shadow-lg w-full max-w-[320px] bg-gray-200 animate-pulse' />
			)}
		</div>
	)
}
