import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-svh flex-col justify-center py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-[14ch] font-serif text-display">
        This page took a <em className="text-gold">wrong turn.</em>
      </h1>
      <p className="mt-8 max-w-md text-bone-2">Happens to the best of us, usually on the way to somewhere interesting.</p>
      <Link href="/" className="mt-10 inline-flex h-12 w-fit items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-gold">
        Back to the start
      </Link>
    </section>
  );
}
