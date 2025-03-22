"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";
import "./globals.css";
import "./globals.scss";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import MobileNavigation from "@/components/layouts/mobile/MobileNavigation";
import MobileHeader from "@/components/layouts/mobile/MobileHeader";
import { Providers } from "@/app/providers";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingScreen from "@/components/common/LoadingScreen";
import "@ant-design/v5-patch-for-react-19";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Providers>
      <LoadingProvider>
        <html lang="ru">
          <body>
            <div className="app-wrapper">
              {isMobile ? <MobileHeader /> : <Header />}
              <main className="content-wrapper">
                <LoadingScreen />
                {children}
              </main>
              {!isMobile && <Footer />}
              {isMobile && <MobileNavigation />}
            </div>
          </body>
        </html>
      </LoadingProvider>
    </Providers>
  );
}
