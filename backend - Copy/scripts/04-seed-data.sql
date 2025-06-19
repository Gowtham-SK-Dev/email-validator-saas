-- Use the database
USE vpstbteck_stagingcargo;

-- Insert roles
INSERT IGNORE INTO roles (role_name) VALUES
('admin'),
('user');

-- Insert payment types
INSERT IGNORE INTO payment_types (payment_type_name) VALUES
('razorpay'),
('stripe'),
('paypal');

-- Insert subscription types
INSERT IGNORE INTO subscription_types (plan_name, price, hit_limit, validity, description) VALUES
('Free Trial', 0.00, 100, 30, 'Free trial plan with 100 email verifications for 30 days'),
('Basic Plan', 299.00, 1000, 30, 'Basic plan with 1,000 email verifications per month'),
('Pro Plan', 599.00, 5000, 30, 'Professional plan with 5,000 email verifications per month'),
('Business Plan', 999.00, 15000, 30, 'Business plan with 15,000 email verifications per month'),
('Enterprise Plan', 1999.00, 50000, 30, 'Enterprise plan with 50,000 email verifications per month'),
('Unlimited Plan', 4999.00, 999999, 30, 'Unlimited plan with unlimited email verifications per month');

-- Insert sample admin user (password: admin123)
-- Note: In production, this should be created through the registration process
INSERT IGNORE INTO users (
    username, 
    password, 
    mobile_number, 
    email, 
    api_key, 
    api_secret, 
    balance_click_count, 
    is_active, 
    role_id
) VALUES (
    'admin',
    '$2b$10$rQZ8kHWKQYXHZQXHZQXHZOeKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', -- admin123
    '+919999999999',
    'admin@emailverification.com',
    'sk-admin-test-key-12345',
    'admin-secret-12345',
    999999,
    TRUE,
    (SELECT id FROM roles WHERE role_name = 'admin')
);

-- Insert sample menus
INSERT IGNORE INTO menus (menu_name, menu_url, parent_id, sort_order, role_id) VALUES
('Dashboard', '/dashboard', NULL, 1, NULL),
('Users', '/admin/users', NULL, 2, (SELECT id FROM roles WHERE role_name = 'admin')),
('Payments', '/admin/payments', NULL, 3, (SELECT id FROM roles WHERE role_name = 'admin')),
('Reports', '/admin/reports', NULL, 4, (SELECT id FROM roles WHERE role_name = 'admin')),
('Settings', '/settings', NULL, 5, NULL),
('API Keys', '/dashboard/api-keys', NULL, 6, NULL),
('Subscription', '/dashboard/subscription', NULL, 7, NULL),
('Support', '/dashboard/support', NULL, 8, NULL);

SELECT 'Sample data inserted successfully!' as message;
