import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Fatima Ward
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Sacrament meetings, thoughtfully planned.
          </h1>
          <p className="max-w-xl text-lg">
            Browse meeting agendas and review the hymns, prayers, speakers, and
            ward business for each week.
          </p>
          <Link
            href="/meetings"
            className="inline-flex rounded-md bg-white px-5 py-3 font-semibold text-green-900 transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View meetings
          </Link>
        </div>
        <Image
          src="/meeting-hero.webp"
          alt="Illustration of a person giving a talk in a sacrament meeting"
          width={640}
          height={480}
          priority
          className="h-auto w-full"
        />
      </section>
    </main>
  );
}
