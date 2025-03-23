"use client";
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

import LoadingScreen from "@/components/common/LoadingScreen";
import "@ant-design/v5-patch-for-react-19";
import { useDisclosure } from "@heroui/react";
import AddApartmentModal from "@/components/layouts/AddApartmentModal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <html lang="ru">
      <body>
        <Providers>
          <div className="app-wrapper">
            {isMobile ? <MobileHeader /> : <Header handleOpenModal={onOpen} />}
            <main className="content-wrapper">
              <LoadingScreen />
              {children}
            </main>
            {!isMobile && <Footer />}
            {isMobile && <MobileNavigation />}
          </div>
          {isOpen && <AddApartmentModal isOpen={isOpen} onClose={onClose} />}
        </Providers>
      </body>
    </html>
  );
}
