
import type { ReactNode } from 'react'
import styles from './NotesLayout.module.css';


interface NotesLayout {
  children: ReactNode       
  preview: ReactNode       
}
export default function NotesLayout({ children, preview }: { children: React.ReactNode; preview: React.ReactNode }) 
// export default function NotesLayout({ children, preview }: NotesLayoutProps) 
{
  return (
    <div className={styles.wrapper}>
      <div className={styles.listArea}>{children}</div>
      {preview && <div className={styles.previewContainer}>{preview}</div>}
    </div>
  )
}