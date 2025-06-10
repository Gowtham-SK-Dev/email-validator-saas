interface Warranty {
    id: number;
    user_id: number;
    initial_click_count: number;
    current_click_count: number;
    used_click_count: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
interface NewWarranty {
    user_id: number;
    initial_click_count: number;
    current_click_count: number;
    used_click_count: number;
    is_active: boolean;
}
export declare const createWarranty: (warranty: NewWarranty) => Promise<number>;
export declare const getWarrantyByUserId: (userId: number) => Promise<Warranty | null>;
export declare const updateWarranty: (id: number, updateData: Partial<Warranty>) => Promise<void>;
export declare const updateWarrantyClickCount: (userId: number, usedClicks: number) => Promise<void>;
export {};
//# sourceMappingURL=warranty.model.d.ts.map