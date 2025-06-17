"use client"

import { useState } from "react"
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
import { useToast } from "@/hooks/use-toast"

// Pre-defined data to avoid re-computation
const reportTypes = [
  {
    id: "usage",
    name: "Usage Report",
    description: "Detailed API usage statistics and trends",
    icon: BarChart3,
    formats: ["PDF", "CSV", "Excel"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-900/30",
    darkColor: "dark:text-blue-400",
  },
  {
    id: "verification",
    name: "Verification Report",
    description: "Email verification results and success rates",
    icon: CheckCircle,
    formats: ["PDF", "CSV"],
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-900/30",
    darkColor: "dark:text-emerald-400",
  },
  {
    id: "billing",
    name: "Billing Report",
    description: "Subscription and payment history",
    icon: FileText,
    formats: ["PDF"],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    darkBgColor: "dark:bg-purple-900/30",
    darkColor: "dark:text-purple-400",
  },
  {
    id: "performance",
    name: "Performance Report",
    description: "API response times and uptime statistics",
    icon: TrendingUp,
    formats: ["PDF", "CSV"],
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-900/30",
    darkColor: "dark:text-amber-400",
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

// Extracted components for better performance
function ReportTypeCard({ report, onClick }) {
  return (
    <div
      className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 transition-colors duration-200 cursor-pointer group"
      onClick={() => onClick(report.name)}
    >
      <div className="space-y-3">
        <div className={`p-3 rounded-lg ${report.bgColor} ${report.darkBgColor} w-fit`}>
          <report.icon className={`h-6 w-6 ${report.color} ${report.darkColor}`} />
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {report.name}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{report.description}</p>
          <div className="flex gap-1 mt-2">
            {report.formats.map((format) => (
              <Badge key={format} variant="outline" className="text-xs dark:border-slate-700 dark:text-slate-300">
                {format}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RecentReportItem({ report, onDownload }) {
  const getFormatIcon = (format) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500 dark:text-red-400" />
      case "csv":
        return <FileSpreadsheet className="h-4 w-4 text-green-500 dark:text-green-400" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
      default:
        return <FileImage className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/60">
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/60">
            Processing
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/60">
            Failed
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
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800">
          {getFormatIcon(report.format)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 dark:text-white truncate">{report.name}</h4>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {report.generated}
            </span>
            <span>{report.size}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {report.type}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getStatusBadge(report.status)}
        {report.status === "completed" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload(report.name)}
            className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        )}
      </div>
    </div>
  )
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const generateReport = (reportType) => {
    toast({
      title: "Report generation started",
      description: `Your ${reportType} is being generated. We'll notify you when it's ready.`,
    })
  }

  const downloadReport = (reportName) => {
    toast({
      title: "Download started",
      description: `${reportName} is being downloaded.`,
    })
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl" />
        <div className="absolute top-[60%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                Reports
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Generate and download detailed reports about your usage.
              </p>
            </div>
          </div>
        </div>

        {/* Report Generation */}
        <div>
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Generate New Report
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Create custom reports for your data analysis needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2 block">
                    Time Period
                  </label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                      <SelectItem value="last-7-days" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Last 7 days
                      </SelectItem>
                      <SelectItem value="last-30-days" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Last 30 days
                      </SelectItem>
                      <SelectItem value="last-90-days" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Last 90 days
                      </SelectItem>
                      <SelectItem value="this-year" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        This year
                      </SelectItem>
                      <SelectItem value="custom" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Custom range
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2 block">Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                      <SelectItem value="pdf" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        PDF
                      </SelectItem>
                      <SelectItem value="csv" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        CSV
                      </SelectItem>
                      <SelectItem value="excel" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Excel
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {reportTypes.map((report) => (
                  <ReportTypeCard key={report.id} report={report} onClick={generateReport} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <div>
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Recent Reports</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <RecentReportItem key={report.id} report={report} onDownload={downloadReport} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
