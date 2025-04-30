"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";

export default function Header() {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/login" && (
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">
              <Link href={"/"}> Neighbor Crowd</Link>
            </h1>

            <AuthButton />
          </div>
        </header>
      )}
    </>
  );
}
