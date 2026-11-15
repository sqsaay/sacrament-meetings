export default function MeetingsLoading() {
  return (
    <div role="status" aria-busy="true">
      <p className="sr-only">Loading meetings...</p>
      <ul
        aria-hidden="true"
        className="grid animate-pulse gap-4 md:grid-cols-2"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            className="rounded-lg border border-white/30 bg-white/10 p-4"
          >
            <div className="mb-4 h-6 w-2/3 rounded bg-white/20" />
            <div className="mb-6 h-4 w-1/3 rounded bg-white/20" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-10 rounded bg-white/20" />
              <div className="h-10 rounded bg-white/20" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}