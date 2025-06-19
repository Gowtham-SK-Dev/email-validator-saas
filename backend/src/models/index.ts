import sequelize from "../config/database"
import { Role } from "./role.model"
import { User } from "./user.model"
import { PaymentType } from "./payment-type.model"
import { SubscriptionType } from "./subscription-type.model"
import { Subscription } from "./subscription.model"
import { Payment } from "./payment.model"
import { Warranty } from "./warranty.model"
import { ClickHistory } from "./click-history.model"
import { Help } from "./help.model"
import { Menu } from "./menu.model"

// Define associations
const defineAssociations = () => {
  // User associations
  User.belongsTo(Role, { foreignKey: "role_id", as: "role" })
  Role.hasMany(User, { foreignKey: "role_id", as: "users" })

  // Subscription associations
  Subscription.belongsTo(User, { foreignKey: "user_id", as: "user" })
  Subscription.belongsTo(PaymentType, { foreignKey: "payment_type_id", as: "paymentType" })
  Subscription.belongsTo(SubscriptionType, { foreignKey: "subscription_type_id", as: "subscriptionType" })

  User.hasMany(Subscription, { foreignKey: "user_id", as: "subscriptions" })
  PaymentType.hasMany(Subscription, { foreignKey: "payment_type_id", as: "subscriptions" })
  SubscriptionType.hasMany(Subscription, { foreignKey: "subscription_type_id", as: "subscriptions" })

  // Payment associations
  Payment.belongsTo(User, { foreignKey: "user_id", as: "user" })
  Payment.belongsTo(PaymentType, { foreignKey: "payment_type_id", as: "paymentType" })
  Payment.belongsTo(Subscription, { foreignKey: "subscription_id", as: "subscription" })

  User.hasMany(Payment, { foreignKey: "user_id", as: "payments" })
  PaymentType.hasMany(Payment, { foreignKey: "payment_type_id", as: "payments" })
  Subscription.hasMany(Payment, { foreignKey: "subscription_id", as: "payments" })

  // Warranty associations
  Warranty.belongsTo(User, { foreignKey: "user_id", as: "user" })
  User.hasMany(Warranty, { foreignKey: "user_id", as: "warranties" })

  // ClickHistory associations
  ClickHistory.belongsTo(User, { foreignKey: "user_id", as: "user" })
  User.hasMany(ClickHistory, { foreignKey: "user_id", as: "clickHistory" })

  // Help associations
  Help.belongsTo(User, { foreignKey: "user_id", as: "user" })
  User.hasMany(Help, { foreignKey: "user_id", as: "helpRequests" })

  // Menu associations
  Menu.belongsTo(Role, { foreignKey: "role_id", as: "role" })
  Menu.belongsTo(Menu, { foreignKey: "parent_id", as: "parent" })
  Menu.hasMany(Menu, { foreignKey: "parent_id", as: "children" })

  Role.hasMany(Menu, { foreignKey: "role_id", as: "menus" })
}

// Initialize models
const initializeModels = async () => {
  try {
    defineAssociations()

    // Sync all models
    await sequelize.sync({ alter: false })
    console.log("✅ All models synchronized successfully")
  } catch (error) {
    console.error("❌ Model synchronization failed:", error)
    throw error
  }
}

export {
  sequelize,
  Role,
  User,
  PaymentType,
  SubscriptionType,
  Subscription,
  Payment,
  Warranty,
  ClickHistory,
  Help,
  Menu,
  initializeModels,
}
