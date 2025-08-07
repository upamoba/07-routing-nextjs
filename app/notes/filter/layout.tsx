'use client';

import { PropsWithChildren, ReactNode } from 'react';
import styles from './FilterLayout.module.css';

type FilterLayoutProps = {

  sidebar?: ReactNode;
};

export default function FilterLayout({ children, sidebar }: PropsWithChildren<FilterLayoutProps>) {
   return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <section className={styles.content}>{children}</section>
    </div>
  );
}

