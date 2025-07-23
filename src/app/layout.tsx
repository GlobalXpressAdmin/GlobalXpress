import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "../components/ConditionalNavbar";
import './fonts.css';
import Footer from "../components/Footer";
import WhatsappButton from '../components/WhatsappButton';
import Providers from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Express - Tu página web",
  description: "Página web profesional de Global Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ConditionalNavbar />
          <main>
            {children}
            <WhatsappButton />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
