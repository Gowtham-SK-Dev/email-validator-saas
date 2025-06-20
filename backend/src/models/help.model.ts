import { DataTypes, Model, type Optional } from "sequelize"
import sequelize from "../config/database"
import { User } from "./user.model"

interface HelpAttributes {
  id: number
  user_id: number
  message: string
  response?: string | null
  status: "pending" | "in_progress" | "resolved" | "closed"
  created_at: Date
  updated_at: Date
}

interface HelpCreationAttributes
  extends Optional<HelpAttributes, "id" | "created_at" | "updated_at" | "response" | "status"> {}

export class Help extends Model<HelpAttributes, HelpCreationAttributes> implements HelpAttributes {
  public id!: number
  public user_id!: number
  public message!: string
  public response?: string | null
  public status!: "pending" | "in_progress" | "resolved" | "closed"
  public created_at!: Date
  public updated_at!: Date
}

Help.init(
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
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "resolved", "closed"),
      allowNull: false,
      defaultValue: "pending",
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
    tableName: "help",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["user_id"] }, { fields: ["status"] }, { fields: ["created_at"] }],
  },
)

// Service functions
export const createHelpRequest = async (helpData: { user_id: number; message: string }): Promise<Help> => {
  try {
    return await Help.create(helpData)
  } catch (error) {
    console.error("Error creating help request:", error)
    throw error
  }
}

export const getHelpRequestsByUserId = async (userId: number): Promise<Help[]> => {
  try {
    return await Help.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    })
  } catch (error) {
    console.error("Error getting help requests by user ID:", error)
    throw error
  }
}

export const getAllHelpRequests = async (page = 1, limit = 10): Promise<{ helpRequests: any[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const { count, rows } = await Help.findAndCountAll({
      include: [{ model: User, as: "user", attributes: ["username", "email"] }],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    })

    return { helpRequests: rows, total: count }
  } catch (error) {
    console.error("Error getting all help requests:", error)
    throw error
  }
}

export const updateHelpRequest = async (
  id: number,
  updateData: { response?: string; status?: "pending" | "in_progress" | "resolved" | "closed" },
): Promise<void> => {
  try {
    await Help.update(updateData, { where: { id } })
  } catch (error) {
    console.error("Error updating help request:", error)
    throw error
  }
}

export const getHelpRequestById = async (id: number): Promise<Help | null> => {
  try {
    return await Help.findByPk(id, {
      include: [{ model: User, as: "user" }],
    })
  } catch (error) {
    console.error("Error getting help request by ID:", error)
    throw error
  }
}
