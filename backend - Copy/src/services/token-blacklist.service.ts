// Token blacklist service
// In production, you should use Redis or a database for this

interface BlacklistedToken {
  token: string
  expiresAt: Date
  userId: number
}

// In-memory blacklist (use Redis in production)
const blacklistedTokens = new Map<string, BlacklistedToken>()

// Add token to blacklist
export const blacklistToken = (token: string, expiresAt: Date, userId: number): void => {
  blacklistedTokens.set(token, {
    token,
    expiresAt,
    userId,
  })

  // Clean up expired tokens periodically
  cleanupExpiredTokens()
}

// Check if token is blacklisted
export const isTokenBlacklisted = (token: string): boolean => {
  const blacklistedToken = blacklistedTokens.get(token)

  if (!blacklistedToken) {
    return false
  }

  // Check if token has expired
  if (new Date() > blacklistedToken.expiresAt) {
    blacklistedTokens.delete(token)
    return false
  }

  return true
}

// Blacklist all tokens for a user (for logout all)
export const blacklistAllUserTokens = (userId: number): void => {
  // In production, you would query all active tokens for the user
  // and add them to blacklist, or use a user version/nonce approach

  for (const [token, data] of blacklistedTokens.entries()) {
    if (data.userId === userId) {
      // Token is already blacklisted, just update expiry if needed
      continue
    }
  }
}

// Clean up expired tokens
const cleanupExpiredTokens = (): void => {
  const now = new Date()

  for (const [token, data] of blacklistedTokens.entries()) {
    if (now > data.expiresAt) {
      blacklistedTokens.delete(token)
    }
  }
}

// Get blacklist size (for monitoring)
export const getBlacklistSize = (): number => {
  return blacklistedTokens.size
}

// Clear all blacklisted tokens (for testing)
export const clearBlacklist = (): void => {
  blacklistedTokens.clear()
}

// Run cleanup every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000)
