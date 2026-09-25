import { Inter } from 'next/font/google'
import Script from 'next/script'
import type { Metadata } from 'next'
import '../globals.css'
import { SITE_URL } from '@/lib/seo'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
}

export default function OtherLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='uz' className={inter.variable}>
			<head>
				<Script
					id='facebook-pixel'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)n=f.fbq;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1464552195226957');
              fbq('track', 'PageView');
            `,
					}}
				/>
				{/* Google Analytics */}
				<Script
					src='https://www.googletagmanager.com/gtag/js?id=G-E5Y4HECMZ0'
					strategy='afterInteractive'
				/>
				<Script id='google-analytics' strategy='afterInteractive'>
					{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-E5Y4HECMZ0');
    `}
				</Script>
			</head>

			<body className='antialiased bg-cream font-sans text-ink'>
				<main>{children}</main>

				{/* noscript fallback */}
				<noscript>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						height='1'
						width='1'
						style={{ display: 'none' }}
						alt=''
						src='https://www.facebook.com/tr?id=1464552195226957&ev=PageView&noscript=1'
					/>
				</noscript>
			</body>
		</html>
	)
}
