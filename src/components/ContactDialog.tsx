"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button, Input, Textarea } from "@/components/ui";
import { CheckCircle2, XCircle } from "lucide-react";

// List of common disposable email domains
const DISPOSABLE_EMAIL_DOMAINS = [
  "10minutemail.com",
  "mailinator.com",
  "guerrillamail.com",
  "getairmail.com",
  "getnada.com",
  "yopmail.com",
  "tempmail.net",
  "temp-mail.org",
  "mailnesia.com",
  "tempr.email",
  "discard.email",
  "maildrop.cc",
  "mailspeed.xyz",
  "emailondeck.com",
  "throwawaymail.com",
  "trashmail.com",
  "temp-mail.io",
  "spamgourmet.com",
  "fakeinbox.com",
  "sharklasers.com",
  "grr.la",
  "tempinbox.com",
  "0815.ru",
  "1secmail.com",
  "1secmail.net",
  "1secmail.org",
  "mailnull.com",
  "tempinbox.com",
  "disposable-email.ml",
  "mohmal.com",
  "emailfake.com",
  "emaildrop.io",
  "dropmail.me",
  "mintemail.com",
  "tempmailer.com",
  "disposablemail.com",
  "tmpmail.org",
  "anonbox.net",
  "dispostable.com",
  "correotemporal.org",
  "inboxalias.com",
  "mailcatch.com",
  "fakemail.net",
  "tempmail.dev",
  "jetable.org",
  "tempmailaddress.com",
  "emailtemp.org",
  "tempmail.plus",
  "fakemailgenerator.com",
  "generator.email",
  "temp-inbox.com",
];

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Check if email is from a disposable domain
  const isDisposableEmail = (email: string): boolean => {
    if (!email.includes("@")) return false;

    const domain = email.split("@")[1].toLowerCase();
    return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", message: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    } else if (isDisposableEmail(email)) {
      newErrors.email =
        "Please use a permanent email address, not a temporary one";
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
    setSubmitStatus({ type: null, message: "" });

    try {
      // Get user's location data
      const locationData = await getUserLocationData();

      // Send email using the API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          ...locationData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Show success message
      setSubmitStatus({
        type: "success",
        message: `Thank you for reaching out! I'll get back to you at ${email} soon.`,
      });

      // Reset form
      setEmail("");
      setMessage("");
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get user's location data
  const getUserLocationData = async () => {
    try {
      // Get timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Get date in the required format
      const now = new Date();
      const dateStr = now.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // Try to get country using IP geolocation
      const country = "Unknown";
      const city = "Unknown";
      let browser = "Unknown";
      let device = "Unknown";

      //   try {
      //     const geoResponse = await fetch("https://ipapi.co/json/");
      //     const geoData = await geoResponse.json();
      //     country = geoData.country_name || "Unknown";
      //     city = geoData.city || "Unknown";
      //   } catch (error) {
      //     console.error("Error fetching location data:", error);
      //   }

      // Get browser and device info
      if (typeof window !== "undefined") {
        const userAgent = window.navigator.userAgent;
        browser = getBrowserInfo(userAgent);
        device = getDeviceInfo(userAgent);
      }

      return {
        date: dateStr,
        timezone,
        country,
        city,
        browser,
        device,
      };
    } catch (error) {
      console.error("Error getting user data:", error);
      return {
        date: new Date().toLocaleString(),
        timezone: "Unknown",
        country: "Unknown",
        city: "Unknown",
        browser: "Unknown",
        device: "Unknown",
      };
    }
  };

  // Helper function to get browser info
  const getBrowserInfo = (userAgent: string) => {
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
      return "Internet Explorer";
    return "Unknown Browser";
  };

  // Helper function to get device info
  const getDeviceInfo = (userAgent: string) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )
    ) {
      return "Mobile";
    } else if (/iPad|Android/i.test(userAgent)) {
      return "Tablet";
    } else {
      return "Desktop";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setMessage(e.target.value);
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              required
              rows={5}
              aria-invalid={!!errors.message}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Status message */}
          {submitStatus.type && (
            <div
              className={`p-3 rounded-md flex items-start gap-2 ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              )}
              <p className="text-sm">{submitStatus.message}</p>
            </div>
          )}

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
  );
};
