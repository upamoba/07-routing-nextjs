

// interface NoteDetailsPageProps {
//   params: { id: string };
// }

// export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
//   const noteId = params.id;
//   const queryClient = new QueryClient();


//   await queryClient.prefetchQuery({
//     queryKey: ['note', noteId],
//     queryFn: () => fetchNoteById(noteId),
//   });

 
//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <QueryClientProvider client={queryClient}>
     
//       <HydrationBoundary state={dehydratedState}>
//         <NoteDetailsClient noteId={noteId} />
//       </HydrationBoundary>
//     </QueryClientProvider>
//   );
// }

import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary
} from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client'

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const noteId = params.id
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <NoteDetailsClient noteId={noteId} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}