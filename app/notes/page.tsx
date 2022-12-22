import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function Notes() {
  const notes = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      note: true,
    },
  });

  return (
    <div className="max-w-4xl bg-slate-500 m-auto h-screen flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold text-white mb-5">My Notes</h1>
      <div>
        <Link href="/">Add New Note</Link>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
