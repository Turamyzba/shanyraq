'use client';

import { Button } from '@heroui/react';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
        <h1 className={"bg-red-500"}>Добро пожаловать в Shanyraq!</h1>
        <Button color="primary">Hero UI Button</Button>
    </main>
  );
}
