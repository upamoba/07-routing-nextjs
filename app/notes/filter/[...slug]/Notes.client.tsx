'use client';
import React, { FC, useState, useEffect } from 'react';
import {keepPreviousData,useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse } from '../../../../lib/api';
import { fetchNotes } from '../../../../lib/api';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import { LoadingIndicator } from '../../../../components/LoadingIndicator/LoadingIndicator';
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../../../components/EmptyState/EmptyState';
import styles from './NotesPage.module.css';
import { NoteTag } from '@/types/note';

export interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag: NoteTag | 'All';           
}

const NotesClient: FC<NotesClientProps> = ({ initialData, tag }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>('');      
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setModalOpen] = useState(false);

 
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tag]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: tag === 'All' ? undefined : tag, 
      }),
    initialData:
      page === 1 && debouncedSearch === '' && tag === 'All'
        ? initialData
        : undefined,
    placeholderData: keepPreviousData
  });

  const notes = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <SearchBox
          value={search}
          onChange={(val) => setSearch(val)}
        />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            activePage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={styles.button}
          onClick={() => setModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage />}

      {!isLoading && notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isLoading && <EmptyState message="No notes found." />
      )}

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;

// export interface NotesClientProps {
//   initialData: FetchNotesResponse;
//   tag: NoteTag;
// }

// const NotesClient: FC<NotesClientProps> = ({ initialData, tag }) => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState<string>('');
//   const [debounced] = useDebounce(search, 500);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     setPage(1);
//   }, [debounced]);

// const { data, isLoading, isError } = useQuery<
//   FetchNotesResponse,
//   Error,
//   FetchNotesResponse,
//   [ 'notes', number, string ]
// >({
//   queryKey: ['notes', page, debounced],
//   queryFn: () => fetchNotes({ page, perPage: 12, search: debounced }),
//   initialData:
//     page === 1 && debounced === (tag ?? '')
//       ? (initialData as FetchNotesResponse)
//       : undefined,
//   placeholderData: keepPreviousData,
// });

//   const notes = data?.data ?? [];
//   const totalPages = data?.totalPages ?? 1;

//   return (
//     <div className={styles.app}>
//       <div className={styles.toolbar}>
//         <SearchBox
//           value={search}
//           onChange={(value: string) => setSearch(value)}
//         />

//         {totalPages > 1 && (
//           <Pagination totalPages={totalPages} activePage={page} onPageChange={setPage} />
//         )}
//         <button className={styles.button} onClick={() => setOpen(true)}>
//           Create note +
//         </button>
//       </div>

//       {isLoading && <LoadingIndicator />}
//       {isError && <ErrorMessage />}

//       {!isLoading && notes.length > 0 ? (
//         <NoteList notes={notes} />
//       ) : (
//         !isLoading && <EmptyState message="No notes found." />
//       )}

//       {open && (
//         <Modal onClose={() => setOpen(false)}>
//           <NoteForm onClose={() => setOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default NotesClient;