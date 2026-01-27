import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HFTCode - Quant Trading Platform",
  description: "Master High-Frequency Trading and Quantitative Finance algorithms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Navbar />
          {/* Main Content Area with padding for fixed navbar */}
          <main className="flex-1 pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
