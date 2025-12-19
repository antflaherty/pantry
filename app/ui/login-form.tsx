"use client";

import { useActionState } from "react";

import LoadingSpinner from "@/app/ui/loading-spinner";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <form action={formAction}>
      <div className="flex-1 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>login</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-center">
          <button
            className="flex mt-4 bg-primary h-10 items-center justify-center rounded-lg px-6 text-sm transition-all hover:opacity-80 active:scale-95"
            aria-disabled={isPending}
          >
            log in
          </button>
        </div>
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
      <input type="hidden" name="redirectTo" value="/pantry" />
    </form>
  );
}
