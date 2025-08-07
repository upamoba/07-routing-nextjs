
'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import styles from './NoteDetails.module.css';
import type { Note } from '../../../types/note';
import { useParams } from 'next/navigation';

export interface NoteDetailsClientProps {
  initialNote: Note;
}

export default function NoteDetailsClient({ initialNote }: NoteDetailsClientProps) {
 const params = useParams() as { id?: string };
 const id = params.id ?? '';

  
 
  const {
    data: note = initialNote,
     isLoading,
    isError
    
  } = useQuery<Note, Error>({
 queryKey:['note', id],
  queryFn:() => fetchNoteById(id),
    enabled: !!id,            
      initialData: initialNote, 
      refetchOnMount: false,
      retry: false,
});
if (!id) {
    return <p>Note ID is missing.</p>;
  }

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>
          {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
