import React from 'react'; 
import { fetchNoteById } from '@/lib/api';  
import { QueryClient,QueryClientProvider, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const noteId = params.id;
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

 
  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
     
      <HydrationBoundary state={dehydratedState}>
        <NoteDetailsClient noteId={noteId} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}