'use client'

import { useEffect } from 'react'

type InstagramEmbedProps = {
	permalink: string
}

export default function InstagramEmbed({ permalink }: InstagramEmbedProps) {
	useEffect(() => {
		if ((window as any).instgrm) {
			;(window as any).instgrm.Embeds.process()
		}
	}, [permalink])

	return (
		<div className='flex justify-center'>
			<blockquote
				className='instagram-media'
				data-instgrm-permalink={permalink}
				data-instgrm-version='14'
				style={{
					background: '#FFF',
					border: 0,
					borderRadius: 3,
					boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
					margin: '1px',
					maxWidth: '540px',
					minWidth: '326px',
					padding: 0,
					width: '100%',
				}}
			></blockquote>
		</div>
	)
}
