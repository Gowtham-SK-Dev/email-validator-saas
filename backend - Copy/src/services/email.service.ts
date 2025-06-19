import nodemailer from "nodemailer"

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env["EMAIL_HOST"] || "smtp.gmail.com",
  port: Number.parseInt(process.env["EMAIL_PORT"] || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env["EMAIL_USER"],
    pass: process.env["EMAIL_PASS"],
  },
})

// Send OTP email
export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env["EMAIL_USER"],
      to: email,
      subject: "Email Verification OTP - Email Verification SaaS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated email from Email Verification SaaS. Please do not reply.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`OTP email sent to ${email}`)
  } catch (error) {
    console.error("Error sending OTP email:", error)
    throw new Error("Failed to send OTP email")
  }
}

// Send welcome email
export const sendWelcomeEmail = async (email: string, username: string): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env["EMAIL_USER"],
      to: email,
      subject: "Welcome to Email Verification SaaS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to Email Verification SaaS!</h2>
          <p>Hi ${username},</p>
          <p>Thank you for joining Email Verification SaaS. Your account has been successfully created.</p>
          <p>You can now start using our email verification services with your API key.</p>
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #007bff;">
            <h3>Getting Started:</h3>
            <ul>
              <li>Log in to your dashboard</li>
              <li>Get your API key from the API Keys section</li>
              <li>Start verifying emails using our API</li>
            </ul>
          </div>
          <p>If you have any questions, feel free to contact our support team.</p>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated email from Email Verification SaaS. Please do not reply.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Welcome email sent to ${email}`)
  } catch (error) {
    console.error("Error sending welcome email:", error)
    throw new Error("Failed to send welcome email")
  }
}

// Send password reset email
export const sendPasswordResetEmail = async (email: string, otp: string): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env["EMAIL_USER"],
      to: email,
      subject: "Password Reset OTP - Email Verification SaaS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>You requested to reset your password. Use the OTP below to reset your password:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #dc3545; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated email from Email Verification SaaS. Please do not reply.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Password reset email sent to ${email}`)
  } catch (error) {
    console.error("Error sending password reset email:", error)
    throw new Error("Failed to send password reset email")
  }
}
