import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Decarbeon",
  description: "Sustainable future starts here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
