import type { Metadata } from "next";
import { Fraunces, Libre_Franklin, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnyBook: Any Book, Every Angle",
  description:
    "Search AnyBook's library of hand-written summaries, six angles deep: argument, chapters, quotes, real world use, pushback, and author background. Can't find a title? Request it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${libreFranklin.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
