'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contents: DataTypes.TEXT,
      link: DataTypes.STRING(1024),
      estimationMinutes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      startTime: {
        type: DataTypes.TIME,
        // get() {
        //   const rawValue = this.getDataValue('startTime');
        //   console.log('rawValue', rawValue, typeof rawValue);
        //   return rawValue;
        // },
      },
      endTime: {
        type: DataTypes.TIME,
        // get() {
        //   const rawValue = this.getDataValue('endTime');
        //   console.log('rawValue', rawValue, typeof rawValue);
        //   return rawValue;
        // },
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );

  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Project, {
      foreignKey: 'projectId',
    });

    Task.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
  };
  return Task;
};
