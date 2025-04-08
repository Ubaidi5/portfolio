"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { ContactDialog } from "@/components/ContactDialog";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <>
      <ContactDialog
        isOpen={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />

      <footer className="bg-card border-t border-border mt-16">
        <div className="container max-w-screen-xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="flex flex-col items-center md:items-start md:col-span-2">
              <Image
                src={"/favicons/logo-light.svg"}
                alt="Portfolio Logo"
                className="object-contain h-[48px] w-max mb-5"
                width={418}
                height={104}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGUlEQVR4nGO4fv26gqSkpEJhYaH5y5cvVQE+gwd7h2dMngAAAABJRU5ErkJggg=="
              />
              <p className="text-muted-foreground text-sm text-center md:text-left">
                Crafting digital experiences that make a difference.
              </p>
              <p className="text-muted-foreground text-sm text-center md:text-left">
                Let's build something amazing together.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#projects"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactDialogOpen(true)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/ubaidi5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/in/ubaid-hussain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/ubaidnext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Ubaid Hussain. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
