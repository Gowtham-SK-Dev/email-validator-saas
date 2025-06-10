"use client"

import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { User, Star, Shield, Key, Calendar, MapPin } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface VercelTicketCardProps {
  user: {
    name: string
    email: string
    avatar?: string
    initials?: string
    plan: string
    apiKey: string
    joinDate: string
    location: string
  }
  className?: string
}

export default function VercelTicketCard({ user, className = "" }: VercelTicketCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const posX = e.clientX - centerX
      const posY = e.clientY - centerY

      const rotateXValue = (posY / rect.height) * -15
      const rotateYValue = (posX / rect.width) * 15

      setRotateX(rotateXValue)
      setRotateY(rotateYValue)
    }

    const handleMouseLeave = () => {
      setRotateX(0)
      setRotateY(0)
      setIsHovered(false)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)
    card.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
      card.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Floating particles animation
  const particles = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-white/20 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 2,
        ease: "easeInOut",
      }}
    />
  ))

  return (
    <div className={`perspective-1000 ${className}`}>
      {/* Lanyard */}
      <motion.div
        className="flex flex-col items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-4 h-4 border-2 border-slate-400 rounded-full"></div>
        </div>
        <div className="w-0.5 h-12 bg-gradient-to-b from-slate-700 to-slate-500"></div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        ref={cardRef}
        className="relative w-80 mx-auto cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.6}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
        whileDrag={{ scale: 1.02, zIndex: 50 }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX,
          rotateY,
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          rotateX: { type: "spring", stiffness: 300, damping: 30 },
          rotateY: { type: "spring", stiffness: 300, damping: 30 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 shadow-2xl border border-indigo-700/50">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">{particles}</div>

          {/* Holographic strip */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 via-purple-500 to-indigo-500 opacity-80"></div>

          {/* Card Content */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <p className="text-indigo-200 text-sm font-medium tracking-wide">INFOSENSE ID</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-indigo-100 text-xs">{user.plan}</span>
                </div>
              </div>
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Profile Section */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Avatar */}
              <motion.div
                className="relative inline-block mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-2 border-white/20">
                  {user.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.initials || <User className="w-8 h-8" />
                  )}
                </div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 to-indigo-600 rounded-full blur-sm opacity-30"
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                    opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                  }}
                  transition={{ duration: 1.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
                />
              </motion.div>

              {/* Name */}
              <h2 className="text-indigo-50 text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-indigo-200 text-sm">{user.email}</p>
            </motion.div>

            {/* Details Section */}
            <motion.div
              className="space-y-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-indigo-300" />
                <span className="text-indigo-100">Subscribed to {user.plan}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Key className="w-4 h-4 text-indigo-300" />
                <span className="text-indigo-100 font-mono text-xs">{user.apiKey}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-indigo-300" />
                <span className="text-indigo-100">Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-indigo-300" />
                <span className="text-indigo-100">{user.location}</span>
              </div>
            </motion.div>

            {/* Water Level Indicator */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="h-0.5 bg-indigo-700 rounded-full"></div>
              <motion.div
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </motion.div>

            {/* Footer */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div>
                <p className="text-indigo-300 text-xs uppercase tracking-wide">VIRTUAL</p>
                <p className="text-indigo-200 text-sm font-mono">
                  #{Math.random().toString(36).substr(2, 6).toUpperCase()}
                </p>
              </div>

              {/* QR Code */}
              <motion.div
                className="bg-white p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <QRCodeSVG
                  value={`${user.name}-${user.email}-${user.apiKey}`}
                  size={40}
                  bgColor="white"
                  fgColor="black"
                  level="M"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Drag hint */}
      <motion.p
        className="text-center text-indigo-400 text-xs mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        Drag me around
      </motion.p>
    </div>
  )
}
