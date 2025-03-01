import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const jobs = [
  {
    role: "Senior Software Engineer",
    company: "SparkoSol",
    logo: "/sparko_sol_logo.jpg",
    duration: "Aug 2024 - Jan 2025",
    description:
      "Lead developer for multiple high-impact projects, mentoring junior developers, and implementing best practices.",
  },
  {
    role: "Senior Software Engineer",
    company: "Inspon Tech",
    logo: "/inspon_logo.jpg",
    duration: "Sep 2022 - Jul 2024",
    description:
      "Build various plugins for Shopify and Wix platform which enable users enjoying seamless eCommerce experiences and driving client growth.",
  },
  {
    role: "Associate Software Developer",
    company: "Eforte Solutions",
    logo: "/eforte_solutions_logo.jpg",
    duration: "Apr 2020 - Aug 2022",
    description:
      "Developed and maintained various client projects, focusing on responsive design and performance optimization.",
  },
  {
    role: "Volunteer",
    company: "Noble Missions for United Nation",
    logo: "/noble_missions_logo.jpg",
    duration: "Nov 2019 - Aug 2022",
    description:
      "Volunteered as a frontend developer and create responsive user interface for I Take Actions",
  },
];

export const Experience = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-foreground">
        Work Experience
      </h2>
      <Card>
        <CardContent className="pt-6">
          <ul className="space-y-8">
            {jobs.map((j, i) => (
              <li key={i} className="border-b last:border-b-0 pb-8 last:pb-0">
                {/* Job Details */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={j.logo}
                    alt={j.company}
                    width={40}
                    height={40}
                    className="rounded-md border shadow-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{j.role}</h3>
                    <p className="text-sm text-muted-foreground">{j.company}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <CalendarDays className="size-3 mr-2" />
                  {j.duration}
                </p>
                <p className="text-sm mt-2">{j.description}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};
