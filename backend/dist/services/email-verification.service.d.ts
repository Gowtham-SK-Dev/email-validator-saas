interface EmailVerificationResult {
    email: string;
    isValid: boolean;
    isDisposable: boolean;
    isCatchAll: boolean;
    domain: string;
    mxRecords: boolean;
    reason?: string;
}
export declare const verifyEmail: (email: string) => Promise<EmailVerificationResult>;
export declare const verifyEmailsBulk: (emails: string[]) => Promise<EmailVerificationResult[]>;
export {};
//# sourceMappingURL=email-verification.service.d.ts.map