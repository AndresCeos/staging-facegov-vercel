import { Bellota_Text } from 'next/font/google';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ClientProvider from './context/ClientProvider';

import './globals.css';

export const metadata = {
  title: 'FACEGOV',
  description: 'El espacio para calificar políticos',
};

const bellotaText = Bellota_Text({
  weight: ['300', '400', '700'],
  display: 'swap',
  subsets: ['latin-ext'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={bellotaText.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ClientProvider>
          <Navbar />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
