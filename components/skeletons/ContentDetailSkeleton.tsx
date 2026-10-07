export default function ContentDetailSkeleton() {
  return <section aria-busy="true" aria-label="Loading content" className="mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-10">
    <div className="max-w-4xl space-y-6"><div className="aspect-video rounded-xl bg-dark-300" /><div className="h-8 w-3/4 rounded bg-dark-300" /><div className="h-5 rounded bg-dark-300" /><div className="h-5 w-5/6 rounded bg-dark-300" /></div>
  </section>;
}
