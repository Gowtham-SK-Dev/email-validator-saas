"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  ArrowLeft,
  Shield,
  Loader2,
  CreditCard,
  DollarSign,
  Smartphone,
  AlertCircle,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EnhancedLink } from "@/components/enhanced-link"
import { useToast } from "@/hooks/use-toast"
import { RazorpayService, StripeService, PayPalService, UPIService } from "@/lib/services/payment-gateways"

const paymentMethods = [
  {
    id: "razorpay",
    name: "Razorpay",
    icon: CreditCard,
    description: "Card, UPI, Net Banking, Wallets",
    popular: true,
    currencies: ["INR"],
    features: ["Instant verification", "Multiple payment options", "Secure processing"],
  },
  {
    id: "stripe",
    name: "Stripe",
    icon: CreditCard,
    description: "International Cards",
    popular: false,
    currencies: ["USD", "EUR", "GBP"],
    features: ["Global acceptance", "Advanced security", "Instant processing"],
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: DollarSign,
    description: "PayPal Account or Card",
    popular: false,
    currencies: ["USD"],
    features: ["Buyer protection", "Easy checkout", "Trusted worldwide"],
  },
  {
    id: "upi",
    name: "UPI Direct",
    icon: Smartphone,
    description: "Direct UPI Payment",
    popular: false,
    currencies: ["INR"],
    features: ["Instant transfer", "No additional fees", "Bank-to-bank"],
  },
]

const defaultPlan = {
  id: "pro",
  name: "Pro Plan",
  price: "500",
  hits: "3,500 hits",
  validity: "Monthly",
  features: [
    "API Access",
    "Email Validation",
    "Priority Support",
    "Syntax Checking",
    "Domain Validation",
    "MX Record Checking",
    "SMTP Verification",
  ],
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const [planDetails, setPlanDetails] = useState(defaultPlan)
  const [selectedMethod, setSelectedMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"form" | "processing" | "verifying" | "success" | "error">("form")
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [verificationStep, setVerificationStep] = useState("")
  const [paymentError, setPaymentError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    upiId: "",
  })

  // Calculate pricing based on selected gateway
  const basePrice = Number.parseInt(planDetails.price, 10) || 500
  const currency = selectedMethod === "paypal" || selectedMethod === "stripe" ? "USD" : "INR"
  const convertedPrice = currency === "USD" ? Math.round(basePrice / 83) : basePrice
  const gst = currency === "INR" ? Math.round(convertedPrice * 0.18) : 0
  const total = convertedPrice + gst

  useEffect(() => {
    const plan = searchParams.get("plan")
    const price = searchParams.get("price")
    const name = searchParams.get("name")
    const calls = searchParams.get("calls")

    if (plan && price && name) {
      setPlanDetails({
        id: plan,
        name: name,
        price: price,
        hits: calls || defaultPlan.hits,
        validity: "Monthly",
        features: defaultPlan.features,
      })
    }
  }, [searchParams])

  // Load PayPal when selected
  useEffect(() => {
    if (selectedMethod === "paypal" && !paypalLoaded) {
      PayPalService.loadScript().then((loaded) => {
        setPaypalLoaded(loaded)
        if (!loaded) {
          toast({
            title: "PayPal Loading Error",
            description: "Failed to load PayPal. Please try another payment method.",
            variant: "destructive",
          })
        }
      })
    }
  }, [selectedMethod, paypalLoaded, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const required = ["name", "email", "phone"]

    if (selectedMethod === "upi") {
      required.push("upiId")
    }

    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Validation Error",
          description: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
          variant: "destructive",
        })
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return false
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone.replace(/\D/g, "").slice(-10))) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      })
      return false
    }

    // UPI ID validation
    if (selectedMethod === "upi" && !formData.upiId.includes("@")) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid UPI ID (e.g., user@paytm)",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const createPaymentOrder = async () => {
    setVerificationStep("Creating payment order...")

    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mock_token_123",
      },
      body: JSON.stringify({
        planId: planDetails.id,
        amount: convertedPrice,
        currency,
        gateway: selectedMethod,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to create order")
    }

    const data = await response.json()
    return data.data
  }

  const verifyPayment = async (paymentData: any) => {
    setPaymentStatus("verifying")
    setVerificationStep("Verifying payment with bank...")

    const response = await fetch("/api/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mock_token_123",
      },
      body: JSON.stringify({
        orderId: paymentData.orderId || paymentData.razorpay_order_id,
        paymentId:
          paymentData.paymentId ||
          paymentData.razorpay_payment_id ||
          paymentData.stripe_session_id ||
          paymentData.paypal_payment_id ||
          paymentData.upi_transaction_id,
        signature: paymentData.razorpay_signature,
        planId: planDetails.id,
        gateway: selectedMethod,
        additionalData: paymentData,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Payment verification failed")
    }

    const result = await response.json()
    return result
  }

  const handlePayment = async () => {

    if (!validateForm()) return

    setIsProcessing(true)
    setPaymentStatus("processing")
    setVerificationStep("Initializing secure payment...")
    setPaymentError("")

    try {
      const order = await createPaymentOrder()
      const userDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }

      const onSuccess = async (response: any) => {
        try {
          setVerificationStep("Payment successful! Verifying with bank...")
          const verificationResult = await verifyPayment({ ...response, orderId: order.orderId })

          setPaymentStatus("success")
          setVerificationStep("Payment verified! Activating subscription...")

          toast({
            title: "Payment Successful!",
            description: "Your subscription has been activated successfully.",
          })

          setTimeout(() => router.push("/dashboard?payment=success"), 3000)
        } catch (error: any) {
          console.error("❌ Payment verification error:", error)
          setPaymentStatus("error")
          setVerificationStep("Payment verification failed")
          setPaymentError(error.message)
          toast({
            title: "Payment Verification Failed",
            description: error.message,
            variant: "destructive",
          })
        } finally {
          setIsProcessing(false)
        }
      }

      const onError = (error: any) => {
        console.error("❌ Payment error callback:", error)
        setIsProcessing(false)
        setPaymentStatus("error")
        setVerificationStep("Payment failed")
        setPaymentError(error.message || "Payment failed")
        toast({
          title: "Payment Failed",
          description: error.message || "Payment failed",
          variant: "destructive",
        })
        setTimeout(() => {
          setPaymentStatus("form")
          setVerificationStep("")
          setPaymentError("")
        }, 5000)
      }

      // Initialize payment based on selected method
      switch (selectedMethod) {
        case "razorpay":
          setVerificationStep("Loading Razorpay secure checkout...")
          const isRazorpayLoaded = await RazorpayService.loadScript()
          if (!isRazorpayLoaded) throw new Error("Failed to load Razorpay")
          setVerificationStep("Opening Razorpay payment gateway...")
          await RazorpayService.initializePayment(order, userDetails, onSuccess, onError)
          break

        case "stripe":
          setVerificationStep("Loading Stripe secure checkout...")
          const isStripeLoaded = await StripeService.loadScript()
          if (!isStripeLoaded) throw new Error("Failed to load Stripe")
          setVerificationStep("Redirecting to Stripe...")
          await StripeService.initializePayment(order, userDetails, onSuccess, onError)
          break

        case "paypal":
          setVerificationStep("Preparing PayPal checkout...")
          if (!paypalLoaded) {
            const loaded = await PayPalService.loadScript()
            if (!loaded) throw new Error("Failed to load PayPal")
            setPaypalLoaded(true)
          }
          setVerificationStep("PayPal ready - use button below")
          setTimeout(() => {
            PayPalService.initializePayment(order, userDetails, onSuccess, onError)
          }, 100)
          break

        case "upi":
          setVerificationStep("Opening UPI payment interface...")
          await UPIService.initializePayment(order, userDetails, formData.upiId, onSuccess, onError)
          break

        default:
          throw new Error("Unsupported payment method")
      }
    } catch (error: any) {
      console.error("❌ Payment initialization error:", error)
      setIsProcessing(false)
      setPaymentStatus("error")
      setVerificationStep("Payment initialization failed")
      setPaymentError(error.message)
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      })
      setTimeout(() => {
        setPaymentStatus("form")
        setVerificationStep("")
        setPaymentError("")
      }, 5000)
    }
  }

  // Success screen
  if (paymentStatus === "success") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950 dark:via-slate-900 dark:to-emerald-950 flex items-center justify-center"
        data-page-loaded="true"
      >
        <Card className="max-w-md mx-auto text-center shadow-2xl">
          <CardContent className="pt-6">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">Payment Successful!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Your <strong>{planDetails.name}</strong> subscription has been activated successfully.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Payment Verified & Secured
                </span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">{verificationStep}</p>
            </div>
            <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <p>✅ Payment processed securely</p>
              <p>✅ Subscription activated</p>
              <p>✅ Confirmation email sent</p>
            </div>
            <div className="mt-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">Redirecting to dashboard...</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error screen
  if (paymentStatus === "error") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-red-950 dark:via-slate-900 dark:to-red-950 flex items-center justify-center"
        data-page-loaded="true"
      >
        <Card className="max-w-md mx-auto text-center shadow-2xl">
          <CardContent className="pt-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">Payment Failed</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {verificationStep || "There was an issue processing your payment."}
            </p>
            {paymentError && (
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">Error Details</span>
                </div>
                <p className="text-xs text-red-600 dark:text-red-400">{paymentError}</p>
              </div>
            )}
            <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <p>❌ Payment could not be processed</p>
              <p>💡 Please try again or use a different payment method</p>
              <p>🔒 Your card details are secure and not stored</p>
            </div>
            <Button
              onClick={() => {
                setPaymentStatus("form")
                setVerificationStep("")
                setPaymentError("")
              }}
              className="w-full"
            >
              Try Again
            </Button>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
              Auto-redirecting to payment form in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      data-page-loaded="true"
    >
      <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <EnhancedLink href="/dashboard/subscription">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Subscription
              </Button>
            </EnhancedLink>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/50 rounded-xl">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Secure Payment</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Choose your preferred payment method with verified processing
              </p>
            </div>
          </div>
        </div>

        {/* Processing Status */}
        {(paymentStatus === "processing" || paymentStatus === "verifying") && (
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <span className="font-medium">{verificationStep || "Processing payment..."}</span>
              <br />
              <span className="text-sm">Please do not close this window or refresh the page.</span>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  Payment Method
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  All payments are processed securely with industry-standard verification and encryption
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon
                    const isSelected = selectedMethod === method.id
                    return (
                      <div key={method.id} className="flex items-center space-x-3">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label
                          htmlFor={method.id}
                          className={`flex items-start gap-4 flex-1 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/40 shadow-md"
                              : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 hover:shadow-sm"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg ${isSelected ? "bg-blue-100 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"}`}
                          >
                            <IconComponent
                              className={`h-5 w-5 ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-slate-900 dark:text-slate-100">{method.name}</span>
                              {method.popular && (
                                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{method.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {method.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              <strong>Supports:</strong> {method.currencies.join(", ")}
                            </p>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* UPI ID Input */}
            {selectedMethod === "upi" && (
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-orange-600" />
                    UPI Details
                  </CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Enter your UPI ID for instant bank-to-bank transfer
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Label htmlFor="upiId" className="text-sm font-medium">
                      UPI ID *
                    </Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      placeholder="yourname@paytm"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-base"
                    />
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">9876543210@paytm</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">user@googlepay</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">name@okaxis</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PayPal Container */}
            {selectedMethod === "paypal" && (
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    PayPal Payment
                  </CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Secure payment with PayPal buyer protection and instant verification
                  </p>
                </CardHeader>
                <CardContent>
                  {paypalLoaded ? (
                    <div>
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg mb-4">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          ✅ PayPal loaded successfully. Click the button below to complete your payment securely.
                        </p>
                      </div>
                      <div id="paypal-button-container" className="min-h-[60px]"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-blue-600" />
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Loading PayPal...</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Please wait while we set up secure payment
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Billing Information */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Billing Information
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Required for payment verification, invoice generation, and account security
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-base"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="h-12 text-base"
                  />
                </div>

                {/* Optional Address Fields */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Address Information (Optional)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm">
                        State
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="pincode" className="text-sm">
                      PIN Code
                    </Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="h-11 max-w-xs"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button - Hide for PayPal when processing */}
            {!(selectedMethod === "paypal" && paymentStatus === "processing") && (
              <Button
                onClick={handlePayment}
                disabled={isProcessing || (selectedMethod === "paypal" && !paypalLoaded)}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-3" />
                    {verificationStep || "Processing Payment..."}
                  </>
                ) : selectedMethod === "paypal" && !paypalLoaded ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-3" />
                    Loading PayPal...
                  </>
                ) : selectedMethod === "paypal" ? (
                  "Use PayPal Button Above"
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-3" />
                    Pay {currency === "USD" ? "$" : "₹"}
                    {total} Securely
                  </>
                )}
              </Button>
            )}

            {/* Security Notice */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Your payment is 100% secure
                  </p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• 256-bit SSL encryption protects your data</li>
                    <li>• We never store your card information</li>
                    <li>• PCI DSS compliant payment processing</li>
                    <li>• Real-time fraud detection and prevention</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6 border-2 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-950/50 rounded-xl">
                      <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{planDetails.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {planDetails.hits} • {planDetails.validity}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">Plan Features:</h4>
                    <ul className="space-y-2">
                      {planDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Plan Price</span>
                    <span>
                      {currency === "USD" ? "$" : "₹"}
                      {convertedPrice}
                    </span>
                  </div>
                  {gst > 0 && (
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>GST (18%)</span>
                      <span>₹{gst}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-slate-100">
                    <span>Total Amount</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {currency === "USD" ? "$" : "₹"}
                      {total}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Payment Method Info */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Payment Method</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {paymentMethods.find((m) => m.id === selectedMethod)?.name} -{" "}
                    {paymentMethods.find((m) => m.id === selectedMethod)?.description}
                  </p>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Your payment is secured with bank-grade encryption and verified through multiple security layers
                  </p>
                </div>

                {/* Money Back Guarantee */}
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">💯 30-Day Money Back Guarantee</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Not satisfied? Get a full refund within 30 days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
