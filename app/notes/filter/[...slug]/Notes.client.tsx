'use client';
import React, { FC, useState, useEffect } from 'react';
import {keepPreviousData,useQuery,QueryClient,hydrate } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { DehydratedState } from '@tanstack/react-query'

import { fetchNotes, FetchNotesResponse } from '../../../../lib/api';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import { LoadingIndicator } from '../../../../components/LoadingIndicator/LoadingIndicator';
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../../../components/EmptyState/EmptyState';
import styles from './NotesPage.module.css';




interface NotesClientProps {
  initialState: DehydratedState
  filterTag?: string
}

const NotesClient: FC<NotesClientProps> = ({ initialState, filterTag }) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState(filterTag ?? '')
  const [debounced] = useDebounce(search, 500)
  const [isModalOpen, setIsModalOpen] = useState(false)

  
  useEffect(() => {
    setPage(1)
  }, [debounced])

  const client = new QueryClient()
  hydrate(client, initialState)
  // const restoredClient = new QueryClient()
  // hydrate(restoredClient, initialState)

  const {
    data = { data: [], totalPages: 1, page, perPage: 12 },
    isLoading,
    isError,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debounced],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debounced }),
   
     initialData:
      page === 1 && debounced === (filterTag ?? '')
        ? () =>
            client.getQueryData<FetchNotesResponse>([
              'notes',
              1,
              filterTag ?? '',
            ])
        : undefined,
   placeholderData: keepPreviousData
  })

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            activePage={page}
            onPageChange={setPage}
          />
        )}
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage />}

      {!isLoading && data.data.length > 0 ? (
        <NoteList notes={data.data} />
      ) : (
        !isLoading && <EmptyState message="No notes found." />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

export default NotesClient