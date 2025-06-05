import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const subscriptions = [
  {
    id: "SUB-123",
    plan: "Pro",
    date: "2025-06-01",
    amount: "₹500",
    status: "active",
  },
  {
    id: "SUB-122",
    plan: "Standard",
    date: "2025-05-01",
    amount: "₹200",
    status: "expired",
  },
  {
    id: "SUB-121",
    plan: "Basic",
    date: "2025-04-01",
    amount: "₹100",
    status: "expired",
  },
  {
    id: "SUB-120",
    plan: "Free Trial",
    date: "2025-03-15",
    amount: "₹0",
    status: "expired",
  },
]

export function SubscriptionHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plan</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => (
          <TableRow key={subscription.id}>
            <TableCell className="font-medium">{subscription.plan}</TableCell>
            <TableCell>{subscription.date}</TableCell>
            <TableCell>{subscription.amount}</TableCell>
            <TableCell>
              <Badge variant={subscription.status === "active" ? "default" : "secondary"}>{subscription.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
