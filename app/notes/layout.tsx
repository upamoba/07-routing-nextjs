
import type { ReactNode } from 'react'
import styles from './NotesLayout.module.css';


interface NotesLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  modal: ReactNode
}

export default function NotesLayout({
  children,
  sidebar,
  modal,
}: NotesLayoutProps) {
  return (
    <div className={styles.wrapper}>
   
      <aside className={styles.sidebar}>{sidebar}</aside>

     
      <section className={styles.content}>{children}</section>

    
      {modal}
    </div>
  )
}