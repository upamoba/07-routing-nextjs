'use client';

import { ReactNode } from 'react';
import styles from './FilterLayout.module.css';

type LayoutProps = {
children: ReactNode
  preview: ReactNode;
};

export default function FilterLayout({ children, preview }: LayoutProps) {
   return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{preview}</aside>
      <section className={styles.content}>{children}</section>
    </div>
  );
}

