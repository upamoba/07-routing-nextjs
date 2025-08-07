// import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '../../../../lib/api';
import NotesClient from './Notes.client';
// import { NoteTag } from '@/types/note';
import type { FilterTag } from '@/types/note'

interface Props { params: { slug?: string[] } }

export default async function FilteredNotesPage({ params }: Props) {
  const tag = params.slug?.[0] as FilterTag | undefined;
  const initialData: FetchNotesResponse = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: tag ?? 'All',
  });
  return <NotesClient initialData={initialData} tag={tag ?? 'All'} />;
}