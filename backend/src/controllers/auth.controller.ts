import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { getUserByEmail, getUserByUsername, createUser, updateUser, updateUserOtp } from "../models/user.model"
import { getRoleByName } from "../models/role.model"
import { sendOtpEmail } from "../services/email.service"

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, mobile_number } = req.body

    // Check if username or email already exists
    const existingUsername = await getUserByUsername(username)
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" })
    }

    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" })
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Get user role
    const userRole = await getRoleByName("user")
    if (!userRole) {
      return res.status(500).json({ message: "User role not found" })
    }

    // Generate API key and secret
    const api_key = `sk-${uuidv4()}`
    const api_secret = uuidv4()

    // Create user
    const userId = await createUser({
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

    res.status(201).json({
      message: "User registered successfully. Please verify your email with the OTP sent.",
      userId,
    })
  } catch (error) {
    console.error("Register error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    // Activate user
    await updateUser(user.id, {
      is_active: true,
      otp: null,
    })

    res.status(200).json({ message: "OTP verified successfully. Account activated." })
  } catch (error) {
    console.error("Verify OTP error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    // Check if user exists with username or email
    let user = await getUserByUsername(username)
    if (!user) {
      user = await getUserByEmail(username)
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
      }
    }

    // Check if account is active
    if (!user.is_active) {
      return res.status(401).json({ message: "Account is not activated. Please verify your email." })
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Get user role
    const role = await getRoleByName("admin")
    const roleName = user.role_id === role?.id ? "admin" : "user"

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: roleName }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    })

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: roleName,
        mobile_number: user.mobile_number,
        api_key: user.api_key,
        balance_click_count: user.balance_click_count,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Save OTP to user
    await updateUserOtp(user.id, otp)

    // Send OTP
    await sendOtpEmail(email, otp)

    res.status(200).json({ message: "OTP sent to your email" })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password and clear OTP
    await updateUser(user.id, {
      password: hashedPassword,
      otp: null,
    })

    res.status(200).json({ message: "Password reset successfully" })
  } catch (error) {
    console.error("Reset password error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Send OTP (for other verifications)
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Save OTP to user
    await updateUserOtp(user.id, otp)

    // Send OTP
    await sendOtpEmail(email, otp)

    res.status(200).json({ message: "OTP sent to your email" })
  } catch (error) {
    console.error("Send OTP error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
