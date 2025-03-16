
"use client"

import React from "react";
import "./globals.css";
import "./globals.scss";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import AddApartmentModal from "@/components/layouts/AddApartmentModal";
import { Providers } from "@/app/providers";
import "@ant-design/v5-patch-for-react-19";
import { useDisclosure } from "@heroui/react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <html lang="ru">
        <body>
          <Providers>
            <div className="app-wrapper">
              <Header handleOpenModal={onOpen} />
              <main className="content-wrapper">{children}</main>
              <Footer />
            </div>
          </Providers>
          {isOpen && <AddApartmentModal isOpen={isOpen} onClose={onClose} />}
        </body>
      </html>
  );
}
