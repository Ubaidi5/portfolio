import Link from "next/link";
import { nav, site } from "@/content/site";
import { LocalTime } from "./LocalTime";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-14 sm:py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl leading-tight tracking-tight text-bone sm:text-4xl">
            {site.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
            {site.role}. Writing from {site.location}, working with teams wherever they are.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="eyebrow">Site</p>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-bone-2 transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/feed.xml" className="text-bone-2 transition-colors hover:text-bone">RSS</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-4 space-y-3">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="me noopener noreferrer" className="text-bone-2 transition-colors hover:text-bone">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="eyebrow">Say hello</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-bone-2 transition-colors hover:text-bone">
                  {site.email}
                </a>
              </li>
              <li className="text-mute">
                Karachi · <LocalTime />
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line py-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Designed and built by hand in Next.js.</p>
      </div>
    </footer>
  );
}
