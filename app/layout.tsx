import { Bellota_Text } from 'next/font/google';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ClientProvider from './context/ClientProvider';

import './globals.css';

export const metadata = {
  title: 'FACESGOV',
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
