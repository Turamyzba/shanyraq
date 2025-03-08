"use client";

import "./globals.scss";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Providers } from "@/app/providers";
import "@ant-design/v5-patch-for-react-19";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="ru">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
