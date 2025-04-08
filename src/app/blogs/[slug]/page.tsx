import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentful";
import { generateBaseMetadata } from "@/lib/metadata";
import { ArrowLeft } from "lucide-react";

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

type NextPageProps = {
  params: Promise<{ [key: string]: string }>;
};

// Generate static paths at build time
export async function generateStaticParams() {
  const blogs = await getBlogPosts();
  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

// Force static generation
export const dynamic = "force-static";

// Generate metadata for the page
export async function generateMetadata(props: NextPageProps) {
  const params = await props.params;
  const blog = (await getBlogPostBySlug(params.slug)) as unknown as Blog;

  if (!blog) {
    return {};
  }

  return generateBaseMetadata({
    title: blog.title as string,
    description: blog.shortDescription as string,
    image: blog.featuredImage?.fields?.file?.url
      ? `https:${blog.featuredImage.fields.file.url}`
      : "/favicons/og-image.webp",
  });
}

export default async function BlogPostPage(props: NextPageProps) {
  const params = await props.params;
  const blog = (await getBlogPostBySlug(params.slug)) as unknown as Blog;

  if (!blog) {
    notFound();
  }

  // Helper function to render content nodes
  const renderContent = (content: any) => {
    if (!content || !content.content) return null;

    return content.content.map((node: any, index: number) => {
      switch (node.nodeType) {
        case "paragraph":
          return (
            <p key={`p-${index}`} className="mb-6 leading-relaxed">
              {node.content.map((textNode: any, i: number) => {
                const text = textNode.value;
                const marks = textNode.marks || [];

                let markElement = (
                  <span key={`text-${index}-${i}`}>{text}</span>
                );

                // Apply text styling based on marks
                marks.forEach((mark: any) => {
                  switch (mark.type) {
                    case "bold":
                      markElement = (
                        <strong key={`bold-${index}-${i}`}>{text}</strong>
                      );
                      break;
                    case "italic":
                      markElement = (
                        <em key={`italic-${index}-${i}`}>{text}</em>
                      );
                      break;
                    case "underline":
                      markElement = (
                        <u key={`underline-${index}-${i}`}>{text}</u>
                      );
                      break;
                    default:
                      markElement = (
                        <span key={`text-${index}-${i}`}>{text}</span>
                      );
                  }
                });

                return markElement;
              })}
            </p>
          );

        case "embedded-entry-block":
          // Handle embedded rich images
          if (
            node.data?.target?.sys?.contentType?.sys?.id ===
            "componentRichImage"
          ) {
            const image = node.data.target.fields.image;
            const caption = node.data.target.fields.caption;
            const isFullWidth = node.data.target.fields.fullWidth;

            if (image?.fields?.file?.url) {
              return (
                <figure
                  key={`figure-${index}`}
                  className={`my-8 ${isFullWidth ? "w-full" : "w-4/5 mx-auto"}`}
                >
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src={`https:${image.fields.file.url}`}
                      alt={image.fields.title || caption || "Blog image"}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                  {caption && (
                    <figcaption className="text-center text-sm text-muted-foreground mt-2">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
          }
          return null;

        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-screen-lg mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center px-4 py-1 rounded-full border border-[#373737]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {blog.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {blog.shortDescription}
            </p>

            {/* Author information */}
            {blog.author && (
              <div className="flex items-center mt-6">
                {blog.author.fields?.avatar?.fields?.file?.url && (
                  <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                    <Image
                      src={`https:${blog.author.fields.avatar.fields.file.url}`}
                      alt={blog.author.fields.name || "Author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium">{blog.author.fields?.name}</p>
                  <p className="text-[14px]">
                    {formatDate(blog.publishedDate)}
                  </p>
                </div>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {blog.featuredImage?.fields?.file?.url && (
            <div className="relative h-[300px] md:h-[500px] w-full mb-8">
              <Image
                src={`https:${blog.featuredImage.fields.file.url}`}
                alt={blog.title || "Featured Image"}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-invert max-w-none">
            {renderContent(blog.content)}
          </div>

          {/* Related Posts Section */}
          {blog.relatedBlogPosts && blog.relatedBlogPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blog.relatedBlogPosts
                  .slice(0, 2)
                  .map((relatedPost: any, index: number) => (
                    <div
                      key={`related-${index}`}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {relatedPost.fields?.featuredImage?.fields?.file?.url && (
                        <div className="relative h-[200px] w-full">
                          <Image
                            src={`https:${relatedPost.fields.featuredImage.fields.file.url}`}
                            alt={relatedPost.fields.title || "Related Post"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2">
                          {relatedPost.fields.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {relatedPost.fields.shortDescription}
                        </p>
                        <a
                          href={`/blogs/${relatedPost.fields.slug}`}
                          className="text-primary hover:underline font-medium"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
