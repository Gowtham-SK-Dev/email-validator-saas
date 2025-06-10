"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePaymentCsv = exports.generateUserCsv = exports.generateClickHistoryCsv = exports.generateCsv = void 0;
const generateCsv = (data, headers) => {
    try {
        if (!data || data.length === 0) {
            return headers.join(',') + '\n';
        }
        const csvHeaders = headers.join(',');
        const csvRows = data.map(row => {
            return headers.map(header => {
                const value = row[header];
                if (value === null || value === undefined) {
                    return '';
                }
                if (typeof value === 'string') {
                    const escaped = value.replace(/"/g, '""');
                    return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')
                        ? `"${escaped}"`
                        : escaped;
                }
                if (value instanceof Date) {
                    return value.toISOString();
                }
                return String(value);
            }).join(',');
        });
        return [csvHeaders, ...csvRows].join('\n');
    }
    catch (error) {
        console.error('Error generating CSV:', error);
        throw new Error('Failed to generate CSV');
    }
};
exports.generateCsv = generateCsv;
const generateClickHistoryCsv = (data) => {
    const headers = [
        'ID',
        'Username',
        'Email',
        'Initial Click Count',
        'Current Click Count',
        'Used Click Count',
        'Date'
    ];
    const csvData = data.map(row => ({
        'ID': row.id,
        'Username': row.username,
        'Email': row.email,
        'Initial Click Count': row.initial_click_count,
        'Current Click Count': row.current_click_count,
        'Used Click Count': row.used_click_count,
        'Date': new Date(row.created_at).toLocaleDateString()
    }));
    return (0, exports.generateCsv)(csvData, headers);
};
exports.generateClickHistoryCsv = generateClickHistoryCsv;
const generateUserCsv = (data) => {
    const headers = [
        'ID',
        'Username',
        'Email',
        'Mobile Number',
        'Balance Click Count',
        'Is Active',
        'Role',
        'Created At'
    ];
    const csvData = data.map(row => ({
        'ID': row.id,
        'Username': row.username,
        'Email': row.email,
        'Mobile Number': row.mobile_number,
        'Balance Click Count': row.balance_click_count,
        'Is Active': row.is_active ? 'Yes' : 'No',
        'Role': row.role_name || 'User',
        'Created At': new Date(row.created_at).toLocaleDateString()
    }));
    return (0, exports.generateCsv)(csvData, headers);
};
exports.generateUserCsv = generateUserCsv;
const generatePaymentCsv = (data) => {
    const headers = [
        'ID',
        'Username',
        'Email',
        'Amount',
        'Payment Type',
        'Plan Name',
        'Transaction ID',
        'Status',
        'Date'
    ];
    const csvData = data.map(row => ({
        'ID': row.id,
        'Username': row.username,
        'Email': row.email,
        'Amount': `₹${row.amount}`,
        'Payment Type': row.payment_type_name,
        'Plan Name': row.plan_name,
        'Transaction ID': row.transaction_id,
        'Status': row.status,
        'Date': new Date(row.created_at).toLocaleDateString()
    }));
    return (0, exports.generateCsv)(csvData, headers);
};
exports.generatePaymentCsv = generatePaymentCsv;
//# sourceMappingURL=csvGenerator.js.map