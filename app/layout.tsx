import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/data/profile";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.url),
  title: {
    default: PROFILE.name,
    template: `%s | ${PROFILE.name}`,
  },
  icons: {
    icon: '/favicon.ico', // Tambahkan path ke favicon Anda di sini
  },
  description: PROFILE.description,
  openGraph: {
    title: `${PROFILE.name}`,
    description: PROFILE.description,
    url: PROFILE.url,
    siteName: `${PROFILE.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${PROFILE.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}