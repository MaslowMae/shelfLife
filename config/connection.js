const {Sequelize} = require("sequelize")
require("dotenv")

const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_password,
    {
        host:"localhost",
        dialect:"mysql",
        port:3306
    }
)

module.exports = sequelize

