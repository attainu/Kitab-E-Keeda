//REQUIRING A SETTING UP ALL
const Sequelize = require('sequelize');
const {POSTGRES_URI,POSTGRES_PASSWORD} = process.env;
// Option 1: Passing parameters separatel)
const sequelize = new Sequelize(POSTGRES_URI.replace("<password>", POSTGRES_PASSWORD), {
  host: 'localhost',
  dialect: 'postgres',   /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  logging : false,
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
    console.log('database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync()
  // { force: true }

  module.exports = sequelize ;  