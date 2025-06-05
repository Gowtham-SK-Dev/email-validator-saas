"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, Phone, Mail, Clock, FileText, Search, ExternalLink, Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const supportTickets = [
  {
    id: "TICK-001",
    subject: "API rate limit exceeded",
    status: "open",
    priority: "high",
    created: "2025-06-03",
    lastUpdate: "2 hours ago",
    category: "Technical",
  },
  {
    id: "TICK-002",
    subject: "Billing inquiry for May",
    status: "resolved",
    priority: "medium",
    created: "2025-05-28",
    lastUpdate: "3 days ago",
    category: "Billing",
  },
  {
    id: "TICK-003",
    subject: "Integration documentation request",
    status: "in-progress",
    priority: "low",
    created: "2025-05-25",
    lastUpdate: "1 week ago",
    category: "Documentation",
  },
]

const faqItems = [
  {
    question: "How do I get started with the API?",
    answer: "You can start by generating an API key in your dashboard and following our quick start guide.",
    category: "Getting Started",
  },
  {
    question: "What are the rate limits?",
    answer: "Rate limits depend on your subscription plan. Pro plans include 3,500 requests per month.",
    category: "Technical",
  },
  {
    question: "How is billing calculated?",
    answer: "Billing is based on your subscription plan and actual API usage. You're only charged for verified emails.",
    category: "Billing",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time from the subscription page in your dashboard.",
    category: "Account",
  },
]

export default function SupportPage() {
  const { toast } = useToast()
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setTicketForm((prev) => ({ ...prev, [field]: value }))
  }

  const submitTicket = () => {
    if (!ticketForm.subject || !ticketForm.category || !ticketForm.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Support ticket created",
      description: "We've received your ticket and will respond within 24 hours.",
    })

    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>
      case "in-progress":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Resolved</Badge>
      case "closed":
        return <Badge className="bg-slate-50 text-slate-700 border-slate-200">Closed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-50 text-red-700 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Low</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                <HelpCircle className="h-8 w-8 text-blue-600" />
                Support Center
              </h1>
              <p className="text-slate-600 mt-1">Get help and find answers to your questions.</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Options */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-2xl w-fit mx-auto">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Live Chat</h3>
                    <p className="text-sm text-slate-600">Get instant help from our support team</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Chat</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl w-fit mx-auto">
                    <Mail className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Email Support</h3>
                    <p className="text-sm text-slate-600">Send us an email and we'll respond within 24h</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    support@emailverify.com
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-2xl w-fit mx-auto">
                    <Phone className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Phone Support</h3>
                    <p className="text-sm text-slate-600">Call us during business hours</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    +91 1234567890
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Support Ticket */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Create Support Ticket</CardTitle>
                <CardDescription className="text-slate-600">
                  Describe your issue and we'll help you resolve it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-slate-700">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Category *</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="account">Account</SelectItem>
                        <SelectItem value="documentation">Documentation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Priority</Label>
                    <Select value={ticketForm.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    value={ticketForm.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={6}
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 resize-none"
                  />
                </div>

                <Button onClick={submitTicket} className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-slate-600">Find quick answers to common questions</CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {filteredFAQ.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 bg-slate-50 rounded-xl"
                  >
                    <h4 className="font-medium text-slate-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-slate-600 mb-2">{faq.answer}</p>
                    <Badge variant="outline" className="text-xs">
                      {faq.category}
                    </Badge>
                  </motion.div>
                ))}
                {filteredFAQ.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No FAQ items found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Support Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Your Support Tickets</CardTitle>
              <CardDescription className="text-slate-600">Track the status of your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 border border-slate-200"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100">
                        <FileText className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-900">{ticket.subject}</h4>
                          <Badge variant="outline" className="text-xs">
                            {ticket.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {ticket.lastUpdate}
                          </span>
                          <span>{ticket.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getPriorityBadge(ticket.priority)}
                      {getStatusBadge(ticket.status)}
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
