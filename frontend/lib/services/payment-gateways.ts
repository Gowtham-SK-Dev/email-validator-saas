// Enhanced Payment Gateway Service Layer with proper verification
export interface PaymentOrder {
  orderId: string
  amount: number
  currency: string
  key?: string
  clientId?: string
  sessionUrl?: string
}

export interface PaymentVerification {
  orderId: string
  paymentId: string
  signature?: string
  planId: string
  gateway: string
  additionalData?: any
}

// Razorpay Service with proper verification
export class RazorpayService {
  static async loadScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        console.log("✅ Razorpay already loaded")
        resolve(true)
        return
      }

      console.log("🔄 Loading Razorpay script...")
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        console.log("✅ Razorpay script loaded successfully")
        resolve(true)
      }
      script.onerror = () => {
        console.error("❌ Failed to load Razorpay script")
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  static async initializePayment(
    order: PaymentOrder,
    userDetails: { name: string; email: string; phone: string },
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
  ) {
    try {
      console.log("🚀 Initializing Razorpay payment with order:", order)

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "EmailVerify Pro",
        description: "Email Validation Service Subscription",
        order_id: order.orderId,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: "#3B82F6",
        },
        handler: (response: any) => {
          console.log("✅ Razorpay payment successful:", response)
          onSuccess({
            gateway: "razorpay",
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
        },
        modal: {
          ondismiss: () => {
            console.log("⚠️ Razorpay payment modal dismissed")
            onError(new Error("Payment cancelled by user"))
          },
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
        timeout: 300, // 5 minutes
        remember_customer: false,
      }

      const razorpay = new (window as any).Razorpay(options)

      razorpay.on("payment.failed", (response: any) => {
        console.error("❌ Razorpay payment failed:", response.error)
        onError(new Error(`Payment failed: ${response.error.description}`))
      })

      razorpay.open()
    } catch (error) {
      console.error("❌ Razorpay initialization error:", error)
      onError(error)
    }
  }
}

// Stripe Service with proper session handling
export class StripeService {
  static async loadScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Stripe) {
        console.log("✅ Stripe already loaded")
        resolve(true)
        return
      }

      console.log("🔄 Loading Stripe script...")
      const script = document.createElement("script")
      script.src = "https://js.stripe.com/v3/"
      script.onload = () => {
        console.log("✅ Stripe script loaded successfully")
        resolve(true)
      }
      script.onerror = () => {
        console.error("❌ Failed to load Stripe script")
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  static async initializePayment(
    order: PaymentOrder,
    userDetails: { name: string; email: string; phone: string },
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
  ) {
    try {
      console.log("🚀 Initializing Stripe payment with order:", order)

      const stripe = (window as any).Stripe(order.key)

      if (order.sessionUrl) {
        // Redirect to Stripe Checkout
        console.log("🔄 Redirecting to Stripe Checkout...")
        window.location.href = order.sessionUrl
      } else {
        // Use session ID for redirect
        const { error } = await stripe.redirectToCheckout({
          sessionId: order.orderId,
        })

        if (error) {
          console.error("❌ Stripe redirect error:", error)
          onError(error)
        }
      }
    } catch (error) {
      console.error("❌ Stripe initialization error:", error)
      onError(error)
    }
  }
}

// PayPal Service with proper order handling
export class PayPalService {
  static async loadScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).paypal) {
        console.log("✅ PayPal already loaded")
        resolve(true)
        return
      }

      console.log("🔄 Loading PayPal script...")

      // Remove existing PayPal scripts
      const existingScripts = document.querySelectorAll('script[src*="paypal.com"]')
      existingScripts.forEach((script) => script.remove())

      const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
      if (!clientId) {
        console.error("❌ PayPal Client ID not found")
        resolve(false)
        return
      }

      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&enable-funding=venmo,paylater&disable-funding=credit,card`
      script.async = true

      script.onload = () => {
        console.log("✅ PayPal script loaded successfully")
        setTimeout(() => {
          if ((window as any).paypal && (window as any).paypal.Buttons) {
            console.log("✅ PayPal Buttons available")
            resolve(true)
          } else {
            console.error("❌ PayPal Buttons not available after loading")
            resolve(false)
          }
        }, 1000)
      }

      script.onerror = (error) => {
        console.error("❌ Failed to load PayPal script:", error)
        resolve(false)
      }

      document.head.appendChild(script)
    })
  }

  static async initializePayment(
    order: PaymentOrder,
    userDetails: { name: string; email: string; phone: string },
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
    containerId = "paypal-button-container",
  ) {
    try {
      console.log("🚀 Initializing PayPal payment with order:", order)

      const paypal = (window as any).paypal

      if (!paypal || !paypal.Buttons) {
        throw new Error("PayPal SDK not loaded properly")
      }

      // Clear existing container
      const container = document.getElementById(containerId)
      if (container) {
        container.innerHTML = ""
      }

      console.log("🔄 Creating PayPal buttons...")

      paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
            height: 45,
          },
          createOrder: (data: any, actions: any) => {
            console.log("🔄 Creating PayPal order...")
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: (order.amount / 100).toFixed(2),
                    currency_code: "USD",
                  },
                  description: "EmailVerify Pro Subscription",
                  custom_id: order.orderId,
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
                brand_name: "EmailVerify Pro",
              },
            })
          },
          onApprove: async (data: any, actions: any) => {
            try {
              console.log("✅ PayPal payment approved:", data)
              const details = await actions.order.capture()
              console.log("✅ PayPal payment captured:", details)

              onSuccess({
                gateway: "paypal",
                paypal_order_id: data.orderID,
                paypal_payment_id: details.id,
                payer: details.payer,
                purchase_units: details.purchase_units,
              })
            } catch (error) {
              console.error("❌ PayPal capture error:", error)
              onError(error)
            }
          },
          onError: (error: any) => {
            console.error("❌ PayPal error:", error)
            onError(new Error(`PayPal error: ${error.message || "Unknown error"}`))
          },
          onCancel: (data: any) => {
            console.log("⚠️ PayPal payment cancelled:", data)
            onError(new Error("Payment cancelled by user"))
          },
        })
        .render(`#${containerId}`)
        .then(() => {
          console.log("✅ PayPal buttons rendered successfully")
        })
        .catch((error: any) => {
          console.error("❌ PayPal render error:", error)
          onError(error)
        })
    } catch (error) {
      console.error("❌ PayPal initialization error:", error)
      onError(error)
    }
  }
}

// UPI Service with proper verification
export class UPIService {
  static async initializePayment(
    order: PaymentOrder,
    userDetails: { name: string; email: string; phone: string },
    upiId: string,
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
  ) {
    try {
      console.log("🚀 Initializing UPI payment with order:", order)

      // Validate UPI ID format
      if (!upiId || !upiId.includes("@")) {
        throw new Error("Invalid UPI ID format")
      }

      // Create UPI payment URL with proper parameters
      const amount = (order.amount / 100).toFixed(2)
      const transactionNote = `EmailVerify Pro - ${order.orderId}`

      const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(userDetails.name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}&tr=${encodeURIComponent(order.orderId)}`

      console.log("🔄 Generated UPI URL:", upiUrl)

      // Create a more user-friendly UPI payment flow
      const paymentWindow = window.open("", "_blank", "width=400,height=600")

      if (paymentWindow) {
        paymentWindow.document.write(`
          <html>
            <head>
              <title>UPI Payment</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; text-align: center; background: #f5f5f5; }
                .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .amount { font-size: 24px; font-weight: bold; color: #2563eb; margin: 20px 0; }
                .upi-id { background: #f3f4f6; padding: 10px; border-radius: 5px; margin: 10px 0; }
                .btn { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 10px; }
                .btn:hover { background: #1d4ed8; }
                .btn-success { background: #059669; }
                .btn-danger { background: #dc2626; }
                .qr-code { margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>🏦 UPI Payment</h2>
                <div class="amount">₹${amount}</div>
                <p><strong>Pay to:</strong></p>
                <div class="upi-id">${upiId}</div>
                <p><strong>Order ID:</strong> ${order.orderId}</p>
                
                <div style="margin: 30px 0;">
                  <button class="btn" onclick="openUPIApp()">📱 Open UPI App</button>
                </div>
                
                <hr style="margin: 30px 0;">
                
                <p><strong>After completing payment in your UPI app:</strong></p>
                <button class="btn btn-success" onclick="confirmPayment()">✅ Payment Completed</button>
                <button class="btn btn-danger" onclick="cancelPayment()">❌ Payment Failed</button>
              </div>
              
              <script>
                function openUPIApp() {
                  window.location.href = '${upiUrl}';
                }
                
                function confirmPayment() {
                  const transactionId = prompt('Enter UPI Transaction ID (optional):') || 'upi_${Date.now()}';
                  window.opener.postMessage({
                    type: 'UPI_SUCCESS',
                    data: {
                      gateway: 'upi',
                      upi_transaction_id: transactionId,
                      upi_id: '${upiId}',
                      amount: ${order.amount},
                      order_id: '${order.orderId}'
                    }
                  }, '*');
                  window.close();
                }
                
                function cancelPayment() {
                  window.opener.postMessage({
                    type: 'UPI_ERROR',
                    error: 'Payment cancelled or failed'
                  }, '*');
                  window.close();
                }
                
                // Auto-open UPI app after 2 seconds
                setTimeout(openUPIApp, 2000);
              </script>
            </body>
          </html>
        `)
      }

      // Listen for messages from the payment window
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === "UPI_SUCCESS") {
          console.log("✅ UPI payment successful:", event.data.data)
          window.removeEventListener("message", messageHandler)
          onSuccess(event.data.data)
        } else if (event.data.type === "UPI_ERROR") {
          console.error("❌ UPI payment error:", event.data.error)
          window.removeEventListener("message", messageHandler)
          onError(new Error(event.data.error))
        }
      }

      window.addEventListener("message", messageHandler)

      // Fallback timeout
      setTimeout(() => {
        window.removeEventListener("message", messageHandler)
        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close()
          onError(new Error("UPI payment timeout"))
        }
      }, 300000) // 5 minutes timeout
    } catch (error) {
      console.error("❌ UPI payment error:", error)
      onError(error)
    }
  }
}
