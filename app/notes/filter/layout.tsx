'use client';

import { PropsWithChildren, ReactNode } from 'react';
import SidebarNotes from './@sidebar/SidebarNotes'
import styles from './FilterLayout.module.css';

type FilterLayoutProps = {
children: ReactNode
  sidebar?: ReactNode;
};

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
   return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <section className={styles.content}>{children}</section>
    </div>
  );
}

