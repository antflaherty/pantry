import { Metadata } from "next";
import Image from "next/image";

import "@/app/globals.css";
import { cal_sans } from "@/app/ui/fonts";

import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: { template: "%s | pantry", default: "pantry" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <html lang="en">
      <body className={cal_sans.className}>
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="./icon.svg"
              width="80"
              height="80"
              alt="garlic icon"
              className="mt-2"
            ></Image>
            <p className="text-6xl">pantry</p>
          </div>
          {isLoggedIn && (
            <button
              onClick={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
              className="text-sm text-link hover:underline"
            >
              sign out
            </button>
          )}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
