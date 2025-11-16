import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "From Deven",
  description: "A private note awaits you.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
