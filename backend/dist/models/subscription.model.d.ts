interface Subscription {
    id: number;
    user_id: number;
    payment_type_id: number;
    subscription_type_id: number;
    transaction_id: string;
    amount: number;
    start_date: Date;
    end_date: Date | null;
    status: string;
    created_at: Date;
    updated_at: Date;
}
interface NewSubscription {
    user_id: number;
    payment_type_id: number;
    subscription_type_id: number;
    transaction_id: string;
    amount: number;
    start_date: Date;
    end_date: Date | null;
    status: string;
}
export declare const createSubscription: (subscription: NewSubscription) => Promise<number>;
export declare const getSubscriptionById: (id: number) => Promise<Subscription | null>;
export declare const getSubscriptionsByUserId: (userId: number) => Promise<any[]>;
export declare const updateSubscriptionStatus: (id: number, status: string) => Promise<void>;
export declare const getActiveSubscription: (userId: number) => Promise<any | null>;
export {};
//# sourceMappingURL=subscription.model.d.ts.map