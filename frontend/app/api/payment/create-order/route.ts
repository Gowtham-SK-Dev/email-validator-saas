import { type NextRequest, NextResponse } from "next/server"

// Mock user authentication - replace with your actual auth system
function getUserFromToken(token: string) {
  // In production, validate JWT token and return user data
  return {
    id: "user_123",
    email: "user@example.com",
    name: "John Doe",
  }
}

// Mock database operations - replace with your actual database
async function createOrderInDB(orderData: any) {
  console.log("💾 Creating order in database:", orderData)
  // In production, save to your database
  return { success: true, orderId: orderData.orderId }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planId, amount, currency = "INR", gateway = "razorpay" } = body

    console.log(`🚀 Creating ${gateway} order:`, { planId, amount, currency })

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

    // Validate input
    if (!planId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid order details" }, { status: 400 })
    }

    // Create order based on gateway
    let order: any
    const orderId = `${gateway}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    switch (gateway) {
      case "razorpay":
        // In production, use actual Razorpay API
        // const Razorpay = require('razorpay');
        // const razorpay = new Razorpay({
        //   key_id: process.env.RAZORPAY_KEY_ID,
        //   key_secret: process.env.RAZORPAY_KEY_SECRET,
        // });
        // const order = await razorpay.orders.create({
        //   amount: amount * 100,
        //   currency,
        //   receipt: orderId,
        //   payment_capture: 1,
        // });

        order = {
          id: orderId,
          amount: amount * 100, // amount in paise
          currency,
          status: "created",
          receipt: orderId,
        }
        break

      case "stripe":
        // In production, use actual Stripe API
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        // const session = await stripe.checkout.sessions.create({
        //   payment_method_types: ['card'],
        //   line_items: [{
        //     price_data: {
        //       currency: currency.toLowerCase(),
        //       product_data: { name: 'EmailVerify Pro Subscription' },
        //       unit_amount: amount * 100,
        //     },
        //     quantity: 1,
        //   }],
        //   mode: 'payment',
        //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/payment/cancel`,
        //   metadata: { orderId, planId, userId: user.id },
        // });

        order = {
          id: orderId,
          amount: amount * 100, // amount in cents
          currency: currency === "INR" ? "usd" : currency.toLowerCase(),
          status: "created",
          session_url: `https://checkout.stripe.com/pay/${orderId}`, // Mock URL
        }
        break

      case "paypal":
        // PayPal orders are created on the client side
        order = {
          id: orderId,
          amount: amount, // amount in base currency
          currency: "USD",
          status: "created",
        }
        break

      case "upi":
        order = {
          id: orderId,
          amount: amount * 100, // amount in paise
          currency,
          status: "created",
        }
        break

      default:
        return NextResponse.json({ error: "Unsupported payment gateway" }, { status: 400 })
    }

    // Store order in database
    await createOrderInDB({
      orderId: order.id,
      userId: user.id,
      planId,
      amount,
      currency,
      gateway,
      status: "pending",
      createdAt: new Date().toISOString(),
    })

    // Return gateway-specific response
    const responseData: any = {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      gateway,
    }

    // Add gateway-specific keys
    switch (gateway) {
      case "razorpay":
        responseData.key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_key"
        break
      case "stripe":
        responseData.key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_key"
        responseData.sessionUrl = order.session_url
        break
      case "paypal":
        responseData.clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "paypal_client_id"
        break
      case "upi":
        // No additional keys needed for UPI
        break
    }

    console.log(`✅ ${gateway} order created successfully:`, responseData)

    return NextResponse.json({
      success: true,
      data: responseData,
    })
  } catch (error) {
    console.error("❌ Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
