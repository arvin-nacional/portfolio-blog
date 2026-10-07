export default function ContentListingSkeleton({ title }: { title: string }) {
  return <section aria-busy="true" aria-label={`Loading ${title}`} className="mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-10">
    <h1 className="text-dark500_light700 mb-8 text-center text-4xl font-bold">{title}</h1>
    <div className="mb-8 h-12 w-full rounded-lg bg-dark-300" />
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => <div key={index} className="overflow-hidden rounded-xl bg-dark-300">
        <div className="aspect-[8/5] bg-dark-400" /><div className="space-y-4 p-6"><div className="h-6 w-3/4 rounded bg-dark-400" /><div className="h-4 rounded bg-dark-400" /><div className="h-4 w-2/3 rounded bg-dark-400" /></div>
      </div>)}
    </div>
  </section>;
}
