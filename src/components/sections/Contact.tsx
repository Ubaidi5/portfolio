import { site } from "@/content/site";
import { ContactForm } from "../ContactForm";
import { SubscribeForm } from "../Subscribe";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <p className="eyebrow">Last chapter, for now</p>
        <h2 id="contact-title" className="mt-4 max-w-[18ch] font-serif text-display">
          Tell me what you&rsquo;re <em className="text-gold">building.</em>
        </h2>

        <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-10 lg:col-span-5">
            <div>
              <p className="eyebrow">Write to me</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block break-all font-serif text-3xl tracking-tight text-bone underline decoration-line-strong decoration-1 underline-offset-8 transition-colors hover:decoration-gold sm:text-4xl"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">Or find me on</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-full border border-line-strong px-5 text-sm text-bone-2 transition-colors hover:border-bone hover:text-bone"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        <div className="mt-24 grid gap-8 rounded-3xl border border-line bg-ink-2 p-6 sm:mt-32 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-serif text-3xl tracking-tight text-bone sm:text-4xl">Not ready to talk yet?</p>
            <p className="mt-3 max-w-md text-bone-2">
              Get the next story in your inbox. One or two a month, and nothing else.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}
