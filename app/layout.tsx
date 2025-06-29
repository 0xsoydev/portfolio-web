import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from 'next/font/local';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = localFont({
  src: '../public/fonts/LexendVariable.ttf',
  display: 'swap',
  variable: '--font-lexend'
})

const dmSerif = localFont({
  src:'../public/fonts/DMSerif.ttf',
  display: 'swap',
  variable: '--font-dmSerif'
})

export const metadata: Metadata = {
  title: "Wahid Shaikh - Full Stack Developer & UI/UX Designer",
  description: "Portfolio of Wahid Shaikh - Full Stack Developer specializing in Web3, Next.js, React Native, and UI/UX Design. Explore my work experience, projects, and recent contributions.",
  keywords: "Wahid Shaikh, Full Stack Developer, UI/UX Designer, Web3, Next.js, React Native, Portfolio",
  authors: [{ name: "Wahid Shaikh" }],
  creator: "Wahid Shaikh",
  openGraph: {
    title: "Wahid Shaikh - Full Stack Developer & UI/UX Designer",
    description: "Portfolio showcasing full stack development projects, UI/UX designs, and Web3 applications",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wahid Shaikh - Full Stack Developer & UI/UX Designer",
    description: "Portfolio showcasing full stack development projects, UI/UX designs, and Web3 applications",
    creator: "@0xwahidshaikh",
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
  verification: {
    google: '', // Add your Google Search Console verification code if needed
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${dmSerif.variable} antialiased`}
      >
        <main className="pt-8">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
