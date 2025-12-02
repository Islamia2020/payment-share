import Image from "next/image";
import { FaSignInAlt } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-40 px-16 bg-white dark:bg-black sm:items-start">
        <img
          alt="Payment Share"
          src="https://www.citypng.com/public/uploads/preview/hd-black-hand-to-hand-money-cash-payment-icon-transparent-png-701751694974663tfjsmuftvt.png"
          className="mx-auto h-20 w-auto"
        />
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to the PAYMENT SHARE
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Let's do your first payment.{" "}

          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/auth/login"
            rel="noopener noreferrer"
          >
            <FaSignInAlt/>
            Sign in
          </a>
          <a
            className="flex h-12 w-full items-center gap-2 justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="/auth/register"
            rel="noopener noreferrer"
          >
            <FaPlusSquare/>
            Sign up
          </a>
        </div>
      </main>
    </div>
  );
}
