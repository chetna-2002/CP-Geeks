"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4 border-b border-border/30 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-foreground/60">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <p className="text-lg text-foreground/70 leading-relaxed">
            CP Geeks values your privacy and is committed to protecting your
            personal information. This Privacy Policy explains how we collect,
            use, store, and protect your data when you use our platform,
            courses, and related services.
          </p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              1. Information We Collect
            </h2>

            <p>
              We may collect the following types of information:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information.</li>
              <li>Email address</li>
              <li>Account and login details.</li>
              <li>Course enrollment and progress information.</li>
              <li>Payment-related details processed through secure payment gateways.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              2. How We Use Your Information
            </h2>

            <p>
              Your information may be used to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide access to courses and learning resources.</li>
              <li>Process payments and verify transactions.</li>
              <li>Communicate updates, schedules, and announcements.</li>
              <li>Improve platform performance and user experience.</li>
              <li>Provide mentorship, support, and customer service.</li>
              <li>Prevent fraud, abuse, or unauthorized activity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              3. Payment Information
            </h2>

            <p>
              Payments on CP Geeks are processed through trusted third-party
              payment gateways.
            </p>

            <p>
              We do not directly store sensitive payment details such as:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Debit or credit card numbers.</li>
              <li>CVV details.</li>
              <li>Net banking credentials.</li>
              <li>UPI PINs or banking passwords.</li>
            </ul>

            <p>
              Payment providers may collect and process data according to their
              own privacy policies and security standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              4. Cookies & Analytics
            </h2>

            <p>
              CP Geeks may use cookies, session storage, and analytics tools to
              improve functionality, security, and user experience.
            </p>

            <p>
              These technologies help us understand user behavior, optimize
              performance, and maintain platform reliability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              5. Third-Party Services
            </h2>

            <p>
              We may use trusted third-party services including:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Payment gateways.</li>
              <li>Cloud hosting providers.</li>
              <li>Authentication and database services.</li>
              <li>Video communication platforms such as Zoom or Google Meet.</li>
              <li>Analytics and monitoring tools.</li>
            </ul>

            <p>
              These services may process limited user information necessary to
              provide platform functionality.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              6. Data Security
            </h2>

            <p>
              We implement reasonable security measures to protect user data
              from unauthorized access, misuse, disclosure, or alteration.
            </p>

            <p>
              However, no internet-based platform can guarantee absolute
              security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              7. Data Sharing
            </h2>

            <p>
              CP Geeks does not sell user personal information to third
              parties.
            </p>

            <p>
              We may share limited information when required:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>To comply with legal obligations.</li>
              <li>To prevent fraud or abuse.</li>
              <li>To provide essential platform services.</li>
              <li>With trusted service providers operating on our behalf.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              8. User Rights
            </h2>

            <p>
              Users may request:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Access to their stored information.</li>
              <li>Correction of inaccurate data.</li>
              <li>Deletion of their account where applicable.</li>
            </ul>

            <p>
              Requests may be submitted through our support email.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              9. Children’s Privacy
            </h2>

            <p>
              CP Geeks is not intended for children under the age of 13 without
              parental or guardian supervision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              10. Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy periodically to reflect
              operational, legal, or platform changes.
            </p>

            <p>
              Continued use of the platform after updates constitutes acceptance
              of the revised policy.
            </p>
          </section>

          <section className="space-y-3 border-t border-border/30 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">
              11. Contact Information
            </h2>

            <p>
              For privacy-related concerns or support, contact:
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