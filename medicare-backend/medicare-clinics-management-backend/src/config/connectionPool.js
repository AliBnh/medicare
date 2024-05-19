const mysql = require("mysql2");

const connectionPools = {};

const createConnectionPool = (dbName) => {
  return mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: dbName,
  });
};

const getConnectionPool = (dbName) => {
  if (!connectionPools[dbName]) {
    connectionPools[dbName] = createConnectionPool(dbName);
  }
  return connectionPools[dbName];
};

module.exports = getConnectionPool;
