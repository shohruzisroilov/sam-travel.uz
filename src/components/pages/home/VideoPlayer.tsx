'use client'

type VideoPlayerProps = {
	src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
	return (
		<div className='flex justify-center'>
			<video
				src={src}
				controls
				className='rounded-lg shadow-lg w-full max-w-[320px]'
			/>
		</div>
	)
}
