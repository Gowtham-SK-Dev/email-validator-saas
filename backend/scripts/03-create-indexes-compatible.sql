-- Use the database
USE vpstbteck_stagingcargo;

-- Indexes for users table
-- First check if index exists before creating
DROP PROCEDURE IF EXISTS create_index_if_not_exists;
DELIMITER $$
CREATE PROCEDURE create_index_if_not_exists(
    IN table_name VARCHAR(64),
    IN index_name VARCHAR(64),
    IN column_list VARCHAR(255)
)
BEGIN
    DECLARE index_exists INT DEFAULT 0;
    
    SELECT COUNT(1) INTO index_exists
    FROM information_schema.statistics
    WHERE table_schema = DATABASE()
    AND table_name = table_name
    AND index_name = index_name;
    
    IF index_exists = 0 THEN
        SET @sql = CONCAT('CREATE INDEX ', index_name, ' ON ', table_name, '(', column_list, ')');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END$$
DELIMITER ;

-- Create indexes for users table
CALL create_index_if_not_exists('users', 'idx_users_email', 'email');
CALL create_index_if_not_exists('users', 'idx_users_username', 'username');
CALL create_index_if_not_exists('users', 'idx_users_api_key', 'api_key');
CALL create_index_if_not_exists('users', 'idx_users_role_id', 'role_id');
CALL create_index_if_not_exists('users', 'idx_users_is_active', 'is_active');
CALL create_index_if_not_exists('users', 'idx_users_created_at', 'created_at');

-- Create indexes for subscriptions table
CALL create_index_if_not_exists('subscriptions', 'idx_subscriptions_user_id', 'user_id');
CALL create_index_if_not_exists('subscriptions', 'idx_subscriptions_status', 'status');
CALL create_index_if_not_exists('subscriptions', 'idx_subscriptions_start_date', 'start_date');
CALL create_index_if_not_exists('subscriptions', 'idx_subscriptions_end_date', 'end_date');
CALL create_index_if_not_exists('subscriptions', 'idx_subscriptions_created_at', 'created_at');

-- Create indexes for payments table
CALL create_index_if_not_exists('payments', 'idx_payments_user_id', 'user_id');
CALL create_index_if_not_exists('payments', 'idx_payments_transaction_id', 'transaction_id');
CALL create_index_if_not_exists('payments', 'idx_payments_status', 'status');
CALL create_index_if_not_exists('payments', 'idx_payments_created_at', 'created_at');

-- Create indexes for warranties table
CALL create_index_if_not_exists('warranties', 'idx_warranties_user_id', 'user_id');
CALL create_index_if_not_exists('warranties', 'idx_warranties_is_active', 'is_active');
CALL create_index_if_not_exists('warranties', 'idx_warranties_created_at', 'created_at');

-- Create indexes for click_history table
CALL create_index_if_not_exists('click_history', 'idx_click_history_user_id', 'user_id');
CALL create_index_if_not_exists('click_history', 'idx_click_history_created_at', 'created_at');

-- Create indexes for help table
CALL create_index_if_not_exists('help', 'idx_help_user_id', 'user_id');
CALL create_index_if_not_exists('help', 'idx_help_status', 'status');
CALL create_index_if_not_exists('help', 'idx_help_created_at', 'created_at');

-- Create indexes for subscription_types table
CALL create_index_if_not_exists('subscription_types', 'idx_subscription_types_is_active', 'is_active');
CALL create_index_if_not_exists('subscription_types', 'idx_subscription_types_price', 'price');

-- Create indexes for payment_types table
CALL create_index_if_not_exists('payment_types', 'idx_payment_types_is_active', 'is_active');

-- Create indexes for roles table
CALL create_index_if_not_exists('roles', 'idx_roles_role_name', 'role_name');

-- Create indexes for menus table
CALL create_index_if_not_exists('menus', 'idx_menus_parent_id', 'parent_id');
CALL create_index_if_not_exists('menus', 'idx_menus_role_id', 'role_id');
CALL create_index_if_not_exists('menus', 'idx_menus_is_active', 'is_active');
CALL create_index_if_not_exists('menus', 'idx_menus_sort_order', 'sort_order');

-- Clean up
DROP PROCEDURE IF EXISTS create_index_if_not_exists;

SELECT 'All indexes created successfully!' as message;
