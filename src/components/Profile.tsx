"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    name: "Github",
    link: "https://github.com/ubaidi5",
    icon: <FaGithub className="size-4" />,
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/ubaid-hussain",
    icon: <FaLinkedin className="size-4" />,
  },
];

export const Profile = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-start gap-2 ">
          <div className="w-full flex flex-row justify-between items-top ">
            <div className="flex flex-row md:flex-col items-center md:items-start w-full gap-4">
              <div className="rounded-full w-16 md:w-full aspect-square overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="/me.jpg"
                  alt="Profile Picture"
                  style={{ objectPosition: "0 16%", scale: 1.3 }}
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-bold md:mt-4 text-xl md:text-2xl">
                  UBAID HUSSAIN
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Solopreneur Developer
                </p>
              </div>
            </div>
          </div>

          <p className="mt-2 text-start text-sm text-muted-foreground">
            I am a software engineer with a passion for building products that
            help people live better lives.
          </p>
          <Button className="mt-4 w-full" asChild>
            {/* TODO: Add resume */}
            {/* TODO: Add link to schedule a call with you using Calendly or Cal */}
            <Link
              href="/resume.pdf"
              target="_blank"
              className="font-semibold uppercase"
            >
              CONTACT ME
            </Link>
          </Button>
          <div className="mt-4 flex flex-col space-y-2 border-t border-border pt-4 w-full">
            {socials.map((s, i) => {
              const parts = s.link.split("/");
              const username = parts[parts.length - 1];

              return (
                <Link
                  key={i}
                  href={s.link}
                  target="_blank"
                  className="cursor-pointer flex items-center gap-2 group"
                >
                  {s.icon}
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-color duration-200 ease-linear">
                    /{username}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
