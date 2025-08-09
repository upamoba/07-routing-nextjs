
import { QueryClient } from '@tanstack/react-query'
import { fetchNotes,} from '@/lib/api'
import type { FilterTag } from '@/types/note';
import NotesClient from './Notes.client'


type PageProps = {
  params: Promise< {
    slug: string[]
  }>
}
const ALLOWED = ['All','Todo','Work','Personal','Meeting','Shopping'] as const;
const asFilterTag = (v?: string): FilterTag | undefined =>
  v && (ALLOWED as readonly string[]).includes(v) ? (v as FilterTag) : undefined;


export default async function FilteredNotesPage({ params }: PageProps) {

  const {slug} = await params
   const filterTag = asFilterTag(slug?.[0]);
const tag = Array.isArray(slug) && slug.length > 0 ? slug[0] : ''
  const qc = new QueryClient()
  await qc.prefetchQuery({
  queryKey: ['notes', 1, tag],
  queryFn: () => fetchNotes({ page: 1, perPage: 12, search: tag, tag: filterTag }),
})
const initialData = await fetchNotes({ page:1, perPage:12, tag: filterTag,search:'' });

  return <NotesClient initialData={initialData} filterTag={filterTag} />
}