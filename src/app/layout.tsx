
import React from "react";
import "./globals.css";
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
          <div className="app-wrapper">
            <Header />
            <main className="content-wrapper">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </Providers>
  );
}
