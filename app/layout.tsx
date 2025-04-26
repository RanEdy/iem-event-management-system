import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoginProvider } from "@/components/loginUI/LoginProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IEM Event Management System",
  description: "Event Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginProvider>
          {children}
        </LoginProvider>
      </body>
    </html>
  );
}
