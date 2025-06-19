import { DataTypes, Model, type Optional, Op } from "sequelize"
import sequelize from "../config/database"
import { User } from "./user.model"
import { PaymentType } from "./payment-type.model"
import { SubscriptionType } from "./subscription-type.model"

interface SubscriptionAttributes {
  id: number
  user_id: number
  payment_type_id: number
  subscription_type_id: number
  transaction_id: string
  amount: number
  start_date: Date
  end_date?: Date | null
  status: "active" | "expired" | "cancelled"
  created_at: Date
  updated_at: Date
}

interface SubscriptionCreationAttributes
  extends Optional<SubscriptionAttributes, "id" | "created_at" | "updated_at" | "end_date" | "status"> {}

export class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  public id!: number
  public user_id!: number
  public payment_type_id!: number
  public subscription_type_id!: number
  public transaction_id!: string
  public amount!: number
  public start_date!: Date
  public end_date?: Date | null
  public status!: "active" | "expired" | "cancelled"
  public created_at!: Date
  public updated_at!: Date
}

Subscription.init(
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
    payment_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "payment_types",
        key: "id",
      },
    },
    subscription_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "subscription_types",
        key: "id",
      },
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "expired", "cancelled"),
      allowNull: false,
      defaultValue: "active",
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
    tableName: "subscriptions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      { fields: ["user_id"] },
      { fields: ["status"] },
      { fields: ["start_date"] },
      { fields: ["end_date"] },
      { fields: ["created_at"] },
    ],
  },
)

// Service functions
export const createSubscription = async (subscriptionData: SubscriptionCreationAttributes): Promise<Subscription> => {
  try {
    return await Subscription.create(subscriptionData)
  } catch (error) {
    console.error("Error creating subscription:", error)
    throw error
  }
}

export const getSubscriptionById = async (id: number): Promise<Subscription | null> => {
  try {
    return await Subscription.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: PaymentType, as: "paymentType" },
        { model: SubscriptionType, as: "subscriptionType" },
      ],
    })
  } catch (error) {
    console.error("Error getting subscription by ID:", error)
    throw error
  }
}

export const getSubscriptionsByUserId = async (userId: number): Promise<Subscription[]> => {
  try {
    return await Subscription.findAll({
      where: { user_id: userId },
      include: [
        { model: SubscriptionType, as: "subscriptionType" },
        { model: PaymentType, as: "paymentType" },
      ],
      order: [["created_at", "DESC"]],
    })
  } catch (error) {
    console.error("Error getting subscriptions by user ID:", error)
    throw error
  }
}

export const updateSubscriptionStatus = async (
  id: number,
  status: "active" | "expired" | "cancelled",
): Promise<void> => {
  try {
    await Subscription.update({ status }, { where: { id } })
  } catch (error) {
    console.error("Error updating subscription status:", error)
    throw error
  }
}

export const getActiveSubscription = async (userId: number): Promise<Subscription | null> => {
  try {
    return await Subscription.findOne({
      where: {
        user_id: userId,
        status: "active",
        [Op.or]: [{ end_date: null }, { end_date: { [Op.gt]: new Date() } }],
      },
      include: [{ model: SubscriptionType, as: "subscriptionType" }],
      order: [["created_at", "DESC"]],
    })
  } catch (error) {
    console.error("Error getting active subscription:", error)
    throw error
  }
}
