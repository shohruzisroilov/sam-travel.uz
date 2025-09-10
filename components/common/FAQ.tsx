'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQ() {
	const faqs = [
		{
			question: 'How far in advance should I book my trip?',
			answer:
				'We recommend booking at least 2-3 months in advance for international destinations and 3-4 weeks for domestic trips.',
		},
		{
			question: 'Do you provide travel insurance?',
			answer:
				'Yes, we offer comprehensive travel insurance packages covering medical emergencies, cancellations, and lost luggage.',
		},
		{
			question: 'Can you arrange custom itineraries?',
			answer:
				'Absolutely! We specialize in personalized travel experiences tailored to your preferences, budget, and interests.',
		},
		{
			question: 'What payment methods do you accept?',
			answer:
				'We accept all major credit cards, bank transfers, and offer flexible payment plans for larger bookings.',
		},
	]

	return (
		<section className='py-20'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl font-bold mb-4'>
						Frequently Asked Questions
					</h2>
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
