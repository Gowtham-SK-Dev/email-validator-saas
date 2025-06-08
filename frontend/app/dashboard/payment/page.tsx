"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet, Shield, CheckCircle, ArrowLeft, Lock, User, Building } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, RuPay",
    popular: true,
  },
  {
    id: "upi",
    name: "UPI",
    icon: Wallet,
    description: "PhonePe, Google Pay, Paytm",
    popular: false,
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: Building,
    description: "All major banks supported",
    popular: false,
  },
]

const defaultPlan = {
  name: "Pro Plan",
  price: "500",
  hits: "3,500 hits",
  validity: "One-time",
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
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [planDetails, setPlanDetails] = useState(defaultPlan)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  // Calculate pricing
  const basePrice = Number.parseInt(planDetails.price, 10) || 500
  const gst = Math.round(basePrice * 0.18)
  const total = basePrice + gst

  useEffect(() => {
    const plan = searchParams.get("plan")
    const price = searchParams.get("price")
    const name = searchParams.get("name")
    const calls = searchParams.get("calls")

    if (plan && price && name) {
      setPlanDetails({
        name: name,
        price: price,
        hits: calls || defaultPlan.hits,
        validity: "monthly",
        features: defaultPlan.features,
      })
    }
  }, []) // Empty dependency array to run only once

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = () => {
    console.log("Processing payment with:", { selectedMethod, formData, planDetails })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-4">
            <Link href="/dashboard/subscription">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Subscription
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Complete Payment</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Secure payment processing for your subscription</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Payment Methods */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Payment Method
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Choose your preferred payment method
                </CardDescription>
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
                                <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800">
                                  Popular
                                </Badge>
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

            {/* Card Details */}
            {selectedMethod === "card" && (
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Card Details
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Enter your card information securely
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Cardholder Name
                    </Label>
                    <Input
                      id="cardholderName"
                      name="cardholderName"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* UPI Details */}
            {selectedMethod === "upi" && (
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    UPI Payment
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Enter your UPI ID or scan QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upiId" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      UPI ID
                    </Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      placeholder="yourname@paytm"
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Or scan QR code with your UPI app</p>
                    <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-slate-500 dark:text-slate-400 text-xs">QR Code</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Net Banking Details */}
            {selectedMethod === "netbanking" && (
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Net Banking
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Select your bank for net banking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Select Bank
                    </Label>
                    <select className="w-full h-12 px-3 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Billing Information */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Billing Information
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Required for invoice generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="Maharashtra"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      PIN Code
                    </Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="h-12 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 dark:border-slate-800 sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{planDetails.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {planDetails.hits} • {planDetails.validity}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Includes:</h4>
                    <ul className="space-y-1">
                      {planDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <CheckCircle className="h-3 w-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator className="dark:bg-slate-800" />

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Plan Price</span>
                    <span>₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>GST (18%)</span>
                    <span>₹{gst}</span>
                  </div>
                  <Separator className="dark:bg-slate-800" />
                  <div className="flex justify-between text-lg font-semibold text-slate-900 dark:text-slate-100">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Separator className="dark:bg-slate-800" />

                {/* Security Notice */}
                <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                  <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Pay ₹{total} Securely
                </Button>

                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
