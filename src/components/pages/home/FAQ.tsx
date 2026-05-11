'use client'

import { useMemo } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import SectionHeading from '@/components/common/SectionHeading'

import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
	const { t } = useLanguage()

	const faqs = useMemo(
		() => [
			{ question: t('faqq1'), answer: t('faqa1') },
			{ question: t('faqq2'), answer: t('faqa2') },
			{ question: t('faqq3'), answer: t('faqa3') },
			{ question: t('faqq4'), answer: t('faqa4') },
		],
		[t]
	)

	return (
		<section className='py-20 md:py-24 bg-gradient-to-b from-white to-brand-muted/40'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<SectionHeading eyebrow={t('faq')} title={t('faqtitle')} />

				<Accordion type='single' collapsible className='space-y-3'>
					{faqs.map((faq, i) => (
						<AccordionItem
							key={i}
							value={`faq-${i}`}
							className='border border-gray-200 rounded-xl px-5 bg-white data-[state=open]:ring-1 data-[state=open]:ring-brand/30 transition-all'
						>
							<AccordionTrigger className='text-left font-semibold text-gray-900 hover:text-brand hover:no-underline'>
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className='text-gray-600 leading-relaxed'>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
