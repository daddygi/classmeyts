import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classmeyt",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={comfortaa.className}>
          <div className="h-screen  w-screen bg-page-background">
            {children}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
