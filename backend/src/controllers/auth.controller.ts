import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import {
  getUserByEmail,
  getUserByUsername,
  createUser,
  updateUser,
  updateUserOtp,
  getUserById,
} from "../models/user.model"
import { getRoleByName } from "../models/role.model"
import { sendOtpEmail } from "../services/email.service"
import type { Secret } from "jsonwebtoken"
import { promisify } from "util"

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, mobile_number } = req.body

    const existingUsername = await getUserByUsername(username)
    if (existingUsername) {
      res.status(400).json({ success: false, message: "Username already exists" })
      return
    }

    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      res.status(400).json({ success: false, message: "Email already exists" })
      return
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userRole = await getRoleByName("user")
    if (!userRole) {
      res.status(500).json({ success: false, message: "User role not found" })
      return
    }

    
    const api_key = `sk-${uuidv4()}`
    const api_secret = uuidv4()

    await createUser({
      username,
      password: hashedPassword,
      email,
      mobile_number,
      otp,
      api_key,
      api_secret,
      balance_click_count: 100,
      is_active: false,
      role_id: userRole.id,
    })

    // await sendOtpEmail(email, otp)

    res.status(201).json({ success: true, message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed", error })
  }
}

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" })
      return
    }

    if (user.otp !== otp) {
      res.status(400).json({ success: false, message: "Invalid OTP" })
      return
    }

    await updateUser(user.id, {
      is_active: true,
      otp: null,
    })

    res.status(200).json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    res.status(400).json({ success: false, message: "OTP verification failed", error })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    
    let user = await getUserByUsername(username)
    if (!user) {
      user = await getUserByEmail(username)
      if (!user) {
        res.status(401).json({ success: false, message: "Invalid credentials" })
        return
      }
    }


    if (!user.is_active) {
      res.status(401).json({ success: false, message: "Account is not activated. Please verify your email." })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" })
      return
    }

    const role = await getRoleByName("admin")
    const roleName = user.role_id === role?.id ? "admin" : "user"

    const signJwt = promisify<string | object | Buffer, Secret, jwt.SignOptions, string>(jwt.sign)

    const jwtSecret: Secret = process.env["JWT_SECRET"] || "default_secret_key"
    const jwtExpiresIn = "7d"
    const refreshTokenExpiresIn = "30d"

    // Generate access token
    const token = await signJwt({ id: user.id, role: roleName }, jwtSecret, { expiresIn: jwtExpiresIn })

    // Generate refresh token
    const refreshToken = await signJwt({ id: user.id, role: roleName, type: "refresh" }, jwtSecret, {
      expiresIn: refreshTokenExpiresIn,
    })

    
    const expiresIn = 7 * 24 * 60 * 60 // 7 days in seconds

    // Remove sensitive data from user object
    const { password: _, api_secret, otp, ...userData } = user

    res.status(200).json({
      success: true,
      token: token,
      refreshToken: refreshToken,
      user: userData,
      expiresIn: expiresIn,
    })
  } catch (error) {
    res.status(401).json({ success: false, message: "Login failed", error })
  }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" })
      return
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await updateUserOtp(user.id, otp)

    // await sendOtpEmail(email, otp)

    res.status(200).json({ success: true, message: "Password reset email sent" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Forgot password failed", error })
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" })
      return
    }

    if (user.otp !== otp) {
      res.status(400).json({ success: false, message: "Invalid OTP" })
      return
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await updateUser(user.id, {
      password: hashedPassword,
      otp: null,
    })

    res.status(200).json({ success: true, message: "Password reset successful" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Reset password failed", error })
  }
}


export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" })
      return
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await updateUserOtp(user.id, otp)

    await sendOtpEmail(email, otp)

    res.status(200).json({ success: true, message: "OTP sent successfully" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Send OTP failed", error })
  }
}


export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      res.status(401).json({ success: false, message: "Refresh token is required" })
      return
    }

    
    const decoded = jwt.verify(refreshToken, process.env["JWT_SECRET"] as string) as any

    if (decoded.type !== "refresh") {
      res.status(401).json({ success: false, message: "Invalid refresh token" })
      return
    }

    
    const user = await getUserById(decoded.id)
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" })
      return
    }

    if (!user.is_active) {
      res.status(401).json({ success: false, message: "Account is inactive" })
      return
    }

    const role = await getRoleByName("admin")
    const roleName = user.role_id === role?.id ? "admin" : "user"

    const signJwt = promisify<string | object | Buffer, Secret, jwt.SignOptions, string>(jwt.sign)
    const jwtSecret: Secret = process.env["JWT_SECRET"] || "default_secret_key"
    const jwtExpiresIn = "7d"
    const refreshTokenExpiresIn = "30d"

    // Generate new access token
    const newToken = await signJwt({ id: user.id, role: roleName }, jwtSecret, { expiresIn: jwtExpiresIn })

    // Generate new refresh token
    const newRefreshToken = await signJwt({ id: user.id, role: roleName, type: "refresh" }, jwtSecret, {
      expiresIn: refreshTokenExpiresIn,
    })

    // Calculate expiration time in seconds
    const expiresIn = 7 * 24 * 60 * 60 // 7 days in seconds

    // Remove sensitive data from user object
    const { password: _, api_secret, otp, ...userData } = user

    res.status(200).json({
      success: true,
      token: newToken,
      refreshToken: newRefreshToken,
      user: userData,
      expiresIn: expiresIn,
    })
  } catch (error) {
    console.error("Refresh token error:", error)
    res.status(401).json({ success: false, message: "Invalid or expired refresh token" })
  }
}


export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN
    const { refreshToken } = req.body

    if (!token) {
      res.status(400).json({ success: false, message: "Access token is required" })
      return
    }

    // In a production environment, you would want to:
    // 1. Add tokens to a blacklist/redis cache
    // 2. Store blacklisted tokens with their expiration time
    // 3. Check blacklist in authentication middleware

    // For now, we'll just return success since JWT is stateless
    // The client should remove the tokens from storage

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({ success: false, message: "Logout failed" })
  }
}


export const logoutAll = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ success: false, message: "Not authenticated" })
      return
    }

    const userId = req.user.id

    // In a production environment, you would:
    // 1. Add all user's tokens to blacklist
    // 2. Or increment a user version/nonce in database
    // 3. Include this version in JWT payload
    // 4. Validate version during token verification

    // For now, we'll update the user's updated_at timestamp
    // This can be used as a simple token invalidation mechanism
    await updateUser(userId, { updated_at: new Date() } as any)

    res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    })
  } catch (error) {
    console.error("Logout all error:", error)
    res.status(500).json({ success: false, message: "Logout from all devices failed" })
  }
}
