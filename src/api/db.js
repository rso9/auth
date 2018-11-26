import Sequelize from 'sequelize'
var pg = require('pg')
pg.defaults.ssl = true

const config = {
  database: 'dccnfm02n84jga',
  username: 'dsjvoasgdslwqd',
  password: process.env.POSTGRES_PASSWORD,
  host: 'ec2-54-75-231-3.eu-west-1.compute.amazonaws.com',
  dialect: 'postgres',
};

export default new Sequelize(
  config.database,
  config.username,
  config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: 2,
      min: 0,
      idle: 10000,
    },
    operatorsAliases: false,
  },
);
