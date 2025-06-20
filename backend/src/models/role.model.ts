import { DataTypes, Model, type Optional } from "sequelize"
import sequelize from "../config/database"

interface RoleAttributes {
  id: number
  role_name: string
  created_at: Date
  updated_at: Date
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id" | "created_at" | "updated_at"> {}

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number
  public role_name!: string
  public created_at!: Date
  public updated_at!: Date
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
)

// Service functions
export const getRoleByName = async (roleName: string): Promise<Role | null> => {
  try {
    return await Role.findOne({ where: { role_name: roleName } })
  } catch (error) {
    console.error("Error getting role by name:", error)
    throw error
  }
}

export const getRoleById = async (id: number): Promise<Role | null> => {
  try {
    return await Role.findByPk(id)
  } catch (error) {
    console.error("Error getting role by ID:", error)
    throw error
  }
}

export const getAllRoles = async (): Promise<Role[]> => {
  try {
    return await Role.findAll({ order: [["role_name", "ASC"]] })
  } catch (error) {
    console.error("Error getting all roles:", error)
    throw error
  }
}

export const createRole = async (roleName: string): Promise<Role> => {
  try {
    return await Role.create({ role_name: roleName })
  } catch (error) {
    console.error("Error creating role:", error)
    throw error
  }
}
