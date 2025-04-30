import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import AuthProvider from "./components/AuthProvider";
import Header from "./components/Header";
import "./globals.css";

const lus = Plus_Jakarta_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neighbour Crowd",
  description: "Community-driven house hunting platform based on real people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lus.className}>
        <AuthProvider>
          <Header />
        </AuthProvider>
        <main>{children}</main>
      </body>
    </html>
  );
}
