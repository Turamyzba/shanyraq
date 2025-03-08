"use client";

import Link from "next/link";
import Container from "./Container";
import Images from "../common/Images";
import styles from "./Header.module.scss";
import { useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        {/* Top Bar */}
        <div className={styles.topBar}>
          {/* Location */}
          <div className={styles.location}>
            <Images.Map size={18} />
            <p>Астана</p>
            <Images.ChevronDown size={16} />
          </div>

          {/* Theme Toggle & Language */}
          <div className={styles.actions}>
            {/* Theme Toggle */}
            <button className={styles.themeToggle} onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Images.Moon size={20} /> : <Images.Sun size={20} />}
            </button>

            {/* Language Switch */}
            <div className={styles.languageSwitch}>
              <button className={styles.activeLang}>Рус</button>
              <button>Қаз</button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className={styles.mainNav}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="/logo.svg" alt="Şañyraq" className={styles.logoIcon} />
            <h1>Şañyraq</h1>
          </Link>

          {/* Search Bar */}
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
            <button className={styles.searchButton}>
              <Images.Search size={18} />
            </button>
          </div>

          {/* Profile Actions */}
          <div className={styles.profileActions}>
            <button className={styles.createAdButton}>
              Подать объявление
              <Images.Plus size={16} />
            </button>
            <button className={styles.profileIcon}>
              <Images.User size={20} />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
