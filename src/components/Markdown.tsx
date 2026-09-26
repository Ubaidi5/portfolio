import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/cn";

/** Story body renderer, shared by the public story page and the admin preview. Raw HTML is not rendered. */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-lg prose-invert max-w-[68ch] prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-h2:text-4xl prose-p:text-bone-2 prose-a:text-gold prose-a:underline-offset-4 prose-blockquote:border-gold prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-bone prose-strong:text-bone prose-code:text-bone prose-code:before:content-none prose-code:after:content-none prose-img:rounded-2xl prose-hr:border-line prose-li:text-bone-2",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith("http");
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {children}
              </a>
            );
          },
          // eslint-disable-next-line @next/next/no-img-element
          img: ({ src, alt }) => <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" decoding="async" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
