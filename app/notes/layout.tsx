// import React, { PropsWithChildren } from 'react';
import type { ReactNode } from 'react'
import styles from './NotesLayout.module.css';

// export default function NotesLayout({
//   children,
//   preview,
// }: PropsWithChildren<{ preview?: React.ReactNode }>) {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.listArea}>{children}</div>
//       {preview && <div className={styles.previewContainer}>{preview}</div>}
//     </div>
//   );
// }
export default function NotesLayout({
  children,
  preview,
}: {
  children: ReactNode
  preview: ReactNode
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.listArea}>{children}</div>
      {preview && <div className={styles.previewContainer}>{preview}</div>}
    </div>
  )
}