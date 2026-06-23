"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Clock3, Loader2 } from "lucide-react";

function PaymentStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<
    "loading" | "success" | "failed" | "pending"
  >("loading");

  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(
    () => {
      const verifyPayment = async () => {
        const merchantOrderId = searchParams.get("merchantOrderId");

        if (!merchantOrderId) {
          router.replace("/dashboard/user");
          return;
        }

        try {
          const res = await fetch(
            `/api/payment/status?merchantOrderId=${merchantOrderId}`
          );

          const data = await res.json();

          if (data.status === "SUCCESS") {
            setStatus("success");
            setMessage(
              "Your payment was successful. Redirecting to dashboard..."
            );

            setTimeout(() => {
              router.replace("/dashboard/user");
            }, 3000);

            return;
          }

          if (data.status === "FAILED") {
            setStatus("failed");
            setMessage("Payment failed. Redirecting to dashboard...");

            setTimeout(() => {
              router.replace("/dashboard/user");
            }, 3000);

            return;
          }

          setStatus("pending");
          setMessage(
            "Payment is still being processed. Redirecting shortly..."
          );

          setTimeout(() => {
            router.replace("/dashboard/user");
          }, 5000);
        } catch (error) {
          console.error(error);

          setStatus("failed");
          setMessage("Something went wrong while verifying your payment.");

          setTimeout(() => {
            router.replace("/dashboard/user");
          }, 3000);
        }
      };

      verifyPayment();
    },
    [router, searchParams]
  );

  const getStatusUI = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-16 w-16 text-green-500" />;

      case "failed":
        return <XCircle className="h-16 w-16 text-red-500" />;

      case "pending":
        return <Clock3 className="h-16 w-16 text-amber-500" />;

      default:
        return <Loader2 className="h-16 w-16 animate-spin text-primary" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case "success":
        return "Payment Successful";

      case "failed":
        return "Payment Failed";

      case "pending":
        return "Payment Pending";

      default:
        return "Verifying Payment";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-6 md:p-8 shadow-lg">
        <div className="flex flex-col items-center text-center gap-5">
          {getStatusUI()}

          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              {getTitle()}
            </h1>

            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              {message}
            </p>
          </div>

          <div className="w-full rounded-xl bg-muted/50 p-3 text-xs md:text-sm text-muted-foreground">
            Please do not close this page while we verify your transaction.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
