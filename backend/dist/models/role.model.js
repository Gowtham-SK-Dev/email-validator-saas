"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = exports.getAllRoles = exports.getRoleById = exports.getRoleByName = void 0;
const database_1 = __importDefault(require("../config/database"));
const getRoleByName = async (roleName) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM roles WHERE role_name = ?", [roleName]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting role by name:", error);
        throw error;
    }
};
exports.getRoleByName = getRoleByName;
const getRoleById = async (id) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM roles WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting role by ID:", error);
        throw error;
    }
};
exports.getRoleById = getRoleById;
const getAllRoles = async () => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM roles ORDER BY role_name ASC");
        return rows;
    }
    catch (error) {
        console.error("Error getting all roles:", error);
        throw error;
    }
};
exports.getAllRoles = getAllRoles;
const createRole = async (roleName, description) => {
    try {
        const [result] = await database_1.default.query("INSERT INTO roles (role_name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())", [roleName, description]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating role:", error);
        throw error;
    }
};
exports.createRole = createRole;
//# sourceMappingURL=role.model.js.map