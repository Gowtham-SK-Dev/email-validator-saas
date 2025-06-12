"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Key, Plus, Copy, Eye, EyeOff, Trash2, Calendar, Activity, Shield } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const apiKeys = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
    requests: 15420,
    status: "active",
    permissions: ["read", "write"],
  },
  {
    id: "2",
    name: "Development API Key",
    key: "sk-dev-xyz789abc123def456ghi789jkl012mno345pqr678stu901",
    created: "2024-02-01",
    lastUsed: "1 day ago",
    requests: 3240,
    status: "active",
    permissions: ["read"],
  },
  {
    id: "3",
    name: "Testing API Key",
    key: "sk-test-mno345pqr678stu901vwx234yz567abc123def456ghi789",
    created: "2024-02-10",
    lastUsed: "5 days ago",
    requests: 890,
    status: "inactive",
    permissions: ["read"],
  },
]

export default function ApiKeysPage() {
  const { toast } = useToast()
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [newKeyForm, setNewKeyForm] = useState({
    name: "",
    permissions: "read",
    description: "",
  })

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleKeys(newVisible)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard.",
    })
  }

  const createApiKey = () => {
    if (!newKeyForm.name) {
      toast({
        title: "Name required",
        description: "Please enter a name for your API key.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "API key created",
      description: `${newKeyForm.name} has been created successfully.`,
    })

    setNewKeyForm({
      name: "",
      permissions: "read",
      description: "",
    })
  }

  const deleteApiKey = (keyName: string) => {
    toast({
      title: "API key deleted",
      description: `${keyName} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/60">
        Active
      </Badge>
    ) : (
      <Badge className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
        Inactive
      </Badge>
    )
  }

  const maskApiKey = (key: string) => {
    return key.substring(0, 12) + "..." + key.substring(key.length - 8)
  }

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden">
      {/* Page-specific animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl"
          animate={{
            x: [0, 30, -10, 20, 0],
            y: [0, -40, 10, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-[60%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl"
          animate={{
            x: [0, -20, 10, -30, 0],
            y: [0, 30, -20, 10, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-cyan-400/20 dark:bg-cyan-600/10 blur-3xl"
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -20, 40, -10, 0],
            scale: [1, 1.05, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <Key className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                API Keys
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Manage your API keys for secure access to our services.
              </p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white w-fit">
              <Plus className="h-4 w-4" />
              Create New Key
            </Button>
          </div>
        </motion.div>

        {/* Create New API Key */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Create New API Key</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Generate a new API key for your applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="keyName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Key Name *
                  </Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Production API Key"
                    value={newKeyForm.name}
                    onChange={(e) => setNewKeyForm({ ...newKeyForm, name: e.target.value })}
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permissions" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Permissions
                  </Label>
                  <Select
                    value={newKeyForm.permissions}
                    onValueChange={(value) => setNewKeyForm({ ...newKeyForm, permissions: value })}
                  >
                    <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                      <SelectItem value="read" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Read Only
                      </SelectItem>
                      <SelectItem value="write" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Read & Write
                      </SelectItem>
                      <SelectItem value="admin" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Full Access
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Description (Optional)
                </Label>
                <Input
                  id="description"
                  placeholder="Brief description of this API key's purpose"
                  value={newKeyForm.description}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, description: e.target.value })}
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
              </div>
              <Button
                onClick={createApiKey}
                className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Create API Key
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Existing API Keys */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Your API Keys</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Manage and monitor your existing API keys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey, index) => (
                  <motion.div
                    key={apiKey.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 transition-colors duration-200"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{apiKey.name}</h3>
                            {getStatusBadge(apiKey.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Created: {apiKey.created}
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              Last used: {apiKey.lastUsed}
                            </span>
                            <span>{apiKey.requests.toLocaleString()} requests</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            {visibleKeys.has(apiKey.id) ? (
                              <>
                                <EyeOff className="h-3 w-3" />
                                Hide
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3" />
                                Show
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                            className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/40 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="dark:bg-slate-900 dark:border-slate-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="dark:text-white">Delete API Key</AlertDialogTitle>
                                <AlertDialogDescription className="dark:text-slate-300">
                                  Are you sure you want to delete "{apiKey.name}"? This action cannot be undone and will
                                  immediately revoke access for any applications using this key.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteApiKey(apiKey.name)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                              {visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                            </code>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-300">
                              Permissions: {apiKey.permissions.join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
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
