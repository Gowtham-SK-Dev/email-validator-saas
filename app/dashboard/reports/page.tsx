"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  FileImage,
  Clock,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const reportTypes = [
  {
    id: "usage",
    name: "Usage Report",
    description: "Detailed API usage statistics and trends",
    icon: BarChart3,
    formats: ["PDF", "CSV", "Excel"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "verification",
    name: "Verification Report",
    description: "Email verification results and success rates",
    icon: CheckCircle,
    formats: ["PDF", "CSV"],
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "billing",
    name: "Billing Report",
    description: "Subscription and payment history",
    icon: FileText,
    formats: ["PDF"],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "performance",
    name: "Performance Report",
    description: "API response times and uptime statistics",
    icon: TrendingUp,
    formats: ["PDF", "CSV"],
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
]

const recentReports = [
  {
    id: 1,
    name: "Monthly Usage Report - May 2025",
    type: "Usage Report",
    format: "PDF",
    generated: "2025-06-01",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Verification Analysis - Q2 2025",
    type: "Verification Report",
    format: "Excel",
    generated: "2025-05-28",
    status: "completed",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Performance Metrics - May 2025",
    type: "Performance Report",
    format: "CSV",
    generated: "2025-05-25",
    status: "processing",
    size: "—",
  },
  {
    id: 4,
    name: "Billing Summary - Q1 2025",
    type: "Billing Report",
    format: "PDF",
    generated: "2025-04-01",
    status: "completed",
    size: "856 KB",
  },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const generateReport = (reportType: string) => {
    toast({
      title: "Report generation started",
      description: `Your ${reportType} is being generated. We'll notify you when it's ready.`,
    })
  }

  const downloadReport = (reportName: string) => {
    toast({
      title: "Download started",
      description: `${reportName} is being downloaded.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge>
      case "processing":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Processing</Badge>
      case "failed":
        return <Badge className="bg-red-50 text-red-700 border-red-200">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "csv":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
      default:
        return <FileImage className="h-4 w-4 text-slate-500" />
    }
  }

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
                <FileText className="h-8 w-8 text-blue-600" />
                Reports
              </h1>
              <p className="text-slate-600 mt-1">Generate and download detailed reports about your usage.</p>
            </div>
          </div>
        </motion.div>

        {/* Report Generation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Generate New Report</CardTitle>
              <CardDescription className="text-slate-600">
                Create custom reports for your data analysis needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Time Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 days</SelectItem>
                      <SelectItem value="last-year">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Report Types */}
        <div className="grid gap-6 md:grid-cols-2">
          {reportTypes.map((report, index) => {
            const IconComponent = report.icon
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-2xl ${report.bgColor}`}>
                            <IconComponent className={`h-6 w-6 ${report.color}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{report.name}</h3>
                            <p className="text-sm text-slate-600">{report.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">Available formats:</span>
                          <div className="flex gap-1">
                            {report.formats.map((format) => (
                              <Badge key={format} variant="outline" className="text-xs">
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => generateReport(report.name)}
                        className="gap-2 bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Recent Reports</CardTitle>
              <CardDescription className="text-slate-600">Your previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100">
                        {getFormatIcon(report.format)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">{report.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.generated}
                          </span>
                          <span>{report.type}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(report.status)}
                      {report.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadReport(report.name)}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      )}
                      {report.status === "processing" && (
                        <div className="flex items-center gap-2 text-sm text-amber-600">
                          <Clock className="h-4 w-4 animate-spin" />
                          Processing...
                        </div>
                      )}
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
