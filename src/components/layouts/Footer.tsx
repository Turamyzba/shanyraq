"use client";

import Link from "next/link";
import Container from "./Container";
import styles from "./Footer.module.scss";
import Images from "../common/Images";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div className={styles.logoSection}>
            <img src="/logo.svg" alt="Şañyraq" className={styles.logoIcon} />
            <h1>Şañyraq</h1>
          </div>

          <p className={styles.copyright}>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className={styles.link}>
              shanyraq.kz
            </Link>
            , все права защищены.
          </p>

          <div className={styles.socialIcons}>
            <Link href="https://t.me/shanyraq" target="_blank">
              <Images.Telegram className={styles.icon} />
            </Link>
            <Link href="https://instagram.com/shanyraq" target="_blank">
              <Images.Instagram className={styles.icon} />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
