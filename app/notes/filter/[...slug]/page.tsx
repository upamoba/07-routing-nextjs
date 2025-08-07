
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'
import type { DehydratedState } from '@tanstack/react-query'

type PageProps = {
  params: Promise< {
    slug?: string[]
  }>
}

export default async function FilteredNotesPage({ params }: PageProps) {

  const {slug} = await params
const tag = Array.isArray(slug) && slug.length > 0 ? slug[0] : ''
  const qc = new QueryClient()
  await qc.prefetchQuery({
  queryKey: ['notes', 1, tag],
  queryFn: () => fetchNotes({ page: 1, perPage: 12, search: tag }),
})
  const initialState: DehydratedState = dehydrate(qc)

  return <NotesClient initialState={initialState} filterTag={tag} />
}