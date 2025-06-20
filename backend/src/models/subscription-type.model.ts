import { DataTypes, Model, type Optional } from "sequelize"
import sequelize from "../config/database"

interface SubscriptionTypeAttributes {
  id: number
  plan_name: string
  price: number
  hit_limit: number
  validity?: number | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface SubscriptionTypeCreationAttributes
  extends Optional<SubscriptionTypeAttributes, "id" | "created_at" | "updated_at" | "validity" | "is_active"> {}

export class SubscriptionType
  extends Model<SubscriptionTypeAttributes, SubscriptionTypeCreationAttributes>
  implements SubscriptionTypeAttributes
{
  public id!: number
  public plan_name!: string
  public price!: number
  public hit_limit!: number
  public validity?: number | null
  public is_active!: boolean
  public created_at!: Date
  public updated_at!: Date
}

SubscriptionType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plan_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    hit_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    validity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Validity in days, NULL for unlimited",
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
    tableName: "subscription_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["is_active"] }, { fields: ["price"] }],
  },
)

// Service functions
export const getAllSubscriptionTypes = async (): Promise<SubscriptionType[]> => {
  try {
    return await SubscriptionType.findAll({
      where: { is_active: true },
      order: [["price", "ASC"]],
    })
  } catch (error) {
    console.error("Error getting all subscription types:", error)
    throw error
  }
}

export const getSubscriptionTypeById = async (id: number): Promise<SubscriptionType | null> => {
  try {
    return await SubscriptionType.findByPk(id)
  } catch (error) {
    console.error("Error getting subscription type by ID:", error)
    throw error
  }
}

export const createSubscriptionType = async (
  subscriptionTypeData: SubscriptionTypeCreationAttributes,
): Promise<SubscriptionType> => {
  try {
    return await SubscriptionType.create(subscriptionTypeData)
  } catch (error) {
    console.error("Error creating subscription type:", error)
    throw error
  }
}

export const updateSubscriptionType = async (
  id: number,
  updateData: Partial<SubscriptionTypeAttributes>,
): Promise<void> => {
  try {
    await SubscriptionType.update(updateData, { where: { id } })
  } catch (error) {
    console.error("Error updating subscription type:", error)
    throw error
  }
}
