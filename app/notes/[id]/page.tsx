import { fetchNoteById } from '@/lib/api';  
import NoteDetails from './NoteDetails.client';


export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const note = await fetchNoteById(params.id);
 return <NoteDetails noteId={note.id} />;

}