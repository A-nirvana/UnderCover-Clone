import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/ToggleTheme";
import { UserProvider } from "./userProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UnderCover",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <div className="absolute right-0 top-0 m-2">
              <ModeToggle />
            </div>
            <main>{children}</main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
