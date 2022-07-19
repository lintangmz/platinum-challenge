'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    tglTransaksi: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.associate = function(models) {
    Order.hasMany(models.User, {
      foreignKey: 'orderId',
      as: 'users'
    })

    Order.belongsToMany(models.Item, {
      through: 'OrderDetail',
      as: 'items',
      foreignKey: 'orderId'
    })
  }
  return Order;
};