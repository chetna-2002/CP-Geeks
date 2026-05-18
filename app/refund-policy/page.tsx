"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4 border-b border-border/30 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Refund & Cancellation Policy
          </h1>

          <p className="text-foreground/60">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <p className="text-lg text-foreground/70 leading-relaxed">
            At CP Geeks, we aim to provide high-quality learning experiences
            through mentorship, live classes, and technical education. This
            Refund & Cancellation Policy explains the conditions under which
            refunds may be granted.
          </p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              1. Refund Eligibility
            </h2>

            <p>
              Refund requests may be considered only if submitted within
              <span className="font-semibold text-foreground"> 3 days </span>
              of successful payment.
            </p>

            <p>
              Refund eligibility depends on factors including course access,
              attendance, resource usage, and platform activity.
            </p>

            <p>
              CP Geeks reserves the right to approve or reject refund requests
              after reviewing the request details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              2. Non-Refundable Situations
            </h2>

            <p>
              Refunds may not be provided in the following cases:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Failure to attend live sessions.</li>
              <li>Change of mind after purchase.</li>
              <li>Requests made after the refund window.</li>
              <li>Violation of platform policies or community guidelines.</li>
              <li>Excessive usage or significant course consumption.</li>
              <li>Technical issues caused by the user’s device or internet.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              3. Live Classes & Scheduling
            </h2>

            <p>
              CP Geeks may occasionally reschedule classes, mentorship calls,
              or sessions due to operational requirements or instructor
              availability.
            </p>

            <p>
              Such changes do not automatically qualify for refunds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              4. Cancellation Policy
            </h2>

            <p>
              Users may cancel future participation in a cohort or learning
              program by contacting support.
            </p>

            <p>
              Cancellation of access does not guarantee a refund unless it falls
              within the eligible refund conditions mentioned above.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              5. Refund Processing Time
            </h2>

            <p>
              Approved refunds are typically processed within
              <span className="font-semibold text-foreground">
                {" "}
                5–10 business days
              </span>
              .
            </p>

            <p>
              The actual credit timeline may vary depending on the payment
              provider, bank, or financial institution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              6. Fraud Prevention
            </h2>

            <p>
              CP Geeks reserves the right to deny refund requests suspected of:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Fraudulent activity.</li>
              <li>Policy abuse.</li>
              <li>Unauthorized payment disputes or chargebacks.</li>
              <li>Violation of platform terms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              7. Contact Support
            </h2>

            <p>
              For refund or cancellation requests, contact:
            </p>

            <div className="rounded-xl border border-border/40 bg-card p-5">
              <p>
                <span className="font-medium text-foreground">Platform:</span>{" "}
                CP Geeks
              </p>

              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                support@cpgeeks.com
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