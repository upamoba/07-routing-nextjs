import { fetchNotes } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import TanStackProvider from '../../components/TanStackProvider/TanStackProvider';

export default async function NotesPage() {
  const { data } = await fetchNotes({ page: 1, perPage: 12, search: '' });
  return (
    <TanStackProvider>
      <NoteList notes={data} />
    </TanStackProvider>
  );
}
