
import React from 'react';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
;
import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from '../../../../components/NotePreview/NotePreview';

type ModalNotePageProps = {
  params: { id: string };
};
export default async function ModalNotePage({ params }: ModalNotePageProps) {
  const { id } = params;


  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });


  const dehydratedState = dehydrate(queryClient);

  
  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}


