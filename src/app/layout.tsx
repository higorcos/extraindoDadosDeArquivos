import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sistema Folha de pagamento",
  description: "Registro de folhas",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="pt-BR">
      <ToastContainer/>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}


