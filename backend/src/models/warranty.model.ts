import { DataTypes, Model, type Optional } from "sequelize"
import sequelize from "../config/database"

interface WarrantyAttributes {
  id: number
  user_id: number
  initial_click_count: number
  current_click_count: number
  used_click_count: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface WarrantyCreationAttributes
  extends Optional<WarrantyAttributes, "id" | "created_at" | "updated_at" | "used_click_count" | "is_active"> {}

export class Warranty extends Model<WarrantyAttributes, WarrantyCreationAttributes> implements WarrantyAttributes {
  public id!: number
  public user_id!: number
  public initial_click_count!: number
  public current_click_count!: number
  public used_click_count!: number
  public is_active!: boolean
  public created_at!: Date
  public updated_at!: Date
}

Warranty.init(
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
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: "warranties",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["user_id"] }, { fields: ["is_active"] }, { fields: ["created_at"] }],
  },
)

// Service functions
export const createWarranty = async (warrantyData: WarrantyCreationAttributes): Promise<Warranty> => {
  try {
    return await Warranty.create(warrantyData)
  } catch (error) {
    console.error("Error creating warranty:", error)
    throw error
  }
}

export const getWarrantyByUserId = async (userId: number): Promise<Warranty | null> => {
  try {
    return await Warranty.findOne({
      where: { user_id: userId, is_active: true },
      order: [["created_at", "DESC"]],
    })
  } catch (error) {
    console.error("Error getting warranty by user ID:", error)
    throw error
  }
}

export const updateWarranty = async (id: number, updateData: Partial<WarrantyAttributes>): Promise<void> => {
  try {
    await Warranty.update(updateData, { where: { id } })
  } catch (error) {
    console.error("Error updating warranty:", error)
    throw error
  }
}

export const updateWarrantyClickCount = async (userId: number, usedClicks: number): Promise<void> => {
  try {
    const warranty = await Warranty.findOne({
      where: { user_id: userId, is_active: true },
    })

    if (warranty) {
      await warranty.update({
        current_click_count: warranty.current_click_count - usedClicks,
        used_click_count: warranty.used_click_count + usedClicks,
      })
    }
  } catch (error) {
    console.error("Error updating warranty click count:", error)
    throw error
  }
}
