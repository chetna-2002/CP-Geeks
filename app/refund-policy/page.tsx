"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  ShieldCheck,
  CreditCard,
  CalendarClock,
  AlertTriangle,
  Wallet,
  Ban,
  Mail,
  RefreshCw
} from "lucide-react";

export default function RefundPolicyPage() {
  const sections = [
    {
      icon: ShieldCheck,
      title: "1. Refund Eligibility",
      content: [
        "Refund requests may be considered only if submitted within 3 days of successful payment.",
        "Eligibility depends on course access, attendance, platform activity, and resource usage.",
        "CP Geeks reserves the right to approve or reject refund requests after review."
      ]
    },
    {
      icon: Ban,
      title: "2. Non-Refundable Situations",
      list: [
        "Failure to attend live sessions",
        "Change of mind after purchase",
        "Refund requests after the refund window",
        "Violation of platform guidelines",
        "Significant course consumption",
        "User-side internet or device issues"
      ]
    },
    {
      icon: CalendarClock,
      title: "3. Live Classes & Scheduling",
      content: [
        "Sessions may occasionally be rescheduled because of operational requirements or instructor availability.",
        "Schedule changes do not automatically qualify for refunds."
      ]
    },
    {
      icon: RefreshCw,
      title: "4. Cancellation Policy",
      content: [
        "Users may cancel future participation by contacting support.",
        "Cancellation does not automatically guarantee a refund."
      ]
    },
    {
      icon: Wallet,
      title: "5. Refund Processing Time",
      content: [
        "Approved refunds are generally processed within 5–10 business days.",
        "Final credit timing depends on banks and payment providers."
      ]
    },
    {
      icon: AlertTriangle,
      title: "6. Fraud Prevention",
      list: [
        "Fraudulent activity",
        "Policy abuse",
        "Unauthorized chargebacks",
        "Violation of platform terms"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 h-[340px] w-[340px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <CreditCard className="h-4 w-4" />
              Refund Information
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-black">
              Refund & Cancellation Policy
            </h1>

            <p className="mt-4 text-sm text-foreground/60">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/70">
              CP Geeks aims to provide high-quality technical education and mentorship.
              This policy explains how refunds and cancellations are handled.
            </p>
          </div>

          <div className="mb-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6">
              <p className="text-sm font-medium text-primary">Refund Window</p>
              <h3 className="mt-2 text-3xl font-black">3 Days</h3>
              <p className="mt-2 text-sm text-foreground/65">Requests after this period may not qualify.</p>
            </div>

            <div className="rounded-3xl border border-border/30 bg-card/40 backdrop-blur-xl p-6">
              <p className="text-sm font-medium text-primary">Processing Timeline</p>
              <h3 className="mt-2 text-3xl font-black">5–10 Days</h3>
              <p className="mt-2 text-sm text-foreground/65">Subject to payment provider timelines.</p>
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
                <h2 className="text-2xl font-bold">Support Contact</h2>
                <p className="mt-2 text-foreground/65">For refund or cancellation requests.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  support@cpgeeks.com
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