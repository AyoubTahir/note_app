"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Note {
  title: string;
  notes: string;
}

export default function Home() {
  const router = useRouter();
  const [note, setNote] = useState<Note>({
    title: "",
    notes: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert(note.title);
    try {
      fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: note.title,
          note: note.notes,
        }),
      }).then(() => {
        setNote({ title: "", notes: "" });
        router.push("/notes");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl bg-slate-500 m-auto h-screen flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold text-white mb-5">Add New Note</h1>
      <form className="w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <input
            type="text"
            className="px-3 py-2 border-solid border-2 border-black mb-3 rounded-sm"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            placeholder="Notes"
            className="px-3 py-2 border-solid border-2 border-black mb-3 rounded-sm"
            value={note.notes}
            onChange={(e) => setNote({ ...note, notes: e.target.value })}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 py-2 border-2 text-white font-bold hover:bg-blue-400 border-black"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
