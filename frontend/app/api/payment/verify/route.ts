import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Mock user authentication
function getUserFromToken(token: string) {
  return {
    id: "user_123",
    email: "user@example.com",
    name: "John Doe",
  }
}

// Mock database operations
async function updateUserSubscription(userId: string, planId: string) {
  return {
    success: true,
    subscription: {
      planId,
      status: "active",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  }
}

async function updateOrderStatus(orderId: string, status: string, paymentId?: string, gateway?: string) {
  return { success: true }
}

async function getOrderFromDB(orderId: string) {
  // Mock order data - in production, fetch from database
  return {
    id: orderId,
    amount: 50000, // 500 INR in paise
    currency: "INR",
    status: "pending",
  }
}

// Razorpay signature verification
function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  try {
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "test_secret"
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex")

    return process.env.NODE_ENV === "development" || expectedSignature === signature
  } catch (error) {
    console.error("❌ Razorpay signature verification error:", error)
    return false
  }
}

// Stripe payment verification
async function verifyStripePayment(sessionId: string): Promise<boolean> {
  try {
    // In production, verify with Stripe API
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.retrieve(sessionId);
    // return session.payment_status === 'paid';

    return sessionId.startsWith("cs_") || sessionId.startsWith("stripe_")
  } catch (error) {
    console.error("❌ Stripe verification error:", error)
    return false
  }
}

// PayPal payment verification
async function verifyPayPalPayment(orderId: string, paymentId: string): Promise<boolean> {
  try {
    // In production, verify with PayPal API
    // const paypal = require('@paypal/checkout-server-sdk');
    // const request = new paypal.orders.OrdersGetRequest(orderId);
    // const order = await client.execute(request);
    // return order.result.status === 'COMPLETED';

    console.log("🔐 PayPal payment verification (mock):", { orderId, paymentId })
    return paymentId && paymentId.length > 10
  } catch (error) {
    console.error("❌ PayPal verification error:", error)
    return false
  }
}

// UPI payment verification
async function verifyUPIPayment(transactionId: string, orderId: string): Promise<boolean> {
  try {
    // In production, verify with UPI provider or bank API
    console.log("🔐 UPI payment verification (mock):", { transactionId, orderId })
    return transactionId && transactionId.startsWith("upi_")
  } catch (error) {
    console.error("❌ UPI verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, paymentId, signature, planId, gateway, additionalData } = body

    // Get user from auth token
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const user = getUserFromToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Validate required fields
    if (!orderId || !paymentId || !gateway) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 })
    }

    // Get order details from database
    const order = await getOrderFromDB(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    let isPaymentValid = false

    // Verify payment based on gateway
    switch (gateway) {
      case "razorpay":
        if (!signature) {
          return NextResponse.json({ error: "Missing signature for Razorpay" }, { status: 400 })
        }
        isPaymentValid = verifyRazorpaySignature(orderId, paymentId, signature)
        break

      case "stripe":
        isPaymentValid = await verifyStripePayment(paymentId)
        break

      case "paypal":
        isPaymentValid = await verifyPayPalPayment(orderId, paymentId)
        break

      case "upi":
        isPaymentValid = await verifyUPIPayment(paymentId, orderId)
        break

      default:
        return NextResponse.json({ error: "Unsupported payment gateway" }, { status: 400 })
    }

    if (!isPaymentValid) {
      console.error(`❌ ${gateway} payment verification failed`)
      await updateOrderStatus(orderId, "failed", paymentId, gateway)
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }


    // Update order status to completed
    await updateOrderStatus(orderId, "completed", paymentId, gateway)

    // Update user subscription
    const subscriptionResult = await updateUserSubscription(user.id, planId)

    if (!subscriptionResult.success) {
      return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and subscription activated",
      data: {
        orderId,
        paymentId,
        gateway,
        amount: order.amount,
        currency: order.currency,
        subscription: subscriptionResult.subscription,
      },
    })
  } catch (error) {
    console.error("❌ Payment verification error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
