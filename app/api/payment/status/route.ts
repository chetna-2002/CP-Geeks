// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

// import { supabaseAdmin } from "@/utils/supabase/admin";
// import { getPhonePeAccessToken } from "@/lib/phonepe";

// export async function GET(req: NextRequest) {
//   try {
//     const merchantOrderId = req.nextUrl.searchParams.get("merchantOrderId");

//     if (!merchantOrderId) {
//       return NextResponse.json(
//         { error: "merchantOrderId missing" },
//         { status: 400 }
//       );
//     }

//     const token = await getPhonePeAccessToken();

//     const response = await axios.get(
//       `${process.env.PHONEPE_STATUS_URL}/${merchantOrderId}/status`,
//       {
//         headers: {
//           Authorization: `O-Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const payment = response.data;

//     console.log("PHONEPE STATUS:", payment);

//     const state = payment.state;
//     console.log("STATE:", state);

//     const { data: purchase } = await supabaseAdmin
//       .from("purchases")
//       .select(
//         `
//         *,
//         courses(*)
//       `
//       )
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
//           phonepe_transaction_id:
//             payment.paymentDetails?.[0]?.transactionId ??
//             payment.orderId ??
//             null
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

//       return NextResponse.json({
//         success: true,
//         status: "SUCCESS"
//       });
//     }

//     if (state === "FAILED") {
//       await supabaseAdmin
//         .from("purchases")
//         .update({
//           status: "FAILED"
//         })
//         .eq("merchant_transaction_id", merchantOrderId);

//       return NextResponse.json({
//         success: false,
//         status: "FAILED"
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       status: "PENDING"
//     });
//   } catch (error: any) {
//     console.error(error?.response?.data || error);

//     return NextResponse.json(
//       {
//         error: error?.response?.data || "Internal server error"
//       },
//       { status: 500 }
//     );
//   }
// }

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/utils/supabase/admin";
import { getPhonePeAccessToken } from "@/lib/phonepe";

export async function GET(req: NextRequest) {
  try {
    const merchantOrderId = req.nextUrl.searchParams.get("merchantOrderId");

    if (!merchantOrderId) {
      return NextResponse.json(
        { error: "merchantOrderId missing" },
        { status: 400 }
      );
    }

    const token = await getPhonePeAccessToken();

    const response = await axios.get(
      `${process.env.PHONEPE_STATUS_URL}/${merchantOrderId}/status`,
      {
        headers: {
          Authorization: `O-Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const payment = response.data;

    console.log("PHONEPE FULL RESPONSE:", JSON.stringify(payment, null, 2));

    const state = payment.state;

    console.log("STATE:", state);

    const { data: purchase } = await supabaseAdmin
      .from("purchases")
      .select("*")
      .eq("merchant_transaction_id", merchantOrderId)
      .single();

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    // PAYMENT SUCCESS
    if (state === "COMPLETED") {
      console.log("PAYMENT COMPLETED");

      const transactionId =
        payment.paymentDetails?.[0]?.transactionId ?? payment.orderId ?? null;

      console.log("PHONEPE TXN ID:", transactionId);

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

      return NextResponse.json({
        success: true,
        status: "SUCCESS"
      });
    }

    // PAYMENT FAILED
    if (state === "FAILED") {
      console.log("PAYMENT FAILED");

      await supabaseAdmin
        .from("purchases")
        .update({
          status: "FAILED"
        })
        .eq("merchant_transaction_id", merchantOrderId);

      return NextResponse.json({
        success: false,
        status: "FAILED"
      });
    }

    // PAYMENT PENDING
    console.log("PAYMENT STILL PENDING");

    return NextResponse.json({
      success: false,
      status: "PENDING"
    });
  } catch (error: any) {
    console.error("PHONEPE STATUS ERROR:", error?.response?.data || error);

    return NextResponse.json(
      {
        error: error?.response?.data || "Internal server error"
      },
      { status: 500 }
    );
  }
}
