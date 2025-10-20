"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { handleLogin } from "@/app/auth/handleSubmit";
import Link from "next/link";

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try{
      const data = await handleLogin(email, password);

      if(data.user.role === "admin"){
        
        router.push("/dashboard");

      }else{

        router.push("/")

      }

    }catch (err){

      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat login");

    }finally{

      setIsLoading(false);

    }

  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/logo/Asset-4.png"
            width={100}
            height={100}
            className="mx-auto w-auto"
          />
          <h2
            className="mt-10 text-center text-2xl font-bold tracking-tight"
            style={{ color: "var(--primary)" }}>
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[#7A1515] focus:outline-none sm:text-sm"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[#7A1515] focus:outline-none sm:text-sm"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[#a33c3c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1515]">
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-[var(--primary)] hover:text-[#a33c3c]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
