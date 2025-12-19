"use client";

import { useState, useActionState } from "react";
import { signUp } from "@/app/lib/actions";
import clsx from "clsx";
import LoadingSpinner from "./loading-spinner";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUp, undefined);

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

  if (isPending) {
    return <LoadingSpinner />;
  }

  function handlePasswordChange(target: HTMLInputElement) {
    const isPassword = target.id === "password";

    const newPasswords = isPassword
      ? { ...passwords, password: target.value }
      : { ...passwords, confirmPassword: target.value };

    setPasswords(newPasswords);

    if (
      newPasswords.password?.length > 0 &&
      newPasswords.confirmPassword.length > 0 &&
      newPasswords.password !== newPasswords.confirmPassword
    ) {
      setIsPasswordsMatch(false);
    } else {
      setIsPasswordsMatch(true);
    }
  }

  return (
    <form action={formAction}>
      <div className="flex-1 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>sign up</h1>
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
                defaultValue={state?.inputs?.email}
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
                defaultValue={state?.inputs?.password}
                onChange={({ target }) => handlePasswordChange(target)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="confirm-password"
            >
              confirm password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirm-password"
                type="password"
                name="confirm-password"
                placeholder="confirm password"
                required
                minLength={6}
                defaultValue={state?.inputs?.confirmPassword}
                onChange={({ target }) => handlePasswordChange(target)}
                aria-describedby="password-error"
                aria-invalid={!isPasswordsMatch}
              />
            </div>
            <p
              id="password-error"
              aria-live="polite"
              className={clsx("text-sm text-red-500", {
                invisible: isPasswordsMatch,
              })}
            >
              passwords don&apos;t match
            </p>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-center">
          <button
            className="flex mt-4 bg-primary h-10 items-center justify-center rounded-lg px-6 text-sm transition-all hover:opacity-80 active:scale-95"
            aria-disabled={isPending}
          >
            sign up
          </button>
        </div>
        <div className="flex h-8 items-end space-x-1">
          {state?.message && (
            <>
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
