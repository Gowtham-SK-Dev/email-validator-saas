interface SubscriptionType {
    id: number;
    plan_name: string;
    price: number;
    hit_limit: number;
    validity: number | null;
    description: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
interface NewSubscriptionType {
    plan_name: string;
    price: number;
    hit_limit: number;
    validity: number | null;
    description: string;
    is_active: boolean;
}
export declare const getAllSubscriptionTypes: () => Promise<SubscriptionType[]>;
export declare const getSubscriptionTypeById: (id: number) => Promise<SubscriptionType | null>;
export declare const createSubscriptionType: (subscriptionType: NewSubscriptionType) => Promise<number>;
export declare const updateSubscriptionType: (id: number, updateData: Partial<SubscriptionType>) => Promise<void>;
export {};
//# sourceMappingURL=subscription-type.model.d.ts.map