"use client";

import Container from "./Container";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p>© {new Date().getFullYear()} Shanyraq. Все права защищены.</p>
      </Container>
    </footer>
  );
}
