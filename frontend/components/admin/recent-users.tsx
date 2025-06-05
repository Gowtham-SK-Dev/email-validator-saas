import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    date: "2025-06-04",
    plan: "Pro",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    date: "2025-06-03",
    plan: "Standard",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    date: "2025-06-02",
    plan: "Basic",
  },
]

export function RecentUsers() {
  return (
    <div className="space-y-4">
      {recentUsers.map((user) => (
        <div key={user.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium text-sm">{user.plan}</div>
        </div>
      ))}
    </div>
  )
}
