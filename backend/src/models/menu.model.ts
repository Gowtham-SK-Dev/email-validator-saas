import { DataTypes, Model, type Optional } from "sequelize"
import sequelize from "../config/database"

interface MenuAttributes {
  id: number
  menu_name: string
  menu_url: string
  parent_id?: number | null
  sort_order: number
  is_active: boolean
  role_id?: number | null
  created_at: Date
  updated_at: Date
}

interface MenuCreationAttributes
  extends Optional<
    MenuAttributes,
    "id" | "created_at" | "updated_at" | "parent_id" | "sort_order" | "is_active" | "role_id"
  > {}

export class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  public id!: number
  public menu_name!: string
  public menu_url!: string
  public parent_id?: number | null
  public sort_order!: number
  public is_active!: boolean
  public role_id?: number | null
  public created_at!: Date
  public updated_at!: Date
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    menu_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    menu_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "menus",
        key: "id",
      },
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: "menus",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      { fields: ["parent_id"] },
      { fields: ["role_id"] },
      { fields: ["is_active"] },
      { fields: ["sort_order"] },
    ],
  },
)
