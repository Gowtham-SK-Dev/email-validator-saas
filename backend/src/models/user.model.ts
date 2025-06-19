import { DataTypes, Model, type Optional, Op } from "sequelize"
import sequelize from "../config/database"
import { Role } from "./role.model"

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
    return await User.findByPk(id, {
      include: [{ model: Role, as: "role" }],
    })
  } catch (error) {
    console.error("Error getting user by ID:", error)
    throw error
  }
}

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    return await User.findOne({
      where: { username },
      include: [{ model: Role, as: "role" }],
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
      include: [{ model: Role, as: "role" }],
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
      include: [{ model: Role, as: "role" }],
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
      include: [{ model: Role, as: "role" }],
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
    // This would require additional queries for click history and subscriptions
    // Implementation depends on the ClickHistory and Subscription models
    const user = await User.findByPk(id)
    if (!user) {
      throw new Error("User not found")
    }

    return {
      balance_click_count: user.balance_click_count,
      // Additional usage stats would be implemented here
    }
  } catch (error) {
    console.error("Error getting user API usage:", error)
    throw error
  }
}

export const getUserStats = async (): Promise<any> => {
  try {
    const totalUsers = await User.count()
    const activeUsers = await User.count({ where: { is_active: true } })

    return {
      totalUsers,
      activeUsers,
      // Additional stats would be implemented here
    }
  } catch (error) {
    console.error("Error getting user stats:", error)
    throw error
  }
}
