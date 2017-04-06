var logger = require("../services/logger")
module.exports={
  tokenSecret: '·obpqY$¡rFZy!4U4myZE4gk$Ep0q-PhrGipe(0Qfh:?vCQn=¡c',
  development: {
  username: "root",
  password: "r00t",
  database: "cvgen_development",
  host: "127.0.0.1",
  dialect: "mysql",
  port:3306,
  logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },    
  },
  test: {
    username: "root",
    password: "r00t",
    database: "cvgen_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "r00t",
    database: "cvgen_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}