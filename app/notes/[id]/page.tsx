import { fetchNoteById } from '@/lib/api';  
import type { AxiosError } from 'axios';
import { notFound } from 'next/navigation';
import type { Note } from '../../../types/note';
import NoteDetailsClient from './NoteDetails.client';
interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  let initialNote: Note;
  //  const { id } = params;

  try {
    initialNote = await fetchNoteById(params.id);
  } catch (err: unknown) {
    
    if (
      typeof err === 'object' &&
      err !== null &&
      'isAxiosError' in err &&
      (err as AxiosError).response?.status === 404
    ) {
      notFound();
    }
 
    throw err;
  }

  return <NoteDetailsClient initialNote={initialNote} />;
}