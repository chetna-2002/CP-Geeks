"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  Shield,
  Lock,
  Database,
  CreditCard,
  Cookie,
  Users,
  FileText,
  Mail,
  Eye,
  AlertCircle
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      list: [
        "Name and contact information",
        "Email address",
        "Account and login details",
        "Course enrollment and learning progress",
        "Payment-related information processed securely"
      ]
    },
    {
      icon: Users,
      title: "2. How We Use Information",
      list: [
        "Provide access to learning resources",
        "Verify payments and transactions",
        "Communicate updates and schedules",
        "Improve platform experience",
        "Provide mentorship and support",
        "Prevent fraud and misuse"
      ]
    },
    {
      icon: CreditCard,
      title: "3. Payment Information",
      content: [
        "Payments are processed using trusted third-party payment gateways.",
        "CP Geeks does not directly store sensitive financial information."
      ],
      list: [
        "Card numbers",
        "CVV details",
        "UPI PIN information",
        "Banking passwords",
        "Net banking credentials"
      ]
    },
    {
      icon: Cookie,
      title: "4. Cookies & Analytics",
      content: [
        "Cookies and analytics tools may be used to improve functionality, reliability, and platform performance."
      ]
    },
    {
      icon: Database,
      title: "5. Third-Party Services",
      list: [
        "Payment providers",
        "Cloud infrastructure",
        "Authentication systems",
        "Database services",
        "Analytics providers",
        "Communication tools"
      ]
    },
    {
      icon: Shield,
      title: "6. Data Security",
      content: [
        "Reasonable security safeguards are implemented to protect user information.",
        "No online platform can guarantee absolute security."
      ]
    },
    {
      icon: Eye,
      title: "7. Data Sharing",
      content: [
        "CP Geeks does not sell personal information."
      ],
      list: [
        "Legal compliance",
        "Fraud prevention",
        "Platform operations",
        "Trusted service providers"
      ]
    },
    {
      icon: FileText,
      title: "8. User Rights",
      list: [
        "Request stored data access",
        "Correct inaccurate information",
        "Request account deletion"
      ]
    },
    {
      icon: AlertCircle,
      title: "9. Children's Privacy",
      content: [
        "Platform usage under 13 years of age requires parental supervision."
      ]
    },
    {
      icon: Lock,
      title: "10. Policy Updates",
      content: [
        "Privacy terms may be updated periodically to reflect platform or legal changes."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 h-[340px] w-[340px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Privacy Protection
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-black">
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm text-foreground/60">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/70">
              CP Geeks values your privacy and is committed to protecting personal information across platform services, courses, and learning systems.
            </p>
          </div>

          <div className="mb-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6">
              <h3 className="text-3xl font-black">Secure</h3>
              <p className="mt-2 text-sm text-foreground/65">Protected systems and infrastructure.</p>
            </div>

            <div className="rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-6">
              <h3 className="text-3xl font-black">Private</h3>
              <p className="mt-2 text-sm text-foreground/65">No personal information selling.</p>
            </div>

            <div className="rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-6">
              <h3 className="text-3xl font-black">Transparent</h3>
              <p className="mt-2 text-sm text-foreground/65">Clear information handling policies.</p>
            </div>
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
                <h2 className="text-2xl font-bold">Privacy Support</h2>
                <p className="mt-2 text-foreground/65">Privacy-related questions or concerns.</p>
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