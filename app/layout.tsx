import { Bellota_Text } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EKBGM9074E" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-EKBGM9074E');
          `}
        </Script>
      </head>
      <body>
        <ClientProvider>
          <Navbar />
          {children}
          <Footer />
        </ClientProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
