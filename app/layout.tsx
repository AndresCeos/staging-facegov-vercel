import { Bellota_Text } from 'next/font/google';
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
        <Script id="tag-manager">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WW786TDW');
          `}
        </Script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EKBGM9074E"
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EKBGM9074E');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WW786TDW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
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
