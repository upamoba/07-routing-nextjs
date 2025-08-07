// 'use client';

// import { ReactNode } from 'react';
import React from 'react';
import styles from './FilterLayout.module.css';

// type LayoutProps = {
// children: ReactNode
//   preview: ReactNode;
// };

// export default function FilterLayout({ children, preview }: LayoutProps) {
//    return (
//     <div className={styles.container}>
//       <aside className={styles.sidebar}>{preview}</aside>
//       <section className={styles.content}>{children}</section>
//     </div>
//   );
// }

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <section className={styles.content}>{children}</section>
    </div>
  );
}