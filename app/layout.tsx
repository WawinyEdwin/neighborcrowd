import AuthButton from "@/app/components/AuthButton";
import type { Metadata } from "next";
import { Lustria } from "next/font/google";
import Link from "next/link";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";

const lus = Lustria({
  weight: "400",
  subsets: ["latin"]
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
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">
                <Link href={"/"}> Neighbor Crowd</Link>
              </h1>
              <AuthButton />
            </div>
          </header>
        </AuthProvider>
        <main>{children}</main>
      </body>
    </html>
  );
}
