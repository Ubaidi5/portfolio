import { AboutMe } from "@/components/AboutMe";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Profile } from "@/components/Profile";
import { Skills } from "@/components/Skills";
import { generateBaseMetadata } from "@/lib/metadata";

export const metadata = generateBaseMetadata({
  title: "Ubaid Hussain - Web Developer Portfolio",
  description:
    "Ubaid Hussain | MERN Stack Developer | Explore my innovative web projects built with React, Next.js, and Node.js.",
  image: "/favicons/og-image.webp",
});

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-screen-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1">
            <Profile />
            <Skills />
          </aside>

          <main className="md:col-span-2">
            <AboutMe />
            <Projects />
            <Experience />
          </main>
        </div>
      </div>
    </div>
  );
}
