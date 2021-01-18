'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Task, {
      foreignKey: 'categoryId',
    });
  };

  return Category;
};
