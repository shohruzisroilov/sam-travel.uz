import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
	title: 'Европа саёҳати — классик тур | SamTravel',
	description: 'Европа бўйлаб саёҳат ҳақида муҳим маълумотлар. Видеони томоша қилинг ва турга ёзилинг.',
	path: '/yevropa',
})

export default function YevropaLayout({ children }: { children: React.ReactNode }) {
	return children
}
