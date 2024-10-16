import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Board games catalog",
  description: "Discover your next favorite game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
