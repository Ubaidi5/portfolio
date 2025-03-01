"use client";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export const AboutMe = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row justify-between items-baseline">
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: ` I craft high-performance, visually stunning web apps that turn ideas
          into growth-driven digital experiences. With 4+ years of expertise in
          React.js, Next.js, and TypeScript, I specialize in scalable
          dashboards, eCommerce platforms, and custom solutions designed to make
          your brand unforgettable.
          <br><br>
          Let's build something that works for you, not just looks good—think of it as your digital Swiss Army knife. 🛠️
          <br><br>
          (Fully booked? Not yet. Let's change that.)`,
          }}
        ></p>
      </CardContent>
    </Card>
  );
};
