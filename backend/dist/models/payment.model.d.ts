interface Payment {
    id: number;
    user_id: number;
    amount: number;
    payment_type_id: number;
    subscription_id: number;
    transaction_id: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
interface NewPayment {
    user_id: number;
    amount: number;
    payment_type_id: number;
    subscription_id: number;
    transaction_id: string;
    status: string;
}
export declare const createPayment: (payment: NewPayment) => Promise<number>;
export declare const getPaymentById: (id: number) => Promise<Payment | null>;
export declare const getAllPayments: (page?: number, limit?: number) => Promise<{
    payments: any[];
    total: number;
}>;
export declare const getPaymentsByDateRange: (startDate: string, endDate: string, page?: number, limit?: number) => Promise<{
    payments: any[];
    total: number;
}>;
export declare const updatePaymentStatus: (id: number, status: string) => Promise<void>;
export {};
//# sourceMappingURL=payment.model.d.ts.map