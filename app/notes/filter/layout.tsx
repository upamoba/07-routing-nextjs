// 'use client';


import React from 'react';
import styles from './FilterLayout.module.css';

export default function NotesLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.listArea}>{children}</div>
      {preview && <div className={styles.previewContainer}>{preview}</div>}
    </div>
  );
}