import { DataTypes, Model, type Optional, Op } from "sequelize"
import sequelize from "../config/database"
import { User } from "./user.model"
import { PaymentType } from "./payment-type.model"
import { Subscription } from "./subscription.model"
import { SubscriptionType } from "./subscription-type.model"

interface PaymentAttributes {
  id: number
  user_id: number
  amount: number
  payment_type_id: number
  subscription_id: number
  transaction_id: string
  status: "pending" | "completed" | "failed" | "refunded"
  created_at: Date
  updated_at: Date
}

interface PaymentCreationAttributes
  extends Optional<PaymentAttributes, "id" | "created_at" | "updated_at" | "status"> {}

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number
  public user_id!: number
  public amount!: number
  public payment_type_id!: number
  public subscription_id!: number
  public transaction_id!: string
  public status!: "pending" | "completed" | "failed" | "refunded"
  public created_at!: Date
  public updated_at!: Date
}

Payment.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "payment_types",
        key: "id",
      },
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "subscriptions",
        key: "id",
      },
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
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
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      { fields: ["user_id"] },
      { fields: ["transaction_id"] },
      { fields: ["status"] },
      { fields: ["created_at"] },
    ],
  },
)

// Service functions
export const createPayment = async (paymentData: PaymentCreationAttributes): Promise<Payment> => {
  try {
    return await Payment.create(paymentData)
  } catch (error) {
    console.error("Error creating payment:", error)
    throw error
  }
}

export const getPaymentById = async (id: number): Promise<Payment | null> => {
  try {
    return await Payment.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: PaymentType, as: "paymentType" },
        { model: Subscription, as: "subscription", include: [{ model: SubscriptionType, as: "subscriptionType" }] },
      ],
    })
  } catch (error) {
    console.error("Error getting payment by ID:", error)
    throw error
  }
}

export const getAllPayments = async (page = 1, limit = 10): Promise<{ payments: Payment[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const { count, rows } = await Payment.findAndCountAll({
      include: [
        { model: User, as: "user" },
        { model: PaymentType, as: "paymentType" },
        { model: Subscription, as: "subscription", include: [{ model: SubscriptionType, as: "subscriptionType" }] },
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    })

    return { payments: rows, total: count }
  } catch (error) {
    console.error("Error getting all payments:", error)
    throw error
  }
}

export const getPaymentsByDateRange = async (
  startDate: string,
  endDate: string,
  page = 1,
  limit = 10,
): Promise<{ payments: Payment[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const { count, rows } = await Payment.findAndCountAll({
      where: {
        created_at: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: [
        { model: User, as: "user" },
        { model: PaymentType, as: "paymentType" },
        { model: Subscription, as: "subscription", include: [{ model: SubscriptionType, as: "subscriptionType" }] },
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    })

    return { payments: rows, total: count }
  } catch (error) {
    console.error("Error getting payments by date range:", error)
    throw error
  }
}

export const updatePaymentStatus = async (
  id: number,
  status: "pending" | "completed" | "failed" | "refunded",
): Promise<void> => {
  try {
    await Payment.update({ status }, { where: { id } })
  } catch (error) {
    console.error("Error updating payment status:", error)
    throw error
  }
}
