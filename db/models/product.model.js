const { Model, DataTypes, Sequelize } = require('sequelize')
const { CATEGORY_TABLE } = require("./category.model")
const PRODUCT_TABLE = 'products'

const productSchema = {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }

}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, Product, productSchema }
