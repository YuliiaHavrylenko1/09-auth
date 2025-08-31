import { fetchNotes } from '@/lib/notesApi';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug ?? [];
  const tag = slugArray.length > 0 ? slugArray[0] : 'All';

  const title = `Filtered Notes: ${tag} — NoteHub`;
  const description = `Browse notes filtered by tag: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-deployed-app.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Filtered Notes — NoteHub',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug ?? [];
  const tag = slugArray.length > 0 ? slugArray[0] : 'All';

  const notes = await fetchNotes();

  return (
    <NotesClient
      notes={notes}
      totalPages={1}  
      activeTag={tag}
    />
  );
}
