import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const projects = [
  {
    title: "Checkeden",
    description:
      "Checken.com strives to develop an affordable very easy-to-use software solution that can be used by any type of membership industry without needing to be a computer expert or paying a big sum for customization.",
    tech: "React - Next",
    link: "https://checkeden.com",
  },
  {
    title: "Task Management App",
    description:
      "A ZeroSlip Smart Receipt is a tax-compliant, easily accessible proof of purchase that lives directly in your Customer App, or via SMS. And it’s free.",
    tech: "React - Next",
    link: "https://zeroslip.co",
  },
];

export const Projects = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {projects.map((p, i) => (
          <Card key={i}>
            <CardContent className="pt-6 h-full">
              <div className="flex flex-col h-full">
                <Link
                  href={p.link}
                  className="font-semibold text-primary hover:underline"
                >
                  {p.title}
                </Link>
                <p className="text-muted-foreground line-clamp-3 mt-1 mb-4">
                  {p.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={cn("size-4 rounded-full bg-blue-500")} />
                    <span className="text-xs font-medium text-muted-foreground">
                      {p.tech}
                    </span>
                  </div>
                  <Link
                    href={p.link}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    View Project
                    <ExternalLink className="inline-block size-3" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
