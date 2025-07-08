import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChiroStore - VirtuSIM Virtual Phone Numbers",
  description: "Professional virtual phone number service for SMS verification with competitive pricing and profit tracking",
  keywords: "virtual phone number, SMS verification, VirtuSIM, Indonesia, Telkomsel, Indosat, Axis",
  authors: [{ name: "ChiroStore" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
