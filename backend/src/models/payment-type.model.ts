import { DataTypes, Model, type Optional } from "sequelize"
import sequelize from "../config/database"

interface PaymentTypeAttributes {
  id: number
  payment_type_name: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface PaymentTypeCreationAttributes
  extends Optional<PaymentTypeAttributes, "id" | "created_at" | "updated_at" | "is_active"> {}

export class PaymentType
  extends Model<PaymentTypeAttributes, PaymentTypeCreationAttributes>
  implements PaymentTypeAttributes
{
  public id!: number
  public payment_type_name!: string
  public is_active!: boolean
  public created_at!: Date
  public updated_at!: Date
}

PaymentType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    payment_type_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    tableName: "payment_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
)
