"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button, Input, Textarea, Image } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import profileImage from "@public/images/profile-picture.webp";
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

export const Profile: React.FC = () => {
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: "", message: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", message: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Here you would typically handle the form submission
      // Option 1: Send to an email service API like SendGrid or EmailJS
      // const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     service_id: 'YOUR_SERVICE_ID',
      //     template_id: 'YOUR_TEMPLATE_ID',
      //     user_id: 'YOUR_USER_ID',
      //     template_params: { email, message }
      //   })
      // });

      // Option 2: Use a form submission service like Formspree
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, message })
      // });

      // Option 3: Send to your own backend API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, message })
      // });

      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      alert(
        `Thank you for reaching out! I'll get back to you at ${email} soon.`
      );

      // Reset form
      setEmail("");
      setMessage("");
      setIsHireDialogOpen(false);
    } catch (error) {
      alert("Failed to send message. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-start gap-2 ">
          <div className="w-full flex flex-row justify-between items-top ">
            <div className="flex flex-row md:flex-col items-center md:items-start w-full gap-4">
              <div className="rounded-full w-16 md:w-full aspect-square overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={profileImage}
                  alt="Ubaid Hussain"
                  style={{ objectPosition: "0 16%", scale: 1.3 }}
                  width={400}
                  height={400}
                  placeholder="blur"
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

          <Button
            className="mt-4 w-full"
            onClick={() => setIsHireDialogOpen(true)}
          >
            HIRE ME
          </Button>

          <Button className="mt-2 w-full" variant="outline" asChild>
            <Link
              href="/files/ubaid-hussain-resume.pdf"
              target="_blank"
              className="font-semibold uppercase"
            >
              RESUME
            </Link>
          </Button>

          <Dialog open={isHireDialogOpen} onOpenChange={setIsHireDialogOpen}>
            <DialogContent className="sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-xl md:text-2xl">
                  Let's Work Together
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm md:text-base">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    required
                    aria-invalid={!!errors.email}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or job opportunity..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    required
                    rows={5}
                    aria-invalid={!!errors.message}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <DialogFooter className="mt-6 sm:mt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

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
