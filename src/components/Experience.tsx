import { Image } from "@/components/ui";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const jobs = [
  {
    role: "Senior Frontend Developer",
    company: "InsuranceMarkets",
    logo: "/images/insurance_market_logo.jpeg",
    duration: "Feb 2025 - Present",
    description:
      "Developing comprehensive insurance platform to streamline quote comparison and policy management for users. Designed intuitive user flows for seamless insurance discovery, enhanced customer experience through responsive design, and implemented performance optimizations for faster load times.",
  },
  {
    role: "Team Lead & Senior Software Developer",
    company: "SparkoSol",
    logo: "/images/sparko_sol_logo.jpg",
    duration: "2024 - Feb 2025",
    description:
      "Led development of multimedia marketing apps and surgery-related platforms. Built frontend with Next.js/React and backend with Node.js/MongoDB while managing timelines and mentoring junior developers.",
  },
  {
    role: "Software Developer",
    company: "Inspon Tech",
    logo: "/images/inspon_logo.jpg",
    duration: "2022 - 2024",
    description:
      "Built Shopify & Wix plugins including custom product fields, loyalty programs, and upload systems. Developed recruitment management system for German clients with scalable eCommerce solutions.",
  },
  {
    role: "Associate Software Developer",
    company: "Eforte Solutions",
    logo: "/images/eforte_solutions_logo.jpg",
    duration: "2020 - 2022",
    description:
      "Built dashboards, forecast tools, and landing pages using React.js/Next.js. Improved client experiences with clean and functional UI designs.",
  },
  {
    role: "Volunteer Frontend Developer",
    company: "Noble Missions",
    logo: "/images/noble_missions_logo.jpg",
    duration: "2019 - 2022",
    description:
      "Built a fundraising website in React.js for education initiatives in Nigeria. Delivered responsive design and user-friendly experience.",
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
