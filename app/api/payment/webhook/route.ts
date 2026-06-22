// import crypto from "crypto";
// import { NextRequest, NextResponse } from "next/server";

// import { supabaseAdmin } from "@/utils/supabase/admin";

// export async function POST(req: NextRequest) {
//   try {
//     const authorization = req.headers.get("authorization");

//     const expectedHash = crypto
//       .createHash("sha256")
//       .update(
//         `${process.env.PHONEPE_WEBHOOK_USERNAME}:${process.env.PHONEPE_WEBHOOK_PASSWORD}`
//       )
//       .digest("hex");

//     if (
//       authorization &&
//       authorization.toLowerCase() !== expectedHash.toLowerCase()
//     ) {
//       console.error("Invalid webhook signature");

//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const payload = await req.json();

//     console.log("PHONEPE WEBHOOK:", JSON.stringify(payload, null, 2));

//     const merchantOrderId =
//       payload?.payload?.merchantOrderId || payload?.merchantOrderId;

//     const state = payload?.payload?.state || payload?.state;

//     const transactionId =
//       payload?.payload?.paymentDetails?.[0]?.transactionId ||
//       payload?.payload?.orderId ||
//       payload?.orderId ||
//       null;

//     if (!merchantOrderId) {
//       return NextResponse.json(
//         { error: "merchantOrderId missing" },
//         { status: 400 }
//       );
//     }

//     const { data: purchase } = await supabaseAdmin
//       .from("purchases")
//       .select("*")
//       .eq("merchant_transaction_id", merchantOrderId)
//       .single();

//     if (!purchase) {
//       return NextResponse.json(
//         { error: "Purchase not found" },
//         { status: 404 }
//       );
//     }

//     if (state === "COMPLETED") {
//       await supabaseAdmin
//         .from("purchases")
//         .update({
//           status: "SUCCESS",
//           phonepe_transaction_id: transactionId
//         })
//         .eq("merchant_transaction_id", merchantOrderId);

//       await supabaseAdmin.from("course_enrollments").upsert(
//         {
//           user_id: purchase.user_id,
//           course_id: purchase.course_id
//         },
//         {
//           onConflict: "user_id,course_id"
//         }
//       );

//       console.log("Webhook SUCCESS:", merchantOrderId);
//     }

//     if (state === "FAILED") {
//       await supabaseAdmin
//         .from("purchases")
//         .update({
//           status: "FAILED"
//         })
//         .eq("merchant_transaction_id", merchantOrderId);

//       console.log("Webhook FAILED:", merchantOrderId);
//     }

//     return NextResponse.json({
//       success: true
//     });
//   } catch (error: any) {
//     console.error("Webhook Error:", error);

//     return NextResponse.json(
//       {
//         error: "Internal server error"
//       },
//       {
//         status: 500
//       }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    console.log("=================================");
    console.log("PHONEPE WEBHOOK RECEIVED");
    console.log("=================================");

    console.log(
      "HEADERS:",
      JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2)
    );

    const payload = await req.json();

    console.log("PAYLOAD:", JSON.stringify(payload, null, 2));

    const merchantOrderId =
      payload?.payload?.merchantOrderId || payload?.merchantOrderId;

    const state = payload?.payload?.state || payload?.state;

    const transactionId =
      payload?.payload?.paymentDetails?.[0]?.transactionId ||
      payload?.payload?.orderId ||
      payload?.orderId ||
      null;

    console.log("merchantOrderId:", merchantOrderId);
    console.log("state:", state);
    console.log("transactionId:", transactionId);

    if (!merchantOrderId) {
      console.error("merchantOrderId missing");

      return NextResponse.json(
        { error: "merchantOrderId missing" },
        { status: 400 }
      );
    }

    const { data: purchase, error } = await supabaseAdmin
      .from("purchases")
      .select("*")
      .eq("merchant_transaction_id", merchantOrderId)
      .single();

    console.log("PURCHASE FOUND:", purchase);
    console.log("PURCHASE ERROR:", error);

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    if (state === "COMPLETED") {
      console.log("PROCESSING SUCCESS PAYMENT");

      await supabaseAdmin
        .from("purchases")
        .update({
          status: "SUCCESS",
          phonepe_transaction_id: transactionId
        })
        .eq("merchant_transaction_id", merchantOrderId);

      await supabaseAdmin.from("course_enrollments").upsert(
        {
          user_id: purchase.user_id,
          course_id: purchase.course_id
        },
        {
          onConflict: "user_id,course_id"
        }
      );

      console.log("SUCCESS ENROLLMENT CREATED");
    }

    if (state === "FAILED") {
      console.log("PROCESSING FAILED PAYMENT");

      await supabaseAdmin
        .from("purchases")
        .update({
          status: "FAILED"
        })
        .eq("merchant_transaction_id", merchantOrderId);
    }

    return NextResponse.json({
      success: true
    });
  } catch (error: any) {
    console.error("WEBHOOK ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}
