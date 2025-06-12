"use client"

import { motion, AnimatePresence } from "framer-motion"

interface PageLoaderProps {
  isLoading: boolean
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm"
        >
          {/* Animated Background Circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 dark:bg-blue-600/30 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -top-10 -right-20 w-32 h-32 bg-purple-500/20 dark:bg-purple-600/30 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 60, 0],
                y: [0, -80, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-20 -left-10 w-36 h-36 bg-cyan-500/20 dark:bg-cyan-600/30 rounded-full blur-xl"
            />
          </div>

          {/* Main Loader Content */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            {/* Spinning Logo/Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="relative"
            >
              <div className="w-16 h-16 border-4 border-blue-500/30 dark:border-blue-400/40 rounded-full">
                <div className="w-full h-full border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
              </div>

              {/* Inner spinning element */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-2 w-12 h-12 border-2 border-purple-500/50 dark:border-purple-400/60 border-b-transparent rounded-full"
              />
            </motion.div>

            {/* Pulsing Dots */}
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full"
                />
              ))}
            </div>

            {/* Loading Text */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Loading...</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Please wait while we prepare your page</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
