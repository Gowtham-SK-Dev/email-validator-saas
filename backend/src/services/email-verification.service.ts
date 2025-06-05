import dns from "dns"
import { promisify } from "util"

const resolveMx = promisify(dns.resolveMx)

interface EmailVerificationResult {
  email: string
  isValid: boolean
  isDisposable: boolean
  isCatchAll: boolean
  domain: string
  mxRecords: boolean
  reason?: string
}

// List of known disposable email domains
const disposableDomains = [
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "tempmail.org",
  "yopmail.com",
  "temp-mail.org",
  "throwaway.email",
  "maildrop.cc",
  // Add more disposable domains as needed
]

// Verify email address
export const verifyEmail = async (email: string): Promise<EmailVerificationResult> => {
  try {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        email,
        isValid: false,
        isDisposable: false,
        isCatchAll: false,
        domain: "",
        mxRecords: false,
        reason: "Invalid email format",
      }
    }

    const domain = email.split("@")[1].toLowerCase()

    // Check if domain is disposable
    const isDisposable = disposableDomains.includes(domain)

    // Check MX records
    let mxRecords = false
    try {
      const mx = await resolveMx(domain)
      mxRecords = mx && mx.length > 0
    } catch (error) {
      mxRecords = false
    }

    // Basic validation result
    const result: EmailVerificationResult = {
      email,
      isValid: mxRecords && !isDisposable,
      isDisposable,
      isCatchAll: false, // This would require more complex checking
      domain,
      mxRecords,
    }

    if (!mxRecords) {
      result.reason = "Domain has no MX records"
    } else if (isDisposable) {
      result.reason = "Disposable email domain"
    }

    return result
  } catch (error) {
    console.error("Email verification error:", error)
    throw new Error("Email verification failed")
  }
}

// Bulk email verification
export const verifyEmailsBulk = async (emails: string[]): Promise<EmailVerificationResult[]> => {
  try {
    const results = await Promise.all(emails.map((email) => verifyEmail(email)))
    return results
  } catch (error) {
    console.error("Bulk email verification error:", error)
    throw new Error("Bulk email verification failed")
  }
}
