"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4 border-b border-border/30 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-foreground/60">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <p className="text-lg text-foreground/70 leading-relaxed">
            Welcome to CP Geeks. By accessing or using our platform, courses,
            services, and community, you agree to comply with these Terms &
            Conditions.
          </p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              1. About CP Geeks
            </h2>

            <p>
              CP Geeks is an online learning platform that provides technical
              education, mentorship, live classes, career guidance, and related
              educational services for software engineering students and
              professionals.
            </p>

            <p>
              Classes may be conducted through third-party platforms including
              Zoom, Google Meet, or other communication tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              2. Eligibility
            </h2>

            <p>
              By using our platform, you confirm that:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>You are at least 13 years old.</li>
              <li>
                You are legally capable of entering into binding agreements.
              </li>
              <li>
                The information provided during registration is accurate and
                complete.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              3. Accounts & Access
            </h2>

            <p>
              Users are responsible for maintaining the confidentiality of their
              account credentials.
            </p>

            <p>
              You agree not to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Share your account with others.</li>
              <li>Resell or redistribute course access.</li>
              <li>Use the platform for unlawful purposes.</li>
              <li>Attempt to exploit or disrupt platform services.</li>
            </ul>

            <p>
              CP Geeks reserves the right to suspend or terminate accounts that
              violate these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              4. Payments & Pricing
            </h2>

            <p>
              Course pricing, offers, and availability are subject to change at
              any time without prior notice.
            </p>

            <p>
              Payments are securely processed through third-party payment
              gateways. CP Geeks does not directly store sensitive payment
              information such as card details or banking credentials.
            </p>

            <p>
              Access to paid courses or cohorts may only be granted after
              successful payment verification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              5. Refund Policy
            </h2>

            <p>
              Refund eligibility is governed by our dedicated Refund Policy.
            </p>

            <p>
              By purchasing any course or service, you agree to the terms stated
              in the Refund Policy page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              6. Intellectual Property
            </h2>

            <p>
              All content available on CP Geeks including videos, notes,
              branding, designs, source code examples, graphics, and course
              material are the intellectual property of CP Geeks unless
              otherwise stated.
            </p>

            <p>
              Users may not reproduce, distribute, record, upload, or publicly
              share course materials without written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              7. Live Classes & Scheduling
            </h2>

            <p>
              Live sessions may occasionally be rescheduled, postponed, or
              modified due to operational or instructor-related reasons.
            </p>

            <p>
              CP Geeks is not responsible for:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>User internet connectivity issues.</li>
              <li>Hardware or software problems on the user side.</li>
              <li>Missed sessions caused by user unavailability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              8. Community Guidelines
            </h2>

            <p>
              Users are expected to maintain respectful and professional
              behavior during classes, discussions, and community interactions.
            </p>

            <p>
              Harassment, abuse, hate speech, spam, or disruptive conduct may
              result in immediate removal from the platform without refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              9. Limitation of Liability
            </h2>

            <p>
              CP Geeks does not guarantee job placements, interview success, or
              specific career outcomes.
            </p>

            <p>
              To the maximum extent permitted by law, CP Geeks shall not be
              liable for indirect, incidental, or consequential damages arising
              from platform usage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              10. Privacy
            </h2>

            <p>
              Your use of CP Geeks is also governed by our Privacy Policy,
              which explains how we collect, use, and protect your information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              11. Changes to Terms
            </h2>

            <p>
              CP Geeks reserves the right to update or modify these Terms &
              Conditions at any time. Continued use of the platform after
              updates constitutes acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-3 border-t border-border/30 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">
              12. Contact Information
            </h2>

            <p>
              For questions, support, or legal concerns, contact:
            </p>

            <div className="rounded-xl border border-border/40 bg-card p-5">
              <p>
                <span className="font-medium text-foreground">Platform:</span>{" "}
                CP Geeks
              </p>

              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                cpgeeksofficial@gmail.com
              </p>

              <p>
                <span className="font-medium text-foreground">Country:</span>{" "}
                India
              </p>
            </div>
          </section>

          <div className="pt-6">
            <Link
              href="/"
              className="text-primary hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}