import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { getUserByEmail, getUserByUsername, createUser, updateUser, updateUserOtp } from "../models/user.model"
import { getRoleByName } from "../models/role.model"
import { sendOtpEmail } from "../services/email.service"
import type { Secret } from "jsonwebtoken"
import { promisify } from "util"


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, mobile_number } = req.body

    const existingUsername = await getUserByUsername(username)
    if (existingUsername) {
      res.status(400).json({ success:false,message: "Username already exists" })
      return
    }

    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      res.status(400).json({ success:false, message: "Email already exists" })
      return
    }

    
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userRole = await getRoleByName("user")
    if (!userRole) {
      res.status(500).json({ success:false, message: "User role not found" })
      return
    }

    // Generate API key and secret
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

    res.status(201).json({ success:true, message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ success:false,message: "Registration failed", error })
  }
}

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success:false, message: "User not found" })
      return
    }

    
    if (user.otp !== otp) {
      res.status(400).json({ success:false, message: "Invalid OTP" })
      return
    }

    
    await updateUser(user.id, {
      is_active: true,
      otp: null,
    })

    res.status(200).json({ success:true, message: "OTP verified successfully" })
  } catch (error) {
    res.status(400).json({ success:false, message: "OTP verification failed", error })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    // Check if user exists with username or email
    let user = await getUserByUsername(username)
    if (!user) {
      user = await getUserByEmail(username)
      if (!user) {
        res.status(401).json({ success:false, message: "Invalid credentials" })
        return
      }
    }

    // Check if account is active
    if (!user.is_active) {
      res.status(401).json({ success:false, message: "Account is not activated. Please verify your email." })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ success:false, message: "Invalid credentials" })
      return
    }

    const role = await getRoleByName("admin")
    const roleName = user.role_id === role?.id ? "admin" : "user"

    const signJwt = promisify<string | object | Buffer, Secret, jwt.SignOptions, string>(jwt.sign)

    const jwtSecret: Secret = process.env["JWT_SECRET"] || "default_secret_key"
    const jwtExpiresIn = "7d"

    const token = await signJwt({ id: user.id, role: roleName }, jwtSecret, { expiresIn: jwtExpiresIn })

    res.status(200).json({ success:true,token:token })
  } catch (error) {
    res.status(401).json({ success:false, message: "Login failed", error })
  }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success:false, message: "User not found" })
      return
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await updateUserOtp(user.id, otp)

    // await sendOtpEmail(email, otp)

    res.status(200).json({ success:true, message: "Password reset email sent" })
  } catch (error) {
    res.status(500).json({ success:false, message: "Forgot password failed", error })
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success:false, message: "User not found" })
      return
    }

    if (user.otp !== otp) {
      res.status(400).json({ success:false, message: "Invalid OTP" })
      return
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await updateUser(user.id, {
      password: hashedPassword,
      otp: null,
    })

    res.status(200).json({ success:true,message: "Password reset successful" })
  } catch (error) {
    res.status(500).json({success:false, message: "Reset password failed", error })
  }
}

// Send OTP (for other verifications)
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      res.status(404).json({ success:false,message: "User not found" })
      return
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await updateUserOtp(user.id, otp)

    await sendOtpEmail(email, otp)

    res.status(200).json({ success:true, message: "OTP sent successfully" })
  } catch (error) {
    res.status(500).json({ success:false, message: "Send OTP failed", error })
  }
}
