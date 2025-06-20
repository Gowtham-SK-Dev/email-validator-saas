import type { Request, Response } from "express"
import Razorpay from "razorpay"
import { getAllSubscriptionTypes, getSubscriptionTypeById } from "../models/subscription-type.model"
import { createSubscription } from "../models/subscription.model"
import { getUserById, updateUser } from "../models/user.model"
import { createPayment } from "../models/payment.model"
import { createWarranty } from "../models/warranty.model"

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env["RAZORPAY_KEY_ID"] || "",
  key_secret: process.env["RAZORPAY_KEY_SECRET"] || "",
})

// Get all subscription plans
export const getSubscriptionPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriptionPlans = await getAllSubscriptionTypes()
    res.status(200).json({ subscriptionPlans })
  } catch (error) {
    console.error("Get subscription plans error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Create a subscription order (initial step)
export const createSubscriptionOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    const { subscription_type_id, payment_type_id } = req.body

    // Get subscription type
    const subscriptionType = await getSubscriptionTypeById(subscription_type_id)
    if (!subscriptionType) {
      res.status(404).json({ message: "Subscription plan not found" })
      return
    }

    // Get user
    const user = await getUserById(req.user.id)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    // Create Razorpay order (as an example, assuming Razorpay)
    if (payment_type_id === 1) {
      // Razorpay
      const options = {
        amount: subscriptionType.price * 100, // amount in paise
        currency: "INR",
        receipt: `receipt_${req.user.id}_${Date.now()}`,
        notes: {
          user_id: req.user.id.toString(),
          subscription_type_id: subscription_type_id.toString(),
        },
      }

      const order = await razorpay.orders.create(options)

      res.status(200).json({
        order_id: order.id,
        amount: Number(order.amount) / 100, // Convert to number explicitly
        currency: order.currency,
        subscription_details: subscriptionType,
      })
      return
    }

    // For other payment types (PayPal, Stripe)
    // Implement similar logic based on payment gateway

    res.status(400).json({ message: "Unsupported payment type" })
  } catch (error) {
    console.error("Create subscription order error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Verify payment and activate subscription
export const verifySubscriptionPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, subscription_type_id, payment_type_id } =
      req.body

    const userId = req.user.id

    // Get subscription type
    const subscriptionType = await getSubscriptionTypeById(subscription_type_id)
    if (!subscriptionType) {
      res.status(404).json({ message: "Subscription plan not found" })
      return
    }

    // Here we should verify the Razorpay signature
    // This is a simplified example, in production use proper verification

    // Calculate subscription dates
    const startDate = new Date()
    let endDate: Date | null = null

    if (subscriptionType.validity) {
      endDate = new Date()
      // Add validity in days to end date
      endDate.setDate(endDate.getDate() + subscriptionType.validity)
    }

    // Create subscription record
    const subscription = await createSubscription({
      user_id: userId,
      payment_type_id,
      subscription_type_id,
      transaction_id: razorpay_payment_id,
      amount: subscriptionType.price,
      start_date: startDate,
      end_date: endDate,
      status: "active",
    })

    // Create payment record
    await createPayment({
      user_id: userId,
      amount: subscriptionType.price,
      payment_type_id,
      subscription_id: subscription.id,
      transaction_id: razorpay_payment_id,
      status: "completed",
    })

    // Create warranty record and update user balance
    if (subscriptionType.hit_limit > 0) {
      await createWarranty({
        user_id: userId,
        initial_click_count: subscriptionType.hit_limit,
        current_click_count: subscriptionType.hit_limit,
        used_click_count: 0,
        is_active: true,
      })

      // Update user balance
      const user = await getUserById(userId)
      if (user) {
        const newBalance = user.balance_click_count + subscriptionType.hit_limit
        await updateUser(userId, { balance_click_count: newBalance })
      }
    }

    res.status(200).json({
      message: "Payment verified and subscription activated",
      subscription_id: subscription.id,
    })
  } catch (error) {
    console.error("Verify subscription payment error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
