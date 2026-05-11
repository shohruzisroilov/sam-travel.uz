'use client'

import * as React from 'react'
import PhoneInput, { type Value } from 'react-phone-number-input'
import type { CountryCode } from 'libphonenumber-js/core'
import 'react-phone-number-input/style.css'
import clsx from 'clsx'

interface PhoneNumberInputProps {
	value?: Value
	onChange: (value: Value) => void
	placeholder?: string
	required?: boolean
	defaultCountry?: CountryCode
	disabled?: boolean
	error?: string
}

export function PhoneNumberInput({
	value,
	onChange,
	placeholder = '',
	required,
	defaultCountry = 'UZ',
	disabled,
	error,
}: PhoneNumberInputProps) {
	return (
		<div className='space-y-1'>
			<PhoneInput
				value={value}
				onChange={onChange}
				defaultCountry={defaultCountry}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				className={clsx(
					'flex w-full h-14 rounded-md border border-input bg-background px-4 text-base',
					'placeholder:text-muted-foreground focus-visible:outline-none',
					'disabled:cursor-not-allowed disabled:opacity-50',
					error && 'border-destructive'
				)}
			/>

			<style jsx global>{`
				.PhoneInput {
					display: flex;
					align-items: center;
					width: 100%;
				}

				.PhoneInput input {
					flex: 1;
					outline: none !important;
					border: none !important;
					background: transparent !important;
					padding: 0 !important;
					font-size: 0.875rem !important;
					line-height: 1.25rem !important;
					color: inherit !important;
				}

				.PhoneInput input::placeholder {
					color: hsl(var(--muted-foreground)) !important;
					opacity: 1 !important;
				}

				.PhoneInputCountry {
					margin-right: 0.5rem;
				}
				.PhoneInputCountry select {
					border: none !important;
					background: transparent !important;
					outline: none !important;
					cursor: pointer;
				}
			`}</style>

			{error && <p className='text-sm text-destructive'>{error}</p>}
		</div>
	)
}
