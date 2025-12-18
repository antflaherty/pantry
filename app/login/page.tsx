import LoginForm from "@/app/ui/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
        <div className="px-6">
          <Link href="/signup" className="text-sm text-primary hover:underline">
            sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
