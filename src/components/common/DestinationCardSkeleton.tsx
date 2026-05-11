export default function DestinationCardSkeleton() {
	return (
		<div className='overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200/70'>
			<div className='aspect-[4/3] w-full animate-pulse bg-gradient-to-br from-gray-200 to-gray-300' />
			<div className='space-y-3 p-5'>
				<div className='h-3 w-3/4 animate-pulse rounded bg-gray-200' />
				<div className='h-3 w-1/2 animate-pulse rounded bg-gray-200' />
				<div className='mt-4 h-4 w-24 animate-pulse rounded bg-gray-200' />
			</div>
		</div>
	)
}
