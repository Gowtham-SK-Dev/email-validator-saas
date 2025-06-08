-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS vpstbteck_stagingcargo 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE vpstbteck_stagingcargo;

-- Display success message
SELECT 'Database created successfully!' as message;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (role_name) VALUES 
('admin'),
('user')
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

-- Create payment_types table
CREATE TABLE IF NOT EXISTS payment_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_type_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert payment types
INSERT INTO payment_types (payment_type_name) VALUES 
('Razorpay'),
('Stripe'),
('PayPal')
ON DUPLICATE KEY UPDATE payment_type_name = VALUES(payment_type_name);

-- Create subscription_types table
CREATE TABLE IF NOT EXISTS subscription_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    hit_limit INT NOT NULL,
    validity INT NULL COMMENT 'Validity in days, NULL for unlimited',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert subscription plans
INSERT INTO subscription_types (plan_name, price, hit_limit, validity) VALUES 
('Free Trial', 0.00, 100, 30),
('Basic Plan', 9.99, 1000, 30),
('Pro Plan', 29.99, 5000, 30),
('Enterprise Plan', 99.99, 25000, 30),
('Unlimited Plan', 199.99, 100000, 30)
ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    hit_limit = VALUES(hit_limit),
    validity = VALUES(validity);
