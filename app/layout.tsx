import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ClientProvider from './context/ClientProvider';
import './globals.css';

export const metadata = {
  title: 'FACESGOV',
  description: 'El espacio para calificar políticos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
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
