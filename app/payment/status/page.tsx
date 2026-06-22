"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(
    () => {
      const verifyPayment = async () => {
        const merchantOrderId = searchParams.get("merchantOrderId");

        if (!merchantOrderId) {
          router.push("/dashboard/user");
          return;
        }

        try {
          const res = await fetch(
            `/api/payment/status?merchantOrderId=${merchantOrderId}`
          );

          const data = await res.json();

          console.log(data);

          if (data.status === "SUCCESS") {
            alert("Payment Successful!");
            router.push("/dashboard/user");
            return;
          }

          if (data.status === "FAILED") {
            alert("Payment Failed");
            router.push("/dashboard/user");
            return;
          }

          alert("Payment is still processing.");
          router.push("/dashboard/user");
        } catch (err) {
          console.error(err);
          router.push("/dashboard/user");
        }
      };

      verifyPayment();
    },
    [router, searchParams]
  );

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-medium">Verifying your payment...</p>
    </div>
  );
}
