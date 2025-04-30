"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-md transition-all duration-300">
        <h1 className="text-2xl font-bold text-center mb-6 tracking-tight">
          Welcome Back
        </h1>

        <p className="text-center text-sm text-gray-300 mb-8">
          Sign in to contribute housing tips or find your next home.
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 rounded-xl py-3 px-6 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
        >
          <FcGoogle className="h-5 w-5" />
          <span>Continue with Google</span>
        </button>

        <div className="mt-8 text-center text-xs text-gray-400">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
