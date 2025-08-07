import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {  ReactNode } from 'react';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';


export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  )
}