-- Use the database
USE vpstbteck_stagingcargo;

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_api_key ON users(api_key);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Indexes for subscriptions table
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_start_date ON subscriptions(start_date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON subscriptions(end_date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);

-- Indexes for payments table
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- Indexes for warranties table
CREATE INDEX IF NOT EXISTS idx_warranties_user_id ON warranties(user_id);
CREATE INDEX IF NOT EXISTS idx_warranties_is_active ON warranties(is_active);
CREATE INDEX IF NOT EXISTS idx_warranties_created_at ON warranties(created_at);

-- Indexes for click_history table
CREATE INDEX IF NOT EXISTS idx_click_history_user_id ON click_history(user_id);
CREATE INDEX IF NOT EXISTS idx_click_history_created_at ON click_history(created_at);

-- Indexes for help table
CREATE INDEX IF NOT EXISTS idx_help_user_id ON help(user_id);
CREATE INDEX IF NOT EXISTS idx_help_status ON help(status);
CREATE INDEX IF NOT EXISTS idx_help_created_at ON help(created_at);

-- Indexes for subscription_types table
CREATE INDEX IF NOT EXISTS idx_subscription_types_is_active ON subscription_types(is_active);
CREATE INDEX IF NOT EXISTS idx_subscription_types_price ON subscription_types(price);

-- Indexes for payment_types table
CREATE INDEX IF NOT EXISTS idx_payment_types_is_active ON payment_types(is_active);

-- Indexes for roles table
CREATE INDEX IF NOT EXISTS idx_roles_role_name ON roles(role_name);

-- Indexes for menus table
CREATE INDEX IF NOT EXISTS idx_menus_parent_id ON menus(parent_id);
CREATE INDEX IF NOT EXISTS idx_menus_role_id ON menus(role_id);
CREATE INDEX IF NOT EXISTS idx_menus_is_active ON menus(is_active);
CREATE INDEX IF NOT EXISTS idx_menus_sort_order ON menus(sort_order);

SELECT 'All indexes created successfully!' as message;
