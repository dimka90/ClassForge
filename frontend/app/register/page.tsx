// import Image from "next/image";

import Image from "next/image";
import Link from "next/link";

export default function RegisterAdmin() {
  return (
    <div className="bg-[url('/images/bg-image.jpg')] min-h-screen bg-cover bg-no-repeat bg-black/70 bg-blend-overlay">
      <div className="grid grid-cols-2 gap-10 px-44 pt-14">
        <div className="text-white">
          <div className="font-bold text-3xl pt-20 pb-14">ClassForge</div>
          <div className="w-[400px]">
            <h1 className="font-bold text-2xl">Management Meets Excellence.</h1>
            <p className="font-light text-sm mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Corrupti, soluta. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-t-2xl">
          <h3 className="font-medium text-2xl mb-6">Create an Account</h3>
          <form action="" className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col relative">
              <label
                htmlFor=""
                className="bg-white text-gray-700 px-1 absolute left-4 -top-2 text-xs"
              >
                Your Name
              </label>
              <input
                type="text"
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-3 focus:ring-1"
                placeholder="Debo Kuda"
              />
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor=""
                className="bg-white text-gray-700 px-1 absolute left-4 -top-2 text-xs"
              >
                Email
              </label>
              <input
                type="text"
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-3 focus:ring-1"
                placeholder="debokuda@gmail.com"
              />
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor=""
                className="bg-white text-gray-700 px-1 absolute left-4 -top-2 text-xs"
              >
                Password
              </label>
              <input
                type="password"
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-3 focus:ring-1"
                placeholder="**********"
              />
            </div>

            <button className="bg-[#212121] rouned-md text-white text-sm font-bold py-3 rounded-md">
              SIGN UP
            </button>
          </form>
          <div className="flex items-center my-5">
            <hr className="flex-grow border-gray-300" />
            <p className="text-center px-3 text-gray-700">or</p>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="text-gray-700 flex flex-col gap-3 text-sm">
            <button className="border border-gray-300 py-3 rounded-md flex justify-center gap-5">
              <Image
                src="/images/google.png"
                alt="google"
                width={18}
                height={18}
              />
              Sign up with Google
            </button>
            <button className="border border-gray-300 py-3 rounded-md flex justify-center gap-5">
              <Image
                src="/images/facebook.png"
                alt="google"
                width={18}
                height={18}
              />
              Sign up with Facebook
            </button>
            <button className="border border-gray-300 py-3 rounded-md flex justify-center gap-5">
              <Image
                src="/images/apple.png"
                alt="google"
                width={18}
                height={18}
              />
              Sign up with Apple
            </button>
          </div>
          <p className="text-center mt-6 text-xs text-gray-500">
            Already have an account?{" "}
            <span className="underline underline-offset-1 font-bold text-gray-900">
              <Link href="/login">LOGIN HERE</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
