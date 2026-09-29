import { recommendationsUrl, testimonials } from "@/content/site";
import { Recommendations } from "../Recommendations";
import { LinkedInIcon } from "../LinkedInIcon";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="words-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <p className="eyebrow">Chapter 04</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="words-title" className="font-serif text-headline">
              In other people&rsquo;s words
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-bone-2 sm:text-lg">
              Recommendations from people I&rsquo;ve built with, exactly as they wrote them on LinkedIn.
            </p>
          </div>
          <a
            href={recommendationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start text-sm text-bone-2 transition-colors hover:text-bone lg:self-auto"
          >
            <LinkedInIcon className="size-4" />
            <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-bone">All recommendations on LinkedIn</span>
            <span aria-hidden>↗</span>
          </a>
        </div>

        <Recommendations items={testimonials} verifyUrl={recommendationsUrl} />
      </div>
    </section>
  );
}
