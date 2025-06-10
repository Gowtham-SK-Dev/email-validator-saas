interface User {
    id: number;
    username: string;
    password: string;
    mobile_number: string;
    email: string;
    api_key: string;
    api_secret: string;
    otp: string | null;
    balance_click_count: number;
    is_active: boolean;
    role_id: number;
    created_at: Date;
    updated_at: Date;
}
interface NewUser {
    username: string;
    password: string;
    mobile_number: string;
    email: string;
    api_key: string;
    api_secret: string;
    otp: string | null;
    balance_click_count: number;
    is_active: boolean;
    role_id: number;
}
interface UpdateUser {
    username?: string;
    password?: string;
    mobile_number?: string;
    email?: string;
    api_key?: string;
    api_secret?: string;
    otp?: string | null;
    balance_click_count?: number;
    is_active?: boolean;
    role_id?: number;
}
export declare const getUserById: (id: number) => Promise<User | null>;
export declare const getUserByUsername: (username: string) => Promise<User | null>;
export declare const getUserByEmail: (email: string) => Promise<User | null>;
export declare const getUserByApiKey: (apiKey: string) => Promise<User | null>;
export declare const createUser: (user: NewUser) => Promise<number>;
export declare const updateUser: (id: number, updateData: UpdateUser) => Promise<void>;
export declare const updateUserOtp: (id: number, otp: string) => Promise<void>;
export declare const updateUserClickCount: (id: number, amount: number) => Promise<number>;
export declare const getAllUsers: (page?: number, limit?: number, search?: string) => Promise<{
    users: User[];
    total: number;
}>;
export declare const getUserApiUsage: (id: number) => Promise<any>;
export declare const getUserStats: () => Promise<any>;
export {};
//# sourceMappingURL=user.model.d.ts.map