import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-white rounded-xl flex flex-col justify-center p-4 sm:p-6 h-full max-h-[90vh] overflow-y-auto">
      <div className="w-full max-w-md mx-auto flex flex-col gap-5">
        <h3 className="font-medium text-xl sm:text-2xl mb-4">
          Create an Account
        </h3>
        <form action="" className="flex flex-col gap-3 text-sm">
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
              type="password"
              id="password"
              className="border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:border-black"
              placeholder="**********"
            />
          </div>

          <button className="bg-[#212121] hover:bg-black text-white text-sm font-bold py-2 rounded-md transition-colors mt-2">
            SIGN UP
          </button>
        </form>

        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-300" />
          <p className="text-center px-3 text-gray-700 text-xs">or</p>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="text-gray-700 flex flex-col gap-2 text-xs">
          <button className="border border-gray-300 hover:border-gray-400 py-2 rounded-md flex justify-center items-center gap-2 transition-colors">
            <Image
              src="/images/google.png"
              alt="google"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Sign up with Google
          </button>
          <button className="border border-gray-300 hover:border-gray-400 py-2 rounded-md flex justify-center items-center gap-2 transition-colors">
            <Image
              src="/images/facebook.png"
              alt="facebook"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Sign up with Facebook
          </button>
          <button className="border border-gray-300 hover:border-gray-400 py-2 rounded-md flex justify-center items-center gap-2 transition-colors">
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
  );
}
