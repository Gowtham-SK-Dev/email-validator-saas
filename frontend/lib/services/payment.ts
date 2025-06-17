import { apiClient } from "@/lib/api/client"

export interface PaymentOrder {
  orderId: string
  amount: number
  currency: string
  key: string
}

export interface PaymentVerification {
  orderId: string
  paymentId: string
  signature: string
  planId: string
}

export class PaymentService {
  // Create payment order
  static async createOrder(planId: string, amount: number, currency = "INR"): Promise<PaymentOrder> {
    const response = await apiClient.post("/api/payment/create-order", {
      planId,
      amount,
      currency,
    })

    if (!response.success) {
      throw new Error(response.error || "Failed to create payment order")
    }

    return response.data
  }

  // Verify payment
  static async verifyPayment(verification: PaymentVerification) {
    const response = await apiClient.post("/api/payment/verify", verification)

    if (!response.success) {
      throw new Error(response.error || "Payment verification failed")
    }

    return response.data
  }

  // Initialize Razorpay payment
  static initializeRazorpay(
    order: PaymentOrder,
    userDetails: {
      name: string
      email: string
      phone: string
    },
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
  ) {
    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: "Your Company Name",
      description: "Subscription Payment",
      order_id: order.orderId,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      theme: {
        color: "#3B82F6",
      },
      handler: onSuccess,
      modal: {
        ondismiss: () => {
          onError(new Error("Payment cancelled by user"))
        },
      },
    }

    // Check if Razorpay is loaded
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } else {
      onError(new Error("Razorpay SDK not loaded"))
    }
  }

  // Load Razorpay script
  static loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }
}
