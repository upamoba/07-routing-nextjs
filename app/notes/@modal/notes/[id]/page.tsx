'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Modal from '../../../../../components/Modal/Modal';
import NotePreview from '../../../../../components/NotePreview/NotePreview';
import styles from '../../NotesLayout.module.css';


export default function NotePreviewModal() {
  const router = useRouter();
  const params = useParams();
  const rawId = params.id;
  
  const noteId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!noteId) return null;

  return (
    <div className={styles.previewContainer}>
      <Modal onClose={() => router.back()}>
        <NotePreview noteId={noteId} />
      </Modal>
    </div>
  );
}
