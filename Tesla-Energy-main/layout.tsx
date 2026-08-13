import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tesla Ecosystem Marketplace | Vehicles, Energy & Robotics",
  description:
    "A premium digital marketplace experience for Tesla vehicles, energy systems, robotics, opportunities, and private community sessions.",
  keywords: [
    "Tesla ecosystem",
    "Tesla vehicles",
    "Tesla Energy",
    "Powerwall",
    "Solar",
    "Optimus",
    "Cybertruck",
    "robotics",
    "energy marketplace",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tesla Ecosystem Marketplace",
    description:
      "Explore vehicles, energy, robotics and premium ecosystem opportunities in one high-performance platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-black">
      <body className={`${inter.variable} antialiased min-h-full`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
