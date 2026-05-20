"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  Shield,
  CreditCard,
  Users,
  BookOpen,
  Lock,
  AlertCircle,
  CalendarDays,
  Mail
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: BookOpen,
      title: "1. About CP Geeks",
      content: [
        "CP Geeks is an online learning platform providing technical education, mentorship, live classes, career guidance, and educational services for software engineering learners.",
        "Classes may be conducted through third-party platforms including Zoom, Google Meet, or other communication tools."
      ]
    },
    {
      icon: Users,
      title: "2. Eligibility",
      list: [
        "You are at least 13 years old.",
        "You are legally capable of entering binding agreements.",
        "Registration information is accurate and complete."
      ]
    },
    {
      icon: Lock,
      title: "3. Accounts & Access",
      content: [
        "Users are responsible for maintaining account confidentiality.",
        "CP Geeks may suspend accounts violating platform policies."
      ],
      list: [
        "Do not share accounts.",
        "Do not redistribute course access.",
        "Do not exploit platform systems.",
        "Do not use services unlawfully."
      ]
    },
    {
      icon: CreditCard,
      title: "4. Payments & Pricing",
      content: [
        "Pricing and availability may change without notice.",
        "Payments are processed securely via third-party providers.",
        "Course access may only be granted after payment verification."
      ]
    },
    {
      icon: Shield,
      title: "5. Refund Policy",
      content: [
        "Refunds are governed by our Refund Policy.",
        "Purchases indicate agreement with refund terms."
      ]
    },
    {
      icon: BookOpen,
      title: "6. Intellectual Property",
      content: [
        "Videos, branding, notes, graphics, code examples, and learning material remain intellectual property of CP Geeks.",
        "Content may not be reproduced or redistributed without written permission."
      ]
    },
    {
      icon: CalendarDays,
      title: "7. Live Classes & Scheduling",
      list: [
        "Session schedules may occasionally change.",
        "User connectivity issues remain user responsibility.",
        "Missed sessions due to user absence remain user responsibility."
      ]
    },
    {
      icon: Users,
      title: "8. Community Guidelines",
      content: [
        "Respectful professional behavior is expected across all learning spaces."
      ],
      list: [
        "No harassment",
        "No abuse",
        "No hate speech",
        "No spam",
        "No disruptive conduct"
      ]
    },
    {
      icon: AlertCircle,
      title: "9. Limitation of Liability",
      content: [
        "CP Geeks does not guarantee job outcomes or placement results.",
        "CP Geeks shall not be liable for indirect damages arising from platform usage."
      ]
    },
    {
      icon: Lock,
      title: "10. Privacy",
      content: [
        "Privacy practices are governed through our Privacy Policy."
      ]
    },
    {
      icon: Shield,
      title: "11. Changes to Terms",
      content: [
        "Terms may be updated periodically. Continued usage indicates acceptance."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 h-[350px] w-[350px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-14 rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Legal Information
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight">
              Terms & Conditions
            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm text-foreground/60">
              <CalendarDays className="h-4 w-4" />
              Last Updated: {new Date().toLocaleDateString()}
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/70">
              Welcome to CP Geeks. By accessing our platform, courses, services, or community offerings, 
              you agree to comply with these Terms & Conditions.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-7 transition-all duration-300 hover:border-primary/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{section.title}</h2>

                      {section.content?.map((text, i) => (
                        <p key={i} className="mt-4 leading-8 text-foreground/75">
                          {text}
                        </p>
                      ))}

                      {section.list && (
                        <ul className="mt-4 space-y-3">
                          {section.list.map((item, i) => (
                            <li key={i} className="flex gap-3 text-foreground/75">
                              <div className="mt-[10px] h-2 w-2 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-8">
            <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <p className="mt-2 text-foreground/65">Questions or legal concerns.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  cpgeeksofficial@gmail.com
                </div>
                <div className="text-sm text-foreground/60">CP Geeks • India</div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium text-primary transition-all hover:gap-3"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}