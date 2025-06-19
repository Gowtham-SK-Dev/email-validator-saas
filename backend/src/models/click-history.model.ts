import { DataTypes, Model, type Optional, Op } from "sequelize"
import sequelize from "../config/database"
import { User } from "./user.model"

interface ClickHistoryAttributes {
  id: number
  user_id: number
  initial_click_count: number
  current_click_count: number
  used_click_count: number
  created_at: Date
  updated_at: Date
}

interface ClickHistoryCreationAttributes extends Optional<ClickHistoryAttributes, "id" | "created_at" | "updated_at"> {}

export class ClickHistory
  extends Model<ClickHistoryAttributes, ClickHistoryCreationAttributes>
  implements ClickHistoryAttributes
{
  public id!: number
  public user_id!: number
  public initial_click_count!: number
  public current_click_count!: number
  public used_click_count!: number
  public created_at!: Date
  public updated_at!: Date
}

ClickHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    initial_click_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current_click_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    used_click_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "click_history",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["user_id"] }, { fields: ["created_at"] }],
  },
)

// Service functions
export const logClickHistory = async (
  userId: number,
  initialClickCount: number,
  currentClickCount: number,
  usedClickCount: number,
): Promise<ClickHistory> => {
  try {
    return await ClickHistory.create({
      user_id: userId,
      initial_click_count: initialClickCount,
      current_click_count: currentClickCount,
      used_click_count: usedClickCount,
    })
  } catch (error) {
    console.error("Error logging click history:", error)
    throw error
  }
}

export const getClickHistoryByUserId = async (
  userId: number,
  page = 1,
  limit = 10,
): Promise<{ clickHistory: ClickHistory[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const { count, rows } = await ClickHistory.findAndCountAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
      limit,
      offset,
    })

    return { clickHistory: rows, total: count }
  } catch (error) {
    console.error("Error getting click history by user ID:", error)
    throw error
  }
}

export const getAllClickHistory = async (
  page = 1,
  limit = 10,
  userId = 0,
): Promise<{ clickHistory: any[]; total: number }> => {
  try {
    const offset = (page - 1) * limit
    const whereClause = userId > 0 ? { user_id: userId } : {}

    const { count, rows } = await ClickHistory.findAndCountAll({
      where: whereClause,
      include: [{ model: User, as: "user", attributes: ["username", "email"] }],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    })

    return { clickHistory: rows, total: count }
  } catch (error) {
    console.error("Error getting all click history:", error)
    throw error
  }
}

export const generateClickHistoryReport = async (startDate: string, endDate: string, userId = 0): Promise<any[]> => {
  try {
    const whereClause: any = {}

    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      }
    }

    if (userId > 0) {
      whereClause.user_id = userId
    }

    const clickHistory = await ClickHistory.findAll({
      where: whereClause,
      include: [{ model: User, as: "user", attributes: ["username", "email"] }],
      order: [["created_at", "DESC"]],
    })

    return clickHistory.map((ch: any) => ({
      id: ch.id,
      username: ch.user.username,
      email: ch.user.email,
      initial_click_count: ch.initial_click_count,
      current_click_count: ch.current_click_count,
      used_click_count: ch.used_click_count,
      created_at: ch.created_at,
    }))
  } catch (error) {
    console.error("Error generating click history report:", error)
    throw error
  }
}
