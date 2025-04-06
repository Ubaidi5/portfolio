import Link from "next/link";
import { Image } from "@/components/ui";
import { getBlogPosts } from "@/lib/contentful";
import { generateBaseMetadata } from "@/lib/metadata";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const metadata = generateBaseMetadata({
  title: "Blog - Latest Articles & Insights",
  description:
    "Explore my collection of articles on web development, technology trends, and more.",
});

export default async function BlogsPage() {
  const blogs = await getBlogPosts();

  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-screen-xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Blogs</h1>
          <p className="text-muted-foreground">
            Explore my thoughts, insights and experiences in technology and
            development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any, index: number) => (
            <div
              key={index}
              className="flex flex-col border border-[#373737] rounded-lg overflow-hidden"
            >
              {blog.featuredImage?.fields?.file?.url ? (
                <Link href={`/blogs/${blog.slug}`}>
                  <Image
                    src={`https:${blog.featuredImage.fields.file.url}`}
                    alt={blog.title || "Blog Image"}
                    className="object-cover h-[200px] w-full"
                  />
                </Link>
              ) : null}

              <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6">
                <Link href={`/blogs/${blog.slug}`} className="group">
                  <h2 className="line-clamp-3 text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {blog.shortDescription}
                </p>

                {/* Author info */}
                {blog.author ? (
                  <div className="mt-auto flex items-center gap-3">
                    {blog.author.fields?.avatar?.fields?.file?.url && (
                      <Image
                        src={`https:${blog.author.fields.avatar.fields.file.url}`}
                        alt={blog.author.fields.name || "Author"}
                        className="object-cover w-10 h-10"
                      />
                    )}
                    <div>
                      <p className="font-medium">{blog.author.fields?.name}</p>
                      {blog.publishedDate ? (
                        <p className="text-xs">
                          {formatDate(blog.publishedDate)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-primary hover:underline font-medium mt-4"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
