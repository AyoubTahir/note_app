import { prisma } from "../../../lib/prisma";

export default async function Note({ params }: { params: any }) {
  const note = await prisma.note.findFirst({
    where: {
      id: parseInt(params.id),
    },
    select: {
      title: true,
      note: true,
    },
  });
  return (
    <div className="max-w-4xl bg-slate-500 m-auto h-screen flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold text-white mb-5">Note #{params.id}</h1>
      <h1>{note?.title}</h1>
      <p>{note?.note}</p>
    </div>
  );
}
