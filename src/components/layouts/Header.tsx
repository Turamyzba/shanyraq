"use client";

import Link from "next/link";
import Container from "./Container";
import Images from "../common/Images";
import styles from "./Header.module.scss";
import { useMemo, useState } from "react";
import {
  Navbar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import type { MenuProps } from "antd";
import { Dropdown as DropdownAnt } from "antd";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [local, setLocal] = useState("kz");
  const [selectedKeys, setSelectedKeys] = useState(new Set(["astana"]));
  const selectedCity = useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);

  const [isOspan, setIsOspan] = useState(true);

  const cities = [
    { key: "astana", label: "Астана" },
    { key: "almaty", label: "Алматы" },
    { key: "shymkent", label: "Шымкент" },
    { key: "oral", label: "Орал" },
    { key: "karaganda", label: "Қарағанды" },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/profile">Мой профиль</Link>,
    },
    {
      key: "2",
      label: <Link href="/logout">Выйти</Link>,
    },
  ];

  return (
    <Container>
      <Navbar shouldHideOnScroll maxWidth="full" height="auto" className={styles.navbar}>
        <header className={styles.header}>
          <div className={styles.topBar}>
            <div className={styles.location}>
              <Images.Map size={18} />
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" variant="bordered" size="sm">
                    {cities.find((city) => city.key === selectedCity)?.label || "Выбрать город"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Выбор города"
                  selectedKeys={selectedKeys}
                  selectionMode="single"
                  variant="flat"
                  onSelectionChange={(keys) => {
                    if (keys.currentKey) {
                      setSelectedKeys(new Set([keys.currentKey]));
                    }
                  }}
                >
                  {cities.map((city) => (
                    <DropdownItem key={city.key} textValue={city.label}>
                      {city.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Images.ChevronDown size={16} />
            </div>

            <div className={styles.actions}>
              <Button
                size="sm"
                className={styles.themeToggle}
                onPress={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Images.Moon size={20} /> : <Images.Sun size={20} />}
              </Button>

              <div className={styles.languageSwitch}>
                <Button
                  className={local === "ru" ? styles.activeLang : styles.inactiveLang}
                  onPress={() => setLocal("ru")}
                >
                  Рус
                </Button>
                <Button
                  className={local === "kz" ? styles.activeLang : styles.inactiveLang}
                  onPress={() => setLocal("kz")}
                >
                  Қаз
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.mainNav}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.svg" alt="Şañyraq" className={styles.logoIcon} />
              <h1>Şañyraq</h1>
            </Link>

            <div className={styles.searchBar}>
              <div className={styles.searchItem}>
                <p>Астана</p>
              </div>
              <div className={styles.searchItem}>
                <p>150 000-200 000</p>
              </div>
              <div className={styles.searchItem}>
                <p>Мужчины</p>
              </div>
              <div className={styles.searchItem}>
                <p>3 жителей</p>
              </div>
              <Button className={styles.searchButton}>
                <Images.Search size={18} />
              </Button>
            </div>

            <div className={styles.profileActions}>
              {!isOspan && (
                <Button className={styles.loginButton} as={Link} href="/login" variant="bordered">
                  Войти
                </Button>
              )}

              <Button className={styles.createAdButton}>
                Подать объявление
                <Images.Plus size={16} />
              </Button>

              <DropdownAnt menu={{ items }} placement="bottomRight">
                <Button className={styles.profileIcon} isIconOnly variant="bordered">
                  <Images.User color="#1aa683" size={20} />
                </Button>
              </DropdownAnt>
            </div>
          </div>
        </header>
      </Navbar>
    </Container>
  );
}
