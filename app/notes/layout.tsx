
import type { ReactNode } from 'react'
import styles from './NotesLayout.module.css';


interface NotesLayoutProps {
  children: ReactNode       
  preview: ReactNode       
}

export default function NotesLayout({ children, preview }: NotesLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.listArea}>{children}</div>
      {preview && <div className={styles.previewContainer}>{preview}</div>}
    </div>
  )
}