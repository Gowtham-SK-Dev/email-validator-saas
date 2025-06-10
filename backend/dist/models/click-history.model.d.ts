interface ClickHistory {
    id: number;
    user_id: number;
    initial_click_count: number;
    current_click_count: number;
    used_click_count: number;
    created_at: Date;
    updated_at: Date;
}
export declare const logClickHistory: (userId: number, initialClickCount: number, currentClickCount: number, usedClickCount: number) => Promise<number>;
export declare const getClickHistoryByUserId: (userId: number, page?: number, limit?: number) => Promise<{
    clickHistory: ClickHistory[];
    total: number;
}>;
export declare const getAllClickHistory: (page?: number, limit?: number, userId?: number) => Promise<{
    clickHistory: any[];
    total: number;
}>;
export declare const generateClickHistoryReport: (startDate: string, endDate: string, userId?: number) => Promise<any[]>;
export {};
//# sourceMappingURL=click-history.model.d.ts.map