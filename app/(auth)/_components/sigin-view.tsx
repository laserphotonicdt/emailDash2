import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "./user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import quotes from '@/constants/quotes.json';

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
  return quotes.quotes[randomIndex];
}

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignInViewPage() {
  const { text, author } = getRandomQuote();
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-dark p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <img
          className="h-full w-full absolute inset-0 object-cover opacity-30"
          src="/laser-photonics-splash.jpg"
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            id="lplogo"
            width="170"
            height="54"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 776.987 209.84"
          >
            <path
              d="M783.48 1573.83H426.164l-121.98-256.52h357.32l121.976 256.52M638.578 1269.11H281.266l-36.45-76.65h357.321l36.441 76.65M825 899.91l-361.969.028 56.813 119.472H162.527L0 677.629h719.285L825 899.91M579.215 1144.27h-357.32l-36.446-76.65h357.317l36.449 76.65"
              className="logoLaser"
              fill="#ec1d27"
              transform="matrix(.13333 0 0 -.13333 0 209.84)"
            ></path>
            <path
              d="M659.453 552.84H1016.9l36.41 76.566H695.859l-36.406-76.566M1478.04 504.621h-407.97l-36.41-76.57 393.49.168s23.24 20.601 50.89 76.402M1499.13 552.84c8.5 21.984 16.97 47.367 24.93 76.566h-300.02l-36.42-76.566h311.51M577.184 379.828 396.57 0h357.442l180.617 379.828H577.184M1076.24 677.629l4.48 9.434c16.79 32.414 50.24 52.933 86.93 52.933h2.08c35.08 0 62.88-31.93 67.4-62.367h298.13c.13.598.23.992.25.992 2.55 16.582 31.05 131.34-54.94 194.317-27.67 22.148-54.65 27.316-54.65 27.316l-601.424-.32-105.707-222.305h357.451M993.969 504.621H636.523l-36.41-76.57h357.45l36.406 76.57"
              className="logoPhotonics"
              fill="#fff"
              transform="matrix(.13333 0 0 -.13333 0 209.84)"
            ></path>
            <path
              d="M1842.46 704.09v683.32h119.36V823.457h459.63V704.09h-578.99M3223.27 704.09l-102.45 172h-323.33l56.39 96.812h209.6l-152.26 255.658-310.17-524.47h-136.29l392.88 654.18c14.1 23.5 31.96 38.54 58.28 38.54s43.23-15.04 57.33-38.54l393.83-654.18h-143.81M3396.22 704.09v119.367h512.25c63.92 0 99.63 35.723 99.63 89.293 0 58.277-35.71 88.35-99.63 88.35h-313.93c-128.77 0-208.66 81.78-208.66 194.56 0 109.98 74.25 191.75 210.54 191.75h490.64v-119.37h-490.64c-54.51 0-86.47-31.96-86.47-83.65 0-51.69 32.89-82.71 85.53-82.71h312.99c138.17 0 212.42-64.86 212.42-197.391 0-114.672-69.55-200.199-212.42-200.199h-512.25M4394.05 1001.1v100.58h378.79V1001.1Zm-205.84-297.01v683.32h610v-119.37h-491.57V823.457h492.52V704.09h-610.95M5513.53 704.09l-172.95 189.859h-255.65v105.274h284.79c85.54 0 130.65 48.867 130.65 137.227 0 88.35-48.88 131.59-130.65 131.59h-372.21V704.09h-118.42v683.32h490.63c156.03 0 248.14-96.81 248.14-249.08 0-112.79-52.64-192.685-140.99-226.521l205.84-207.719h-169.18"
              className="logoLaser"
              fill="#ec1d27"
              transform="matrix(.13333 0 0 -.13333 0 209.84)"
            ></path>
            <path
              d="M1963.85 302.191v68.18h161.86c49.34 0 78.72 31.039 78.72 76.5 0 46.559-29.38 75.938-78.72 75.938H1912.3v-332.59h-69.84v402.98h283.25c93.13 0 147.45-55.98 147.45-144.121 0-87.027-54.32-146.887-147.45-146.887h-161.86M2647.35 188.559v175.16h-202.88v62.64h202.88v166.84h70.4v-404.64zm-324.27 0v404.64h70.39v-404.64h-70.39M3069.77 260.621c74.27 0 126.93 55.981 126.93 131.918 0 75.941-52.66 130.27-126.93 130.27h-98.12c-72.06 0-125.27-53.778-125.27-130.27 0-75.937 52.66-131.918 125.27-131.918zm-98.12-70.402c-112.52 0-195.67 88.691-195.67 205.652 0 118.629 83.15 197.328 195.67 197.328h98.12c116.4 0 197.33-80.371 197.33-197.328 0-116.961-82.59-205.652-197.33-205.652h-98.12M3443.96 190.219v332.59h-152.99v70.39h376.38v-70.39h-152.99v-332.59h-70.4M3986.66 260.621c74.27 0 126.93 55.981 126.93 131.918 0 75.941-52.66 130.27-126.93 130.27h-98.12c-72.06 0-125.28-53.778-125.28-130.27 0-75.937 52.67-131.918 125.28-131.918zm-98.12-70.402c-112.53 0-195.67 88.691-195.67 205.652 0 118.629 83.14 197.328 195.67 197.328h98.12c116.4 0 197.33-80.371 197.33-197.328 0-116.961-82.59-205.652-197.33-205.652h-98.12M4306.52 485.109v-294.89h-67.07v365.84c0 26.058 13.86 42.132 36.03 42.132 10.53 0 19.4-3.875 29.93-14.414l284.37-282.136v294.89h67.07V227.359c0-26.609-14.41-42.129-34.92-42.129-11.64 0-22.17 4.989-32.15 14.961l-283.26 284.918M4728.94 190.219v402.98h70.4v-402.98h-70.4M5057.1 190.219c-112.53 0-195.67 88.691-195.67 205.652 0 118.629 83.14 197.328 195.67 197.328h218.4v-70.39h-218.4c-72.06 0-125.28-53.778-125.28-130.27 0-75.937 52.66-131.918 125.28-131.918h218.4v-70.402h-218.4M5332.63 190.219v70.402h302.1c37.69 0 58.75 21.059 58.75 52.66 0 34.36-21.06 52.098-58.75 52.098h-185.15c-75.94 0-123.06 48.223-123.06 114.75 0 64.851 43.8 113.07 124.17 113.07h289.36v-70.39h-289.36c-32.15 0-50.99-18.848-50.99-49.34 0-30.489 19.4-48.778 50.44-48.778h184.59c81.48 0 125.27-38.25 125.27-116.41 0-67.621-41.02-118.062-125.27-118.062h-302.1"
              className="logoPhotonics"
              fill="#fff"
              transform="matrix(.13333 0 0 -.13333 0 209.84)"
            ></path>
            <path
              d="M5724.32 1287.82h9.61c11.22 0 20.29 3.81 20.29 13.09 0 8.19-5.87 13.63-18.69 13.63-5.34 0-9.08-.54-11.21-1.08zm-.54-50.73h-20.29v89.46c8.01 1.63 19.22 2.73 33.64 2.73 16.56 0 24.04-2.73 30.45-6.54 4.81-3.83 8.55-10.91 8.55-19.64 0-9.83-7.48-17.47-18.17-20.74v-1.09c8.55-3.27 13.35-9.81 16.03-21.82 2.66-13.63 4.27-19.09 6.4-22.36h-21.89c-2.68 3.27-4.28 11.46-6.94 21.83-1.61 9.81-6.95 14.17-18.17 14.17h-9.61zm-53.94 46.91c0-39.82 28.83-71.46 68.37-71.46 38.44 0 66.76 31.64 66.76 70.92 0 39.82-28.32 71.99-67.3 71.99-39 0-67.83-32.17-67.83-71.45zm157.56 0c0-50.72-38.99-90.54-89.73-90.54-50.21 0-90.27 39.82-90.27 90.54 0 49.64 40.06 89.46 90.27 89.46 50.74 0 89.73-39.82 89.73-89.46"
              className="logoLaser"
              fill="#ec1d27"
              transform="matrix(.13333 0 0 -.13333 0 209.84)"
            ></path>
          </svg>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
          <p className="text-lg">&ldquo;{text}&ldquo;</p>
            <footer className="text-sm">- {author}</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to the Data Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
