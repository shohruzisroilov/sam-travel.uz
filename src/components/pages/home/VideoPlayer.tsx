'use client'

import { useInView } from 'react-intersection-observer'

type VideoPlayerProps = {
	src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	})

	return (
		<div ref={ref} className='flex justify-center'>
			{inView ? (
				<video
					src={src}
					controls
					className='rounded-lg shadow-lg w-full max-w-[320px]'
				/>
			) : (
				<div className='rounded-lg shadow-lg w-full max-w-[320px] h-[180px] bg-gray-200 animate-pulse' />
			)}
		</div>
	)
}
