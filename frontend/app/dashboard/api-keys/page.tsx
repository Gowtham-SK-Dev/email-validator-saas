"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  RotateCcw,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "sk_live_51HG4rDKs9Xj8qM6O3gJ5v2vM",
    created: "2024-03-15",
    lastUsed: "2 hours ago",
    status: "active",
    permissions: ["read", "write"],
  },
  {
    id: 2,
    name: "Development API Key",
    key: "sk_test_51HG4rDKs9Xj8qM6O3gJ5v2vM",
    created: "2024-03-10",
    lastUsed: "1 day ago",
    status: "active",
    permissions: ["read"],
  },
  {
    id: 3,
    name: "Staging API Key",
    key: "sk_test_51HG4rDKs9Xj8qM6O3gJ5v2vM",
    created: "2024-02-28",
    lastUsed: "Never",
    status: "inactive",
    permissions: ["read", "write"],
  },
]

export default function ApiKeysPage() {
  const { toast } = useToast()
  const [visibleKeys, setVisibleKeys] = useState<number[]>([])
  const [newKeyName, setNewKeyName] = useState("")

  const toggleKeyVisibility = (keyId: number) => {
    setVisibleKeys((prev) => (prev.includes(keyId) ? prev.filter((id) => id !== keyId) : [...prev, keyId]))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard.",
    })
  }

  const regenerateKey = (keyName: string) => {
    toast({
      title: "API key regenerated",
      description: `${keyName} has been regenerated successfully.`,
    })
  }

  const deleteKey = (keyName: string) => {
    toast({
      title: "API key deleted",
      description: `${keyName} has been deleted permanently.`,
      variant: "destructive",
    })
  }

  const createNewKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your API key.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "API key created",
      description: `${newKeyName} has been created successfully.`,
    })
    setNewKeyName("")
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Animated background circles */}
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
          </div>
        </motion.div>

        {/* Create New Key */}
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
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="keyName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Key Name
                  </Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Production API Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={createNewKey}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Create Key
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((apiKey, index) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{apiKey.name}</h3>
                        <Badge
                          variant={apiKey.status === "active" ? "default" : "secondary"}
                          className={
                            apiKey.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/60"
                              : "dark:bg-slate-800 dark:text-slate-300"
                          }
                        >
                          {apiKey.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm dark:text-slate-300">
                          {visibleKeys.includes(apiKey.id) ? apiKey.key : "•".repeat(apiKey.key.length)}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          {visibleKeys.includes(apiKey.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400">Created</p>
                          <p className="font-medium text-slate-900 dark:text-white flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {apiKey.created}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400">Last Used</p>
                          <p className="font-medium text-slate-900 dark:text-white">{apiKey.lastUsed}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400">Permissions</p>
                          <div className="flex gap-1">
                            {apiKey.permissions.map((permission) => (
                              <Badge
                                key={permission}
                                variant="outline"
                                className="text-xs dark:border-slate-700 dark:text-slate-300"
                              >
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400">Status</p>
                          <p className="font-medium text-slate-900 dark:text-white flex items-center gap-1">
                            {apiKey.status === "active" ? (
                              <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                            )}
                            {apiKey.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => regenerateKey(apiKey.name)}
                        className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteKey(apiKey.name)}
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 dark:border-slate-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-0 shadow-sm bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/40">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Security Best Practices</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Keep your API keys secure and never share them publicly</li>
                    <li>• Regenerate keys regularly for enhanced security</li>
                    <li>• Use different keys for different environments (dev, staging, production)</li>
                    <li>• Monitor API key usage and revoke unused keys</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
