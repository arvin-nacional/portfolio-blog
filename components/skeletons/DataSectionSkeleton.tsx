import CardSkeleton from "../ui/skeletonCard";

export default function DataSectionSkeleton({
  id,
  label,
  title,
}: {
  id: string;
  label: string;
  title: string;
}) {
  return (
    <section
      id={id}
      aria-busy="true"
      className="text-dark300_light700 scroll-mt-24 px-10 py-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="h2-bold">{label}</p>
        <h2 className="h1-semihero mt-3 mb-8 max-md:h2-bold">{title}</h2>
        <p role="status" className="sr-only">
          Loading {label.toLowerCase()}…
        </p>
        <div
          aria-hidden="true"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <CardSkeleton />
          <div className="hidden md:block">
            <CardSkeleton />
          </div>
          <div className="hidden lg:block">
            <CardSkeleton />
          </div>
        </div>
      </div>
    </section>
  );
}
