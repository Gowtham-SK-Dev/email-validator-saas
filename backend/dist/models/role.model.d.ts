interface Role {
    id: number;
    role_name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}
export declare const getRoleByName: (roleName: string) => Promise<Role | null>;
export declare const getRoleById: (id: number) => Promise<Role | null>;
export declare const getAllRoles: () => Promise<Role[]>;
export declare const createRole: (roleName: string, description: string) => Promise<number>;
export {};
//# sourceMappingURL=role.model.d.ts.map