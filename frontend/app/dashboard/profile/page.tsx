"use client"

import type React from "react"
import { Suspense, lazy, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Key, Bell, Save, Edit3, Download, Share2, Loader2, AlertCircle } from "lucide-react"
import { ProfileService, type UserProfile } from "@/lib/api/profile"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Lazy load heavy components
const MotionDiv = lazy(() => import("framer-motion").then((mod) => ({ default: mod.motion.div })))
const VercelTicketCard = lazy(() => import("@/components/vercel-ticket-card"))

// Loading component for suspense
const ComponentLoader = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
  </div>
)

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile_number: "",
    firstName: "",
    lastName: "",
    company: "",
    location: "",
    bio: "",
    subscription: "",
  })

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await ProfileService.getProfile()
      console.log(response)
      if (response.success && response.data) {
        setProfile(response.data)

        // Split username into first and last name if possible
        const nameParts = response.data.username.split(" ")
        const firstName = nameParts[0] || response.data.username
        const lastName = nameParts.slice(1).join(" ") || ""

        setFormData({
          username: response.data.username,
          email: response.data.email,
          mobile_number: response.data.mobile_number,
          firstName,
          lastName,
          company: response.data.company?response.data.company: "We're thrilled to hear your company name!", 
          location: response.data.state?(response.data.country?(response.data.state + " , "+ response.data.country):response.data.state):response.data.country?response.data.country:"We're thrilled to hear your Location",
          bio: `${response.data.role.role_name} with API access. Account created ${new Date(response.data.created_at).toLocaleDateString()}.`,
          subscription: response.data.subscriptions[0]?.subscriptionType?.plan_name || "Free",
        })
      } else {
        setError(response.error || "Failed to load profile")
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      // Combine first and last name for username
      const username = `${formData.firstName} ${formData.lastName}`.trim()

      const updateData = {
        username: username || formData.username,
        email: formData.email,
        mobile_number: formData.mobile_number,
        company: formData.company,
        
      }

      const response = await ProfileService.updateProfile(updateData)

      if (response.success) {
        toast.success("Profile updated successfully!")
        setIsEditing(false)
        // Refresh profile data
        await fetchProfile()
      } else {
        setError(response.error || "Failed to update profile")
        toast.error(response.error || "Failed to update profile")
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }
  // User data for the ticket card
  const userData = profile
    ? {
        name: formData.username || profile.username,
        email: profile.email,
        initials: profile.username
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
        plan: formData.subscription || "Free",
        apiKey: profile.api_key,
        joinDate: new Date(profile.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
        location: formData.location,
        balance: profile.balance_click_count,
        isActive: profile.is_active,
      }
    : null

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-lg text-slate-600 dark:text-slate-300">Loading profile...</span>
        </div>
      </div>
    )
  }

  if (error && !profile) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchProfile} className="ml-4">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Static background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl" />
        <div className="absolute top-[60%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-cyan-400/20 dark:bg-cyan-600/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Manage your account information and preferences.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                    className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Vercel Ticket Card */}
          <div className="lg:col-span-1">
            {userData && (
              <Suspense fallback={<ComponentLoader />}>
                <VercelTicketCard user={userData} />
              </Suspense>
            )}

            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <Button
                variant="outline"
                className="gap-2 text-xs dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Download className="h-3 w-3" />
                Download
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-xs dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Share2 className="h-3 w-3" />
                Share
              </Button>
            </div>

            {/* Account Stats */}
            {profile && (
              <Card className="mt-6 border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-slate-900 dark:text-white">Account Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">Balance Clicks</span>
                    <span className="font-medium text-slate-900 dark:text-white">{profile.balance_click_count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">Account Status</span>
                    <span className={`font-medium ${profile.is_active ? "text-green-600" : "text-red-600"}`}>
                      {profile.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">Role</span>
                    <span className="font-medium text-slate-900 dark:text-white capitalize">
                      {profile.role.role_name}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Update your personal details here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:focus:bg-slate-900 dark:text-white disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:focus:bg-slate-900 dark:text-white disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:focus:bg-slate-900 dark:text-white disabled:opacity-60"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mobile_number" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Phone Number
                    </Label>
                    <Input
                      id="mobile_number"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:focus:bg-slate-900 dark:text-white disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:focus:bg-slate-900 dark:text-white disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:focus:bg-slate-900 dark:text-white disabled:opacity-60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 resize-none dark:bg-slate-800 dark:border-slate-700 dark:focus:bg-slate-900 dark:text-white disabled:opacity-60"
                  />
                </div>

                {/* API Key Display */}
                {profile && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        value={profile.api_key}
                        disabled
                        className="bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(profile.api_key)
                          toast.success("API key copied to clipboard!")
                        }}
                        className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Manage your account security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                      <Key className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Password</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Last updated {new Date(profile?.updated_at || "").toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Receive updates about your account</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
