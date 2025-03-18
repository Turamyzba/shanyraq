"use client";

import React from "react";
import Link from "next/link";
import styles from "./MobileHeader.module.scss";
import { ChevronDown } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function MobileHeader() {
  const [selectedCity, setSelectedCity] = React.useState("Астана");

  const cities = [
    { key: "astana", label: "Астана" },
    { key: "almaty", label: "Алматы" },
    { key: "shymkent", label: "Шымкент" },
    { key: "oral", label: "Орал" },
    { key: "karaganda", label: "Қарағанды" },
  ];

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="Şañyraq" className={styles.logoImage} />
          <span className={styles.logoText}>Şañyraq</span>
        </Link>

        <Dropdown>
          <DropdownTrigger>
            <Button
              className={styles.citySelector}
              variant="light"
              endContent={<ChevronDown size={16} />}
            >
              {selectedCity}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Выбор города">
            {cities.map((city) => (
              <DropdownItem key={city.key} onClick={() => setSelectedCity(city.label)}>
                {city.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
