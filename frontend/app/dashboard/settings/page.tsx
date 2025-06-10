"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import {
  Settings,
  Globe,
  Shield,
  Database,
  Trash2,
  Download,
  RefreshCw,
  Moon,
  Sun,
  Monitor,
  Save,
  AlertTriangle,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const generalSettings = {
  language: "en",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  theme: "system",
  autoSave: true,
  compactMode: false,
}

const apiSettings = {
  defaultTimeout: "30",
  retryAttempts: "3",
  rateLimitWarning: true,
  debugMode: false,
  logRequests: true,
  cacheResponses: true,
}

const securitySettings = {
  sessionTimeout: "24",
  ipWhitelist: "",
  webhookSecret: "wh_secret_key_example",
  apiKeyRotation: "90",
  loginNotifications: true,
  suspiciousActivityAlerts: true,
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [general, setGeneral] = useState(generalSettings)
  const [api, setApi] = useState(apiSettings)
  const [security, setSecurity] = useState(securitySettings)

  const handleSaveGeneral = () => {
    toast({
      title: "General settings saved",
      description: "Your general preferences have been updated successfully.",
    })
  }

  const handleSaveApi = () => {
    toast({
      title: "API settings saved",
      description: "Your API configuration has been updated successfully.",
    })
  }

  const handleSaveSecurity = () => {
    toast({
      title: "Security settings saved",
      description: "Your security preferences have been updated successfully.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "Your account data is being prepared for download.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "We'll send you an email with further instructions.",
      variant: "destructive",
    })
  }

  const handleClearCache = () => {
    toast({
      title: "Cache cleared",
      description: "All cached data has been successfully cleared.",
    })
  }

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
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

      <div className="relative max-w-4xl mx-auto space-y-8 p-6 lg:p-8">
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
                <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                Settings
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Manage your application preferences and configurations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                General Settings
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Configure your general application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="language" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Language
                  </Label>
                  <Select
                    value={general.language}
                    onValueChange={(value) => setGeneral({ ...general, language: value })}
                  >
                    <SelectTrigger className="mt-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                      <SelectItem value="en" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        English
                      </SelectItem>
                      <SelectItem value="hi" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        हिंदी
                      </SelectItem>
                      <SelectItem value="es" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Español
                      </SelectItem>
                      <SelectItem value="fr" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Français
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Timezone
                  </Label>
                  <Select
                    value={general.timezone}
                    onValueChange={(value) => setGeneral({ ...general, timezone: value })}
                  >
                    <SelectTrigger className="mt-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                      <SelectItem value="Asia/Kolkata" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Asia/Kolkata
                      </SelectItem>
                      <SelectItem value="America/New_York" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        America/New_York
                      </SelectItem>
                      <SelectItem value="Europe/London" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Europe/London
                      </SelectItem>
                      <SelectItem value="Asia/Tokyo" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        Asia/Tokyo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateFormat" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Date Format
                  </Label>
                  <Select
                    value={general.dateFormat}
                    onValueChange={(value) => setGeneral({ ...general, dateFormat: value })}
                  >
                    <SelectTrigger className="mt-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                      <SelectItem value="DD/MM/YYYY" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        DD/MM/YYYY
                      </SelectItem>
                      <SelectItem value="MM/DD/YYYY" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        MM/DD/YYYY
                      </SelectItem>
                      <SelectItem value="YYYY-MM-DD" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        YYYY-MM-DD
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="theme" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Theme
                  </Label>
                  <Select value={general.theme} onValueChange={(value) => setGeneral({ ...general, theme: value })}>
                    <SelectTrigger className="mt-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                      <SelectItem value="light" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system" className="dark:text-slate-200 dark:focus:bg-slate-800">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Auto Save</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Automatically save changes as you type</p>
                  </div>
                  <Switch
                    checked={general.autoSave}
                    onCheckedChange={(checked) => setGeneral({ ...general, autoSave: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Compact Mode</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Use a more compact interface layout</p>
                  </div>
                  <Switch
                    checked={general.compactMode}
                    onCheckedChange={(checked) => setGeneral({ ...general, compactMode: checked })}
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveGeneral}
                className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                API Configuration
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Configure API behavior and performance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="timeout" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Default Timeout (seconds)
                  </Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={api.defaultTimeout}
                    onChange={(e) => setApi({ ...api, defaultTimeout: e.target.value })}
                    className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="retryAttempts" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Retry Attempts
                  </Label>
                  <Input
                    id="retryAttempts"
                    type="number"
                    value={api.retryAttempts}
                    onChange={(e) => setApi({ ...api, retryAttempts: e.target.value })}
                    className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Rate Limit Warning</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Show warnings when approaching rate limits
                    </p>
                  </div>
                  <Switch
                    checked={api.rateLimitWarning}
                    onCheckedChange={(checked) => setApi({ ...api, rateLimitWarning: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Debug Mode</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Enable detailed API debugging information
                    </p>
                  </div>
                  <Switch
                    checked={api.debugMode}
                    onCheckedChange={(checked) => setApi({ ...api, debugMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Log Requests</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Keep logs of all API requests</p>
                  </div>
                  <Switch
                    checked={api.logRequests}
                    onCheckedChange={(checked) => setApi({ ...api, logRequests: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Cache Responses</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Cache API responses for better performance
                    </p>
                  </div>
                  <Switch
                    checked={api.cacheResponses}
                    onCheckedChange={(checked) => setApi({ ...api, cacheResponses: checked })}
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveApi}
                className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Configure security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="sessionTimeout" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Session Timeout (hours)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                    className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="apiKeyRotation" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    API Key Rotation (days)
                  </Label>
                  <Input
                    id="apiKeyRotation"
                    type="number"
                    value={security.apiKeyRotation}
                    onChange={(e) => setSecurity({ ...security, apiKeyRotation: e.target.value })}
                    className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ipWhitelist" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  IP Whitelist (comma-separated)
                </Label>
                <Input
                  id="ipWhitelist"
                  placeholder="192.168.1.1, 10.0.0.1"
                  value={security.ipWhitelist}
                  onChange={(e) => setSecurity({ ...security, ipWhitelist: e.target.value })}
                  className="mt-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="webhookSecret" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Webhook Secret Key
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="webhookSecret"
                    type="password"
                    value={security.webhookSecret}
                    onChange={(e) => setSecurity({ ...security, webhookSecret: e.target.value })}
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Login Notifications</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => setSecurity({ ...security, loginNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Suspicious Activity Alerts</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Get alerts for unusual account activity
                    </p>
                  </div>
                  <Switch
                    checked={security.suspiciousActivityAlerts}
                    onCheckedChange={(checked) => setSecurity({ ...security, suspiciousActivityAlerts: checked })}
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveSecurity}
                className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Data Management
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Manage your account data and storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Export Account Data
                </Button>

                <Button
                  onClick={handleClearCache}
                  variant="outline"
                  className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <RefreshCw className="h-4 w-4" />
                  Clear Cache
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:border-red-800/40 dark:bg-red-900/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="font-medium text-red-900 dark:text-red-300">Danger Zone</h4>
                      <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                        These actions are irreversible. Please proceed with caution.
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:bg-slate-900 dark:border-slate-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="dark:text-white">Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription className="dark:text-slate-300">
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
