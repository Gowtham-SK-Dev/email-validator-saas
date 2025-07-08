import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Webhook handlers for different payment gateways
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature =
      request.headers.get("x-razorpay-signature") ||
      request.headers.get("stripe-signature") ||
      request.headers.get("paypal-transmission-sig")


    // Determine webhook source based on headers or body content
    let webhookSource = "unknown"

    if (request.headers.get("x-razorpay-signature")) {
      webhookSource = "razorpay"
    } else if (request.headers.get("stripe-signature")) {
      webhookSource = "stripe"
    } else if (request.headers.get("paypal-transmission-sig")) {
      webhookSource = "paypal"
    }


    switch (webhookSource) {
      case "razorpay":
        return await handleRazorpayWebhook(body, signature!)
      case "stripe":
        return await handleStripeWebhook(body, signature!)
      case "paypal":
        return await handlePayPalWebhook(body, signature!)
      default:
        return NextResponse.json({ error: "Unknown webhook source" }, { status: 400 })
    }
  } catch (error) {
    console.error("❌ Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleRazorpayWebhook(body: string, signature: string) {
  try {
    // Verify Razorpay webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "webhook_secret"
    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex")

    if (signature !== expectedSignature && process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    switch (event.event) {
      case "payment.captured":
        const payment = event.payload.payment.entity
        // Update order status, send confirmation email, etc.
        await processSuccessfulPayment("razorpay", payment.order_id, payment.id)
        break

      case "payment.failed":
        const failedPayment = event.payload.payment.entity
        await processFailedPayment("razorpay", failedPayment.order_id, failedPayment.id)
        break

      case "order.paid":
        const order = event.payload.order.entity
        break

      default:
        console.log("⚠️ Unhandled Razorpay webhook event:", event.event)
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("❌ Razorpay webhook error:", error)
    return NextResponse.json({ error: "Razorpay webhook processing failed" }, { status: 500 })
  }
}

async function handleStripeWebhook(body: string, signature: string) {
  try {
    // In production, verify Stripe webhook signature
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    const event = JSON.parse(body)

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        await processSuccessfulPayment("stripe", session.metadata?.orderId, session.id)
        break

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        break

      case "payment_intent.payment_failed":
        const failedIntent = event.data.object
        await processFailedPayment("stripe", failedIntent.metadata?.orderId, failedIntent.id)
        break

      default:
        console.log("⚠️ Unhandled Stripe webhook event:", event.type)
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("❌ Stripe webhook error:", error)
    return NextResponse.json({ error: "Stripe webhook processing failed" }, { status: 500 })
  }
}

async function handlePayPalWebhook(body: string, signature: string) {
  try {
    // In production, verify PayPal webhook signature
    const event = JSON.parse(body)
    console.log("🔔 PayPal webhook event:", event.event_type)

    switch (event.event_type) {
      case "CHECKOUT.ORDER.APPROVED":
        const approvedOrder = event.resource
        console.log("✅ PayPal order approved:", approvedOrder.id)
        break

      case "PAYMENT.CAPTURE.COMPLETED":
        const capture = event.resource
        console.log("✅ PayPal payment captured:", capture.id)
        await processSuccessfulPayment("paypal", capture.custom_id, capture.id)
        break

      case "PAYMENT.CAPTURE.DENIED":
        const deniedCapture = event.resource
        console.log("❌ PayPal payment denied:", deniedCapture.id)
        await processFailedPayment("paypal", deniedCapture.custom_id, deniedCapture.id)
        break

      default:
        console.log("⚠️ Unhandled PayPal webhook event:", event.event_type)
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("❌ PayPal webhook error:", error)
    return NextResponse.json({ error: "PayPal webhook processing failed" }, { status: 500 })
  }
}

async function processSuccessfulPayment(gateway: string, orderId: string, paymentId: string) {
  try {
    console.log(`✅ Processing successful ${gateway} payment:`, { orderId, paymentId })

    // Update order status in database
    // Send confirmation email
    // Update user subscription if not already done
    // Trigger analytics events

    // Mock implementation
    console.log("📧 Sending payment confirmation email")
    console.log("📊 Recording payment analytics")
  } catch (error) {
    console.error("❌ Error processing successful payment:", error)
  }
}

async function processFailedPayment(gateway: string, orderId: string, paymentId: string) {
  try {
    console.log(`❌ Processing failed ${gateway} payment:`, { orderId, paymentId })

    // Update order status in database
    // Send failure notification email
    // Trigger retry logic if applicable

    // Mock implementation
    console.log("📧 Sending payment failure notification")
  } catch (error) {
    console.error("❌ Error processing failed payment:", error)
  }
}
