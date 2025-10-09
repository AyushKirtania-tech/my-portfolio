import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// metadata already declared — keep as needed
export const metadata = {
  title: 'Ayush Kirtania | Full Stack Developer Portfolio',
  description:
    'Portfolio of Ayush Kirtania - Full Stack Developer specializing in MERN stack. 3rd year CS student at Scottish Church College, Kolkata.',
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

export default function RootLayout({ children }) {
  // we add inter.className to <html> so font is applied everywhere
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Add any additional head tags you need here (preloads, meta tags, ...). */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
