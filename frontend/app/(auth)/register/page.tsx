"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="bg-white rounded-xl flex flex-col justify-center p-4 sm:p-6 h-full max-h-[90vh] sm:max-h-[70h] lg:max-h-[60h] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col gap-5">
          <h3 className="font-medium text-xl sm:text-2xl mb-4">
            Create an Account
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col relative">
              <label
                htmlFor="name"
                className="bg-white text-gray-700 px-1 absolute left-4 -top-2 text-xs"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:border-black"
                placeholder="Debo Kuda"
              />
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor="email"
                className="bg-white text-gray-700 px-1 absolute left-4 -top-2 text-xs"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:border-black"
                placeholder="debokuda@gmail.com"
              />
            </div>
            <div className="flex flex-col relative">
              <label
              htmlFor="password"
              className="bg-white text-gray-700 px-1 absolute left-4 -top-2 text-xs"
              >
              Password
              </label>
              <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:border-black pr-10"
              placeholder="**********"
              />
              <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-400" : "bg-[#212121] hover:bg-black"
              } text-white text-sm font-bold py-2 rounded-md transition-colors mt-2 flex justify-center items-center`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>
          </form>

          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-300" />
            <p className="text-center px-3 text-gray-700 text-xs">or</p>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="text-gray-700 flex flex-col gap-2 text-xs">
            <button
              type="button"
              className="border border-gray-300 hover:border-gray-400 py-2 rounded-md flex justify-center items-center gap-2 transition-colors"
            >
              <Image
                src="/images/google.png"
                alt="google"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Sign up with Google
            </button>
            <button
              type="button"
              className="border border-gray-300 hover:border-gray-400 py-2 rounded-md flex justify-center items-center gap-2 transition-colors"
            >
              <Image
                src="/images/facebook.png"
                alt="facebook"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Sign up with Facebook
            </button>
            <button
              type="button"
              className="border border-gray-300 hover:border-gray-400 py-2 rounded-md flex justify-center items-center gap-2 transition-colors"
            >
              <Image
                src="/images/apple.png"
                alt="apple"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Sign up with Apple
            </button>
          </div>

          <p className="text-center mt-3 text-xs text-gray-500">
            Already have an account?{" "}
            <span className="underline underline-offset-1 font-bold text-gray-900 hover:text-black">
              <Link href="/login">LOGIN HERE</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
