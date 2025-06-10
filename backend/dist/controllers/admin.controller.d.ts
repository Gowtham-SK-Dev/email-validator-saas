import type { Request, Response } from "express";
export declare const getUsers: (req: Request, res: Response) => Promise<void>;
export declare const getUserProfile: (req: Request, res: Response) => Promise<void>;
export declare const updateUserProfile: (req: Request, res: Response) => Promise<void>;
export declare const getPayments: (req: Request, res: Response) => Promise<void>;
export declare const getClickHistories: (req: Request, res: Response) => Promise<void>;
export declare const getHelpRequests: (req: Request, res: Response) => Promise<void>;
export declare const respondToHelpRequest: (req: Request, res: Response) => Promise<void>;
export declare const getDashboardStats: (req: Request, res: Response) => Promise<void>;
export declare const exportClickHistory: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map