// Import sequelize and dotenv
const Sequelize = require("sequelize");
require("dotenv").config();

// This is the connection to the database
let sequelize;

// Then create a connection to the database, using a .env file (to store values) to log in the mysql server
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
