import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { getUserByEmail, getUserByUsername, createUser, updateUser, updateUserOtp } from "../models/user.model"
import { getRoleByName } from "../models/role.model"
import { sendOtpEmail } from "../services/email.service"
import type { Secret } from "jsonwebtoken"
import { promisify } from "util"

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, mobile_number } = req.body

    // Check if username or email already exists
    const existingUsername = await getUserByUsername(username)
    if (existingUsername) {
      res.status(400).json({ message: "Username already exists" })
      return
    }

    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      res.status(400).json({ message: "Email already exists" })
      return
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Get user role
    const userRole = await getRoleByName("user")
    if (!userRole) {
      res.status(500).json({ message: "User role not found" })
      return
    }

    // Generate API key and secret
    const api_key = `sk-${uuidv4()}`
    const api_secret = uuidv4()

    // Create user
    await createUser({
      username,
      password: hashedPassword,
      email,
      mobile_number,
      otp,
      api_key,
      api_secret,
      balance_click_count: 100, // Free trial clicks
      is_active: false, // Will be activated after OTP verification
      role_id: userRole.id,
    })

    // Send OTP
    await sendOtpEmail(email, otp)

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error })
  }
}

// Verify OTP
export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    // Check OTP
    if (user.otp !== otp) {
      res.status(400).json({ message: "Invalid OTP" })
      return
    }

    // Activate user
    await updateUser(user.id, {
      is_active: true,
      otp: null,
    })

    res.status(200).json({ message: "OTP verified successfully" })
  } catch (error) {
    res.status(400).json({ message: "OTP verification failed", error })
  }
}

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    // Check if user exists with username or email
    let user = await getUserByUsername(username)
    if (!user) {
      user = await getUserByEmail(username)
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" })
        return
      }
    }

    // Check if account is active
    if (!user.is_active) {
      res.status(401).json({ message: "Account is not activated. Please verify your email." })
      return
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" })
      return
    }

    // Get user role
    const role = await getRoleByName("admin")
    const roleName = user.role_id === role?.id ? "admin" : "user"

    // Promisify jwt.sign
    const signJwt = promisify<string | object | Buffer, Secret, jwt.SignOptions, string>(jwt.sign)

    // Inside your login function:
    const jwtSecret: Secret = process.env["JWT_SECRET"] || "default_secret_key"
    const jwtExpiresIn = "7d"

    const token = await signJwt({ id: user.id, role: roleName }, jwtSecret, { expiresIn: jwtExpiresIn })

    res.status(200).json({ token })
  } catch (error) {
    res.status(401).json({ message: "Login failed", error })
  }
}

// Forgot password
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Save OTP to user
    await updateUserOtp(user.id, otp)

    // Send OTP
    await sendOtpEmail(email, otp)

    res.status(200).json({ message: "Password reset email sent" })
  } catch (error) {
    res.status(500).json({ message: "Forgot password failed", error })
  }
}

// Reset password
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    // Check OTP
    if (user.otp !== otp) {
      res.status(400).json({ message: "Invalid OTP" })
      return
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password and clear OTP
    await updateUser(user.id, {
      password: hashedPassword,
      otp: null,
    })

    res.status(200).json({ message: "Password reset successful" })
  } catch (error) {
    res.status(500).json({ message: "Reset password failed", error })
  }
}

// Send OTP (for other verifications)
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Save OTP to user
    await updateUserOtp(user.id, otp)

    // Send OTP
    await sendOtpEmail(email, otp)

    res.status(200).json({ message: "OTP sent successfully" })
  } catch (error) {
    res.status(500).json({ message: "Send OTP failed", error })
  }
}
