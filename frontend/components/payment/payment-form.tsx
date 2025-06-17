"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet, Loader2 } from "lucide-react"
import { PaymentService } from "@/lib/services/payment"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormProps {
  planDetails: {
    id: string
    name: string
    price: string
    features: string[]
  }
  onPaymentSuccess: (data: any) => void
  onPaymentError: (error: string) => void
}

const paymentMethods = [
  {
    id: "razorpay",
    name: "Razorpay (All Methods)",
    icon: CreditCard,
    description: "Card, UPI, Net Banking, Wallets",
    popular: true,
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, RuPay",
    popular: false,
  },
  {
    id: "upi",
    name: "UPI",
    icon: Wallet,
    description: "PhonePe, Google Pay, Paytm",
    popular: false,
  },
]

export default function PaymentForm({ planDetails, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const required = ["name", "email", "phone"]
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

    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      const amount = Number.parseInt(planDetails.price)

      if (selectedMethod === "razorpay") {
        // Load Razorpay script
        const isScriptLoaded = await PaymentService.loadRazorpayScript()
        if (!isScriptLoaded) {
          throw new Error("Failed to load payment gateway")
        }

        // Create order
        const order = await PaymentService.createOrder(planDetails.id, amount)

        // Initialize Razorpay payment
        PaymentService.initializeRazorpay(
          order,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          async (response: any) => {
            try {
              // Verify payment
              const verificationResult = await PaymentService.verifyPayment({
                orderId: order.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                planId: planDetails.id,
              })

              toast({
                title: "Payment Successful!",
                description: "Your subscription has been activated.",
              })

              onPaymentSuccess(verificationResult)
            } catch (error) {
              console.error("Payment verification failed:", error)
              onPaymentError("Payment verification failed")
            } finally {
              setIsProcessing(false)
            }
          },
          (error: any) => {
            console.error("Payment failed:", error)
            onPaymentError(error.message || "Payment failed")
            setIsProcessing(false)
          },
        )
      } else {
        // Handle other payment methods
        toast({
          title: "Coming Soon",
          description: "This payment method will be available soon",
          variant: "destructive",
        })
        setIsProcessing(false)
      }
    } catch (error: any) {
      console.error("Payment initiation failed:", error)
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      })
      onPaymentError(error.message || "Payment failed")
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <div key={method.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label
                    htmlFor={method.id}
                    className={`flex items-center gap-3 flex-1 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      selectedMethod === method.id
                        ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <IconComponent className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{method.name}</span>
                        {method.popular && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Recommended</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{method.description}</p>
                    </div>
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Required for payment processing and invoice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Street address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Mumbai" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                placeholder="Maharashtra"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">PIN Code</Label>
              <Input
                id="pincode"
                name="pincode"
                placeholder="400001"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay ₹${planDetails.price} Securely`
        )}
      </Button>
    </div>
  )
}
