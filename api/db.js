import Sequelize from 'sequelize'
import path from 'path'

const config = {
  database: 'db',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
};

export default new Sequelize(
  config.database,
  config.username,
  config.password, {
    host: config.host,
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    operatorsAliases: false,
    storage: 'database.sqlite',
  },
);
