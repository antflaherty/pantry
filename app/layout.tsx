import "./globals.css";
import { cal_sans } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cal_sans.className}>
        <header>
          <p className="text-9xl">pantry</p>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
