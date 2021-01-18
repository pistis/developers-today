const path = require('path');
const devStorage = path.join(__dirname, '../../../dev.sqlite');
const prodStorage = path.join(__dirname, '../../../prod.sqlite');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: devStorage,
    timestamps: true,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory',
    timestamps: true,
  },
  production: {
    dialect: 'sqlite',
    storage: prodStorage,
    logging: false,
    timestamps: true,
  },
};
