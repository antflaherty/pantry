import "./globals.css";
import { cal_sans } from "@/app/ui/fonts";

import { signOut } from "@/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cal_sans.className}>
        <header className="flex items-start justify-between">
          <p className="text-6xl">pantry</p>
          <button
            onClick={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
            className="text-sm text-link hover:underline"
          >
            sign out
          </button>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
