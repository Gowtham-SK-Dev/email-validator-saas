import { DataTypes, Model, type Optional, Op, fn, col, literal } from "sequelize"
import sequelize from "../config/database"
import { Role } from "./role.model"
import { Subscription } from "./subscription.model"
import { SubscriptionType } from "./subscription-type.model"

interface UserAttributes {
  id: number
  username: string
  password: string
  mobile_number: string
  email: string
  api_key: string
  api_secret: string
  otp?: string | null
  balance_click_count: number
  is_active: boolean
  role_id: number
  created_at: Date
  updated_at: Date
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "updated_at" | "otp" | "balance_click_count" | "is_active"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public password!: string
  public mobile_number!: string
  public email!: string
  public api_key!: string
  public api_secret!: string
  public otp?: string | null
  public balance_click_count!: number
  public is_active!: boolean
  public role_id!: number
  public created_at!: Date
  public updated_at!: Date

  // Association methods
  public getRole!: () => Promise<Role>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    api_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    api_secret: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    balance_click_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      { fields: ["email"] },
      { fields: ["username"] },
      { fields: ["api_key"] },
      { fields: ["role_id"] },
      { fields: ["is_active"] },
      { fields: ["created_at"] },
    ],
  },
)

// Service functions
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    console.log("Getting user by ID:", id)
    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: "role",
          required: false, // Make the join optional in case role doesn't exist
        },
        {
          model: Subscription,
          as: "subscriptions",
          required: false,
          include: [
            {
              model: SubscriptionType,
              as: "subscriptionType",
              required: false,
            },
            
          ],
          // Only include the latest or active subscription
          where: {
            status: "active"
          },
          separate: true,
          limit: 1,
          order: [["end_date", "DESC"]]
        },
      ],
    })

    console.log("User found:", user ? "Yes" : "No")
    return user
  } catch (error) {
    console.error("Error getting user by ID:", error)
    throw error
  }
}

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    return await User.findOne({
      where: { username },
      include: [
        {
          model: Role,
          as: "role",
          required: false,
        },
      ],
    })
  } catch (error) {
    console.error("Error getting user by username:", error)
    throw error
  }
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "role",
          required: false,
        },
      ],
    })
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw error
  }
}

export const getUserByApiKey = async (apiKey: string): Promise<User | null> => {
  try {
    return await User.findOne({
      where: { api_key: apiKey },
      include: [
        {
          model: Role,
          as: "role",
          required: false,
        },
      ],
    })
  } catch (error) {
    console.error("Error getting user by API key:", error)
    throw error
  }
}

export const createUser = async (userData: UserCreationAttributes): Promise<User> => {
  try {
    return await User.create(userData)
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export const updateUser = async (id: number, updateData: Partial<UserAttributes>): Promise<void> => {
  try {
    await User.update(updateData, { where: { id } })
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

export const updateUserOtp = async (id: number, otp: string): Promise<void> => {
  try {
    await User.update({ otp }, { where: { id } })
  } catch (error) {
    console.error("Error updating user OTP:", error)
    throw error
  }
}

export const updateUserClickCount = async (id: number, amount: number): Promise<number> => {
  try {
    const user = await User.findByPk(id)
    if (!user) {
      throw new Error("User not found")
    }

    const newClickCount = Math.max(0, user.balance_click_count + amount)
    await user.update({ balance_click_count: newClickCount })

    return newClickCount
  } catch (error) {
    console.error("Error updating user click count:", error)
    throw error
  }
}

export const getAllUsers = async (page = 1, limit = 10, search = ""): Promise<{ users: User[]; total: number }> => {
  try {
    const offset = (page - 1) * limit
    const whereClause = search
      ? {
          [Op.or]: [
            { username: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { mobile_number: { [Op.like]: `%${search}%` } },
          ],
        }
      : {}

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      include: [{ model: Role, as: "role", required: false }],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    })

    return { users: rows, total: count }
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  }
}

export const getUserApiUsage = async (id: number): Promise<any> => {
  try {
    const user = await User.findByPk(id)
    if (!user) {
      throw new Error("User not found")
    }

    // Import ClickHistory model dynamically to avoid circular dependency
    const { ClickHistory } = await import("./click-history.model")
    const { Subscription } = await import("./subscription.model")
    const { SubscriptionType } = await import("./subscription-type.model")

    // Get monthly usage from click history using Sequelize aggregation
    const monthlyUsage = await ClickHistory.findAll({
      where: { user_id: id },
      attributes: [
        [fn("DATE_FORMAT", col("created_at"), "%b"), "name"],
        [fn("SUM", col("used_click_count")), "total"],
        [fn("SUM", col("used_click_count")), "verified"],
        [literal("0"), "invalid"],
      ],
      group: [fn("DATE_FORMAT", col("created_at"), "%Y-%m")],
      order: [[col("created_at"), "ASC"]],
      limit: 6,
    })

    // Get active subscription
    const subscription = await Subscription.findOne({
      where: {
        user_id: id,
        status: "active",
      },
      include: [{ model: SubscriptionType, as: "subscriptionType" }],
      order: [["end_date", "DESC"]],
    })

    return {
      monthlyUsage,
      subscription: subscription || null,
      balance_click_count: user.balance_click_count,
    }
  } catch (error) {
    console.error("Error getting user API usage:", error)
    throw error
  }
}

export const getUserStats = async (): Promise<any> => {
  try {
    // Import models dynamically to avoid circular dependency
    const { Payment } = await import("./payment.model")
    const { ClickHistory } = await import("./click-history.model")
    const { SubscriptionType } = await import("./subscription-type.model")

    // Get total users
    const totalUsers = await User.count()

    // Get active users
    const activeUsers = await User.count({ where: { is_active: true } })

    // Get total revenue from completed payments
    const totalRevenueResult = await Payment.findOne({
      attributes: [[fn("SUM", col("amount")), "total"]],
      where: { status: "completed" },
    })

    // Get total clicks used
    const totalClicksResult = await ClickHistory.findOne({
      attributes: [[fn("SUM", col("used_click_count")), "total"]],
    })

    // Get monthly revenue
    const monthlyRevenue = await Payment.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("created_at"), "%b"), "month"],
        [fn("SUM", col("amount")), "total"],
      ],
      where: { status: "completed" },
      group: [fn("DATE_FORMAT", col("created_at"), "%Y-%m")],
      order: [[col("created_at"), "ASC"]],
      limit: 6,
    })

    // Get recent users with their subscription info
    const recentUsers = await User.findAll({
      attributes: ["id", "username", "email", "created_at"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_name"],
          required: false,
        },
      ],
      order: [["created_at", "DESC"]],
      limit: 5,
    })

    return {
      totalUsers,
      activeUsers,
      totalRevenue: (totalRevenueResult as any)?.dataValues?.total || 0,
      totalClicks: (totalClicksResult as any)?.dataValues?.total || 0,
      monthlyRevenue: monthlyRevenue.map((item: any) => item.dataValues),
      recentUsers: recentUsers.map((user: any) => ({
        ...user.dataValues,
        plan_name: null, // This would need a more complex query to get active subscription
      })),
    }
  } catch (error) {
    console.error("Error getting user stats:", error)
    throw error
  }
}
