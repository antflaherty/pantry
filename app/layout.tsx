import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1 className="text-4xl font-bold">pantry</h1>
        {children}
      </body>
    </html>
  );
}
