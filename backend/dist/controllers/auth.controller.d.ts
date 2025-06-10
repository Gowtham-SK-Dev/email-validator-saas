import type { Request, Response } from "express";
export declare const register: (req: Request, res: Response) => Promise<void>;
export declare const verifyOtp: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const forgotPassword: (req: Request, res: Response) => Promise<void>;
export declare const resetPassword: (req: Request, res: Response) => Promise<void>;
export declare const sendOtp: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map