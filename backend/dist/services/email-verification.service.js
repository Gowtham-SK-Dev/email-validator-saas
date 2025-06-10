"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailsBulk = exports.verifyEmail = void 0;
const dns_1 = __importDefault(require("dns"));
const util_1 = require("util");
const resolveMx = (0, util_1.promisify)(dns_1.default.resolveMx);
const disposableDomains = [
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "tempmail.org",
    "yopmail.com",
    "temp-mail.org",
    "throwaway.email",
    "maildrop.cc",
];
const verifyEmail = async (email) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                email,
                isValid: false,
                isDisposable: false,
                isCatchAll: false,
                domain: "",
                mxRecords: false,
                reason: "Invalid email format",
            };
        }
        const domain = email.split("@")[1].toLowerCase();
        const isDisposable = disposableDomains.includes(domain);
        let mxRecords = false;
        try {
            const mx = await resolveMx(domain);
            mxRecords = mx && mx.length > 0;
        }
        catch (error) {
            mxRecords = false;
        }
        const result = {
            email,
            isValid: mxRecords && !isDisposable,
            isDisposable,
            isCatchAll: false,
            domain,
            mxRecords,
        };
        if (!mxRecords) {
            result.reason = "Domain has no MX records";
        }
        else if (isDisposable) {
            result.reason = "Disposable email domain";
        }
        return result;
    }
    catch (error) {
        console.error("Email verification error:", error);
        throw new Error("Email verification failed");
    }
};
exports.verifyEmail = verifyEmail;
const verifyEmailsBulk = async (emails) => {
    try {
        const results = await Promise.all(emails.map((email) => (0, exports.verifyEmail)(email)));
        return results;
    }
    catch (error) {
        console.error("Bulk email verification error:", error);
        throw new Error("Bulk email verification failed");
    }
};
exports.verifyEmailsBulk = verifyEmailsBulk;
//# sourceMappingURL=email-verification.service.js.map