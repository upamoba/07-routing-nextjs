import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { PropsWithChildren, ReactNode } from 'react';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

interface RootLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function RootLayout({ children, modal }: PropsWithChildren<RootLayoutProps>) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          {children}
          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}