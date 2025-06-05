"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    mobile: "+91 9876543210",
    plan: "Pro",
    status: "active",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    mobile: "+91 9876543211",
    plan: "Standard",
    status: "active",
  },
  {
    id: 3,
    username: "bob_johnson",
    email: "bob@example.com",
    mobile: "+91 9876543212",
    plan: "Basic",
    status: "inactive",
  },
]

export function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState(mockUsers)

  const handleSearch = () => {
    const filtered = mockUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm),
    )
    setSearchResults(filtered)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search by username, email, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchResults.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>{user.plan}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View/Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
