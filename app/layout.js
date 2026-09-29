import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
});

const body = Figtree({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Ayush Kirtania | Full Stack Developer Portfolio',
  description:
    'Portfolio of Ayush Kirtania - Full Stack Developer specializing in MERN stack. Computer Science student at Scottish Church College, Kolkata.',
  keywords:
    'Ayush Kirtania, Full Stack Developer, MERN Stack, React, Node.js, MongoDB, Web Developer, Portfolio',
  authors: [{ name: 'Ayush Kirtania' }],
  creator: 'Ayush Kirtania',
  metadataBase: new URL('https://ayushkirtania.com'),
  openGraph: {
    title: 'Ayush Kirtania | Full Stack Developer',
    description: 'Full Stack Developer specializing in MERN stack',
    url: 'https://ayushkirtania.com',
    siteName: 'Ayush Kirtania Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Kirtania | Full Stack Developer',
    description: 'Full Stack Developer specializing in MERN stack',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2233ff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}