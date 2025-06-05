"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, Clock, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    email: "user@example.com",
    status: "verified",
    time: "2 minutes ago",
    type: "verification",
  },
  {
    id: 2,
    email: "test@domain.com",
    status: "invalid",
    time: "5 minutes ago",
    type: "verification",
  },
  {
    id: 3,
    email: "contact@business.org",
    status: "verified",
    time: "12 minutes ago",
    type: "verification",
  },
  {
    id: 4,
    email: "info@startup.io",
    status: "pending",
    time: "18 minutes ago",
    type: "verification",
  },
  {
    id: 5,
    email: "admin@company.net",
    status: "verified",
    time: "25 minutes ago",
    type: "verification",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-4 w-4 text-emerald-600" />
    case "invalid":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-amber-500" />
    default:
      return <Mail className="h-4 w-4 text-slate-400" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">Verified</Badge>
    case "invalid":
      return <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">Invalid</Badge>
    case "pending":
      return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">Pending</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
              {getStatusIcon(activity.status)}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 truncate max-w-[150px]">{activity.email}</p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">{getStatusBadge(activity.status)}</div>
        </motion.div>
      ))}
    </div>
  )
}
