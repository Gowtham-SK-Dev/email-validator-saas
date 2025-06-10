interface Help {
    id: number;
    user_id: number;
    message: string;
    response: string | null;
    status: string;
    created_at: Date;
    updated_at: Date;
}
interface NewHelp {
    user_id: number;
    message: string;
}
interface UpdateHelp {
    response?: string;
    status?: string;
}
export declare const createHelpRequest: (help: NewHelp) => Promise<number>;
export declare const getHelpRequestsByUserId: (userId: number) => Promise<Help[]>;
export declare const getAllHelpRequests: (page?: number, limit?: number) => Promise<{
    helpRequests: any[];
    total: number;
}>;
export declare const updateHelpRequest: (id: number, updateData: UpdateHelp) => Promise<void>;
export declare const getHelpRequestById: (id: number) => Promise<Help | null>;
export {};
//# sourceMappingURL=help.model.d.ts.map