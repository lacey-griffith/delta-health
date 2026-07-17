import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delta Health",
  description: "Organize and track your VA and community care in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
