"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "email_verification_saas",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
    port: 3306,
    ssl: {
        rejectUnauthorized: false,
    },
};
console.log("Connecting to database with config:", {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    port: dbConfig.port,
});
const pool = promise_1.default.createPool(dbConfig);
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully");
        connection.release();
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        if (process.env.NODE_ENV === "production") {
            process.exit(1);
        }
    }
};
testConnection();
exports.default = pool;
//# sourceMappingURL=database.js.map