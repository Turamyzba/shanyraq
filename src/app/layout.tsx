"use client";

import "./globals.scss";
import { HeroUIProvider } from "@heroui/react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <html lang="ru">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </HeroUIProvider>
  );
}
