'use client';

import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Добро пожаловать в Shanyraq!</h1>
        <Button color="primary">Hero UI Button</Button>
      </motion.div>
    </main>
  );
}
