// Generate CSV from data array
export const generateCsv = (data: any[], headers: string[]): string => {
  try {
    if (!data || data.length === 0) {
      return headers.join(',') + '\n'
    }

    // Create header row
    const csvHeaders = headers.join(',')

    // Create data rows
    const csvRows = data.map(row => {
      return headers.map(header => {
        const value = row[header]
        
        // Handle different data types
        if (value === null || value === undefined) {
          return ''
        }
        
        if (typeof value === 'string') {
          // Escape quotes and wrap in quotes if contains comma or quote
          const escaped = value.replace(/"/g, '""')
          return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') 
            ? `"${escaped}"` 
            : escaped
        }
        
        if (value instanceof Date) {
          return value.toISOString()
        }
        
        return String(value)
      }).join(',')
    })

    return [csvHeaders, ...csvRows].join('\n')
  } catch (error) {
    console.error('Error generating CSV:', error)
    throw new Error('Failed to generate CSV')
  }
}

// Generate CSV for click history report
export const generateClickHistoryCsv = (data: any[]): string => {
  const headers = [
    'ID',
    'Username',
    'Email',
    'Initial Click Count',
    'Current Click Count',
    'Used Click Count',
    'Date'
  ]

  const csvData = data.map(row => ({
    'ID': row.id,
    'Username': row.username,
    'Email': row.email,
    'Initial Click Count': row.initial_click_count,
    'Current Click Count': row.current_click_count,
    'Used Click Count': row.used_click_count,
    'Date': new Date(row.created_at).toLocaleDateString()
  }))

  return generateCsv(csvData, headers)
}

// Generate CSV for user report
export const generateUserCsv = (data: any[]): string => {
  const headers = [
    'ID',
    'Username',
    'Email',
    'Mobile Number',
    'Balance Click Count',
    'Is Active',
    'Role',
    'Created At'
  ]

  const csvData = data.map(row => ({
    'ID': row.id,
    'Username': row.username,
    'Email': row.email,
    'Mobile Number': row.mobile_number,
    'Balance Click Count': row.balance_click_count,
    'Is Active': row.is_active ? 'Yes' : 'No',
    'Role': row.role_name || 'User',
    'Created At': new Date(row.created_at).toLocaleDateString()
  }))

  return generateCsv(csvData, headers)
}

// Generate CSV for payment report
export const generatePaymentCsv = (data: any[]): string => {
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
  ]

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
  }))

  return generateCsv(csvData, headers)
}
