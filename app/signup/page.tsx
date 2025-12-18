import Link from "next/link";

import SignupForm from "@/app/ui/signup-form";

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <SignupForm />
        <div className="px-6">
          <Link href="/login" className="text-sm text-link hover:underline">
            back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
