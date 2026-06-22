import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { getPhonePeAccessToken } from "@/lib/phonepe";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient(cookies());

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Fetch course
    const { data: course, error: courseError } = await supabaseAdmin
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .eq("is_published", true)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Prevent duplicate successful purchase
    const { data: existingPurchase } = await supabaseAdmin
      .from("purchases")
      .select("*")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .eq("status", "SUCCESS")
      .maybeSingle();

    if (existingPurchase) {
      return NextResponse.json(
        { error: "Course already purchased" },
        { status: 400 }
      );
    }

    const merchantTransactionId = `CPG_${Date.now()}_${user.id.slice(0, 8)}`;

    // Create pending purchase
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        user_id: user.id,
        course_id: course.id,
        amount: course.price,
        status: "PENDING",
        payment_provider: "phonepe",
        merchant_transaction_id: merchantTransactionId
      })
      .select()
      .single();

    if (purchaseError || !purchase) {
      console.error(purchaseError);

      return NextResponse.json(
        { error: "Failed to create purchase" },
        { status: 500 }
      );
    }

    // Get OAuth token
    const token = await getPhonePeAccessToken();
    console.log("PAY URL:", process.env.PHONEPE_PAY_URL);
    console.log("OAUTH URL:", process.env.PHONEPE_OAUTH_URL);
    console.log("TOKEN:", token?.substring(0, 20));

    console.log(
      "REDIRECT URL:",
      `${process.env.NEXT_PUBLIC_APP_URL}/payment/status`
    );

    // Create PhonePe payment
    const phonePeResponse = await axios.post(
      process.env.PHONEPE_PAY_URL!,
      {
        merchantOrderId: merchantTransactionId,
        amount: course.price * 100,
        expireAfter: 1200,
        paymentFlow: {
          type: "PG_CHECKOUT",
          merchantUrls: {
            redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/status?merchantOrderId=${merchantTransactionId}`
          }
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `O-Bearer ${token?.trim()}`
        }
      }
    );

    return NextResponse.json({
      success: true,
      checkoutUrl: phonePeResponse.data.redirectUrl,

      purchaseId: purchase.id
    });
  } catch (error: any) {
    console.error("PhonePe Error:", error?.response?.data || error);
    console.error("STATUS:", error?.response?.status);
    console.error("DATA:", error?.response?.data);
    console.error("HEADERS:", error?.response?.headers);
    console.error("MESSAGE:", error?.message);

    return NextResponse.json(
      {
        error: error?.response?.data || "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}
