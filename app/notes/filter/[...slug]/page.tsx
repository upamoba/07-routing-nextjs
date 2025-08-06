import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

type Props = { params: { slug?: string[] } };

export default async function FilteredNotesPage({ params: { slug } }: Props) {
  const tag = slug?.[0]; 
  const qc = new QueryClient();
   await qc.prefetchQuery({
   queryKey: ['notes', 1, tag ?? ''],
   queryFn: () => fetchNotes({ page: 1, perPage: 12, search: tag ?? '' }),
 });
  return <NotesClient initialState={dehydrate(qc)} filterTag={tag} />;
}