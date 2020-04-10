//REQUIRING A SETTING UP ALL
const Sequelize = require('sequelize');

const {POSTGRES_URI,POSTGRES_PASSWORD} = process.env;

// Option 1: Passing parameters separatel)
const sequelize = new Sequelize(POSTGRES_URI.replace("<password>", POSTGRES_PASSWORD), {
  host: 'localhost',
  dialect: 'postgres',   /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */

  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

//TEST DB 
sequelize
  .authenticate()
  .then(() => {
    console.log('ElephantSql database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  module.exports = sequelize ;