import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECE MATLAB Helper",
  description: "Your intelligent ECE MATLAB practical assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -left-40 -top-32 h-112 w-md rounded-full bg-[radial-gradient(circle_at_center,var(--glow-primary),transparent_70%)] blur-3xl opacity-60" />
              <div className="absolute -right-48 top-[20%] h-136 w-136 rounded-full bg-[radial-gradient(circle_at_center,var(--glow-secondary),transparent_70%)] blur-[120px] opacity-70" />
              <div className="absolute left-[25%] -bottom-72 h-128 w-lg rounded-full bg-[radial-gradient(circle_at_center,var(--glow-tertiary),transparent_70%)] blur-[120px] opacity-40" />
            </div>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
