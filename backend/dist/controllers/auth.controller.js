"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.resetPassword = exports.forgotPassword = exports.login = exports.verifyOtp = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const user_model_1 = require("../models/user.model");
const role_model_1 = require("../models/role.model");
const email_service_1 = require("../services/email.service");
const util_1 = require("util");
const register = async (req, res) => {
    try {
        const { username, password, email, mobile_number } = req.body;
        const existingUsername = await (0, user_model_1.getUserByUsername)(username);
        if (existingUsername) {
            res.status(400).json({ success: false, message: "Username already exists" });
            return;
        }
        const existingEmail = await (0, user_model_1.getUserByEmail)(email);
        if (existingEmail) {
            res.status(400).json({ success: false, message: "Email already exists" });
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const userRole = await (0, role_model_1.getRoleByName)("user");
        if (!userRole) {
            res.status(500).json({ success: false, message: "User role not found" });
            return;
        }
        const api_key = `sk-${(0, uuid_1.v4)()}`;
        const api_secret = (0, uuid_1.v4)();
        await (0, user_model_1.createUser)({
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
        });
        res.status(201).json({ success: true, message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Registration failed", error });
    }
};
exports.register = register;
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        if (user.otp !== otp) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
            return;
        }
        await (0, user_model_1.updateUser)(user.id, {
            is_active: true,
            otp: null,
        });
        res.status(200).json({ success: true, message: "OTP verified successfully" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "OTP verification failed", error });
    }
};
exports.verifyOtp = verifyOtp;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await (0, user_model_1.getUserByUsername)(username);
        if (!user) {
            user = await (0, user_model_1.getUserByEmail)(username);
            if (!user) {
                res.status(401).json({ success: false, message: "Invalid credentials" });
                return;
            }
        }
        if (!user.is_active) {
            res.status(401).json({ success: false, message: "Account is not activated. Please verify your email." });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }
        const role = await (0, role_model_1.getRoleByName)("admin");
        const roleName = user.role_id === role?.id ? "admin" : "user";
        const signJwt = (0, util_1.promisify)(jsonwebtoken_1.default.sign);
        const jwtSecret = process.env["JWT_SECRET"] || "default_secret_key";
        const jwtExpiresIn = "7d";
        const token = await signJwt({ id: user.id, role: roleName }, jwtSecret, { expiresIn: jwtExpiresIn });
        res.status(200).json({ success: true, token: token });
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Login failed", error });
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await (0, user_model_1.updateUserOtp)(user.id, otp);
        res.status(200).json({ success: true, message: "Password reset email sent" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Forgot password failed", error });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        if (user.otp !== otp) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        await (0, user_model_1.updateUser)(user.id, {
            password: hashedPassword,
            otp: null,
        });
        res.status(200).json({ success: true, message: "Password reset successful" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Reset password failed", error });
    }
};
exports.resetPassword = resetPassword;
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await (0, user_model_1.updateUserOtp)(user.id, otp);
        await (0, email_service_1.sendOtpEmail)(email, otp);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Send OTP failed", error });
    }
};
exports.sendOtp = sendOtp;
//# sourceMappingURL=auth.controller.js.map