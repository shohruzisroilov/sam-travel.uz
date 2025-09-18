'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
	const { t } = useLanguage()

	const faqs = [
		{
			question: t('faqq1'),
			answer: t('faqa1'),
		},
		{
			question: t('faqq2'),
			answer: t('faqa2'),
		},
		{
			question: t('faqq3'),
			answer: t('faqa3'),
		},
		{
			question: t('faqq4'),
			answer: t('faqa4'),
		},
	]

	return (
		<section className='py-20'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl font-bold mb-4'>{t('faqtitle')}</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto' />
				</div>

				<Accordion type='single' collapsible className='space-y-4'>
					{faqs.map((faq, i) => (
						<AccordionItem
							key={i}
							value={`faq-${i}`}
							className='border rounded-lg px-4'
						>
							<AccordionTrigger className='text-left font-semibold'>
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className='text-gray-600'>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
