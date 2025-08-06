import React, { PropsWithChildren } from 'react';
import SidebarNotes from './@sidebar/SidebarNotes';
import styles from './FilterLayout.module.css';

export default function FilterLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SidebarNotes />
      </aside>
      <section className={styles.content}>{children}</section>
    </div>
  );
}
