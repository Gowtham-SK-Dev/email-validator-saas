"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, Phone, Mail, Clock, Search, Send, BookOpen, Video, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Pre-defined data to avoid re-computation
const supportTickets = [
  {
    id: "TICK-001",
    subject: "API rate limit exceeded",
    status: "open",
    priority: "high",
    created: "2025-06-08",
    lastUpdate: "2 hours ago",
    category: "Technical",
  },
  {
    id: "TICK-002",
    subject: "Billing inquiry for May 2025",
    status: "resolved",
    priority: "medium",
    created: "2025-06-05",
    lastUpdate: "1 day ago",
    category: "Billing",
  },
  {
    id: "TICK-003",
    subject: "Integration documentation request",
    status: "in-progress",
    priority: "low",
    created: "2025-06-03",
    lastUpdate: "3 days ago",
    category: "Documentation",
  },
]

const faqItems = [
  {
    question: "How do I increase my API rate limit?",
    answer:
      "You can increase your rate limit by upgrading to a higher tier plan or contacting our support team for custom limits.",
    category: "API",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, UPI, net banking, and bank transfers for enterprise customers.",
    category: "Billing",
  },
  {
    question: "How accurate is the email verification?",
    answer:
      "Our email verification service has a 99.2% accuracy rate with real-time validation and comprehensive checks.",
    category: "Service",
  },
  {
    question: "Can I get a refund for unused API calls?",
    answer:
      "Unused API calls don't roll over to the next billing cycle, but we offer pro-rated refunds for plan downgrades.",
    category: "Billing",
  },
]

const supportChannels = [
  {
    name: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageSquare,
    availability: "24/7",
    responseTime: "< 2 minutes",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-900/30",
    darkColor: "dark:text-blue-400",
  },
  {
    name: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    availability: "24/7",
    responseTime: "< 4 hours",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-900/30",
    darkColor: "dark:text-emerald-400",
  },
  {
    name: "Phone Support",
    description: "Speak directly with our experts",
    icon: Phone,
    availability: "Mon-Fri 9AM-6PM",
    responseTime: "Immediate",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    darkBgColor: "dark:bg-purple-900/30",
    darkColor: "dark:text-purple-400",
  },
]

// Extracted components for better performance
function SupportChannel({ channel }) {
  return (
    <div className="p-6 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 transition-colors duration-200 cursor-pointer group">
      <div className="space-y-4">
        <div className={`p-3 rounded-lg ${channel.bgColor} ${channel.darkBgColor} w-fit`}>
          <channel.icon className={`h-6 w-6 ${channel.color} ${channel.darkColor}`} />
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {channel.name}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{channel.description}</p>
          <div className="space-y-1 mt-3 text-xs text-slate-500 dark:text-slate-400">
            <p>Available: {channel.availability}</p>
            <p>Response: {channel.responseTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SupportTicketItem({ ticket }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/60">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/60">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/60">
            Resolved
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="dark:bg-slate-800 dark:text-slate-300">
            Unknown
          </Badge>
        )
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/60">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/60">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            Low
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="dark:bg-slate-800 dark:text-slate-300">
            Unknown
          </Badge>
        )
    }
  }

  return (
    <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 transition-colors duration-200">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-slate-900 dark:text-white truncate">{ticket.subject}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">#{ticket.id}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(ticket.status)}
            {getPriorityBadge(ticket.priority)}
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Created: {ticket.created}
          </span>
          <span>Updated: {ticket.lastUpdate}</span>
          <span>Category: {ticket.category}</span>
        </div>
      </div>
    </div>
  )
}

function FAQItem({ faq }) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 transition-colors duration-200">
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-blue-50 dark:bg-blue-900/30 rounded">
            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-slate-900 dark:text-white">{faq.question}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{faq.answer}</p>
            <Badge variant="outline" className="text-xs mt-2 dark:border-slate-700 dark:text-slate-300">
              {faq.category}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SupportPage() {
  const { toast } = useToast()
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmitTicket = (e) => {
    e.preventDefault()
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
      description: "Your ticket has been submitted. We'll get back to you soon!",
    })

    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: "",
    })
  }

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                Support Center
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">Get help and find answers to your questions.</p>
            </div>
          </div>
        </div>

        {/* Support Channels */}
        <div>
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Contact Support</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Choose the best way to reach our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {supportChannels.map((channel) => (
                  <SupportChannel key={channel.name} channel={channel} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Support Ticket */}
          <div>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                  Create Support Ticket
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Submit a detailed support request
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="category" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Category *
                      </Label>
                      <Select
                        value={ticketForm.category}
                        onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}
                      >
                        <SelectTrigger className="mt-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                          <SelectItem value="technical" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            Technical
                          </SelectItem>
                          <SelectItem value="billing" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            Billing
                          </SelectItem>
                          <SelectItem value="account" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            Account
                          </SelectItem>
                          <SelectItem value="documentation" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            Documentation
                          </SelectItem>
                          <SelectItem value="other" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Priority
                      </Label>
                      <Select
                        value={ticketForm.priority}
                        onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                      >
                        <SelectTrigger className="mt-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                          <SelectItem value="low" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            Low
                          </SelectItem>
                          <SelectItem value="medium" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            Medium
                          </SelectItem>
                          <SelectItem value="high" className="dark:text-slate-200 dark:focus:bg-slate-800">
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about your issue..."
                      rows={4}
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* My Support Tickets */}
          <div>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                  My Support Tickets
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Track your support requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <SupportTicketItem key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    Find quick answers to common questions
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFAQ.map((faq, index) => (
                  <FAQItem key={index} faq={faq} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Resources */}
        <div>
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-900/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Additional Resources</h3>
                <p className="text-slate-600 dark:text-slate-300">Explore our comprehensive help resources</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <BookOpen className="h-4 w-4" />
                    Documentation
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Video className="h-4 w-4" />
                    Video Tutorials
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <FileText className="h-4 w-4" />
                    API Reference
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
