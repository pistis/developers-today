'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      type: {
        type: DataTypes.ENUM('PRODUCT', 'TEAM', 'PERSONAL', 'ETC'),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
      },
      endDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );

  Project.associate = function (models) {
    // associations can be defined here
    Project.hasMany(models.Task, {
      foreignKey: 'projectId',
    });
  };

  return Project;
};
