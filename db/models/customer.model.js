const { Model, DataTypes, Sequelize } = require('sequelize')

const { USER_TABLE } = require("./user.model")
const CUSTOMER_TABLE = 'customers'

const AuthService = require("../../services/auth.service")
const authSvc = new AuthService();

const customerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' })
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
      hooks: {
        beforeCreate: async (customer, opt) => {
          const hash = await authSvc.hashing(customer.user.password);
          customer.user.password = hash;
        }
      }
    }
  }
}

module.exports = { CUSTOMER_TABLE, customerSchema, Customer }
